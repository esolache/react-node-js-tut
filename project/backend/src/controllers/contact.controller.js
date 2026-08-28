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
