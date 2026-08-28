// TODO: implement real booking logic (persist to DB, check availability,
// send confirmation email, etc.)
export async function createBooking(req, res, next) {
  try {
    res.status(501).json({ error: "Not implemented yet" });
  } catch (err) {
    next(err);
  }
}
