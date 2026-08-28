// TODO: replace with real persistence (DB insert) and/or email notification
// (e.g. via nodemailer or a transactional email API).
export async function submitContactForm(req, res, next) {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email, and message are required" });
    }

    console.log("New contact submission:", { name, email, message });

    // Placeholder response — swap for a real "saved" confirmation once
    // persistence is wired up.
    res.status(201).json({ status: "received" });
  } catch (err) {
    next(err);
  }
}
