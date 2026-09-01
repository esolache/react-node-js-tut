import { poolPromise, sql } from "../config/db.js";


// TODO: replace with real persistence (DB insert) and/or email notification
// (e.g. via nodemailer or a transactional email API).
export async function submitContactForm(req, res, next) {
  try {
    const { name, address, phone, email, message } = req.body;

    if (!name || !address || !phone || !email || !message) {
      return res.status(400).json({ error: "name, address, phone, email, and message are required" });
    }

    console.log("New contact intake submission:", { name, address, phone, email, message });


    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("name", sql.NVarChar, name)
        .input("address", sql.NVarChar, address)
        .input("phone", sql.NVarChar, phone)
        .input("email", sql.NVarChar, email)
        .input("message", sql.NVarChar, message)
        .query(
        `INSERT INTO dbo.contact_intake (name, address, phone, email, message)
            OUTPUT INSERTED.id, INSERTED.name, INSERTED.address, INSERTED.phone, INSERTED.email, INSERTED.message
            VALUES (@name, @address, @phone, @email, @message)`
        );
    const created = result.recordset[0];
    res.status(201).json({ ...created, done: !!created.done });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create contact intake" });
    }
}

export async function getContactForms(req, res) {
    try {

        console.log("Get contact intake submissions");

        const pool = await poolPromise;
        const result = await pool.request().query(
            "SELECT id, name, address, phone, email, message, CREATED_DATE FROM dbo.contact_intake ORDER BY CREATED_DATE DESC"
        );
        return res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch contace intake submissions" });
    }
}


export async function getContactFormNotes(req, res, next) {
    const id = Number(req.params.id);

    try {
        console.log("Get contact intake submission notes on id: ", { id });
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("id", sql.Int, id)
            .query(
                "SELECT id, note, CREATED_DATE FROM dbo.contact_intake_note WHERE contact_intake_id = @id ORDER BY CREATED_DATE DESC"
            );
        return res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch contact intake submission notes" });
    }
}


export async function postContactFormNotes(req, res, next) {
    const contact_intake_id = Number(req.params.id);
    const { note } = req.body;

    if (!note || typeof note !== "string" || !note.trim()) {
        return res.status(400).json({ error: "note is required" });
    }
    
    try {
        console.log("Create contact intake submission notes on id: ", { contact_intake_id });

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("contact_intake_id", sql.Int, contact_intake_id)
            .input("note", sql.NVarChar, note)
            .query(
            `INSERT INTO dbo.contact_intake_note (contact_intake_id, note)
                OUTPUT INSERTED.id, INSERTED.contact_intake_id, INSERTED.note
                VALUES (@contact_intake_id, @note)`
            );
        const created = result.recordset[0];
        res.status(201).json({ ...created, done: !!created.done });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create contact intake note" });
    }
}