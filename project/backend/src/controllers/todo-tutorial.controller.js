import { poolPromise, sql } from "../config/db.js";
 
export async function getTodos(req, res) {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(
            "SELECT id, text, done FROM dbo.todo ORDER BY id"
        );
        const todos = result.recordset.map((t) => ({ ...t, done: !!t.done }));
        return res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch todos" });
    }
}

export async function postTodo(req, res, next) {
    const { text } = req.body;
    if (!text || typeof text !== "string" || !text.trim()) {
        return res.status(400).json({ error: "text is required" });
    }

    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("text", sql.NVarChar, text.trim())
            .query(
            "INSERT INTO dbo.todo (text, done) OUTPUT INSERTED.id, INSERTED.text, INSERTED.done VALUES (@text, 0)"
            );
        const created = result.recordset[0];
        res.status(201).json({ ...created, done: !!created.done });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create todo" });
    }
}


export async function putTodo(req, res, next) {
    const id = Number(req.params.id);

    try {
        const pool = await poolPromise;

        const existing = await pool
            .request()
            .input("id", sql.Int, id)
            .query("SELECT id, text, done FROM dbo.todo WHERE id = @id");

        if (existing.recordset.length === 0) {
            return res.status(404).json({ error: "todo not found" });
        }

        const current = existing.recordset[0];
        const newDone = typeof req.body.done === "boolean" ? req.body.done : !!current.done;
        const newText =
            typeof req.body.text === "string" && req.body.text.trim()
            ? req.body.text.trim()
            : current.text;

        await pool
            .request()
            .input("id", sql.Int, id)
            .input("text", sql.NVarChar, newText)
            .input("done", sql.Bit, newDone)
            .query("UPDATE dbo.todo SET text = @text, done = @done WHERE id = @id");

        res.json({ id, text: newText, done: newDone });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update todo" });
    }
}


// DELETE /api/todos/:id -- remove a todo
export async function deleteTodo(req, res, next) {
    const id = Number(req.params.id);

    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("id", sql.Int, id)
            .query("DELETE FROM dbo.todo WHERE id = @id");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: "todo not found" });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete todo" });
    }
}