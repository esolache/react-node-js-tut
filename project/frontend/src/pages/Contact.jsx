import { useState } from "react";
import Button from "../components/common/Button.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      // Hits the Vite dev proxy -> backend /api/contact route.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main className="px-6 py-16 max-w-[600px] mx-auto">
      <h1 className="text-3xl font-black text-neutral-900">Contact Us</h1>
      <p className="mt-3 text-neutral-600">
        Placeholder contact form — wired to POST /api/contact on the backend.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="border border-neutral-300 rounded-sm px-4 py-3"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border border-neutral-300 rounded-sm px-4 py-3"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          rows={5}
          required
          className="border border-neutral-300 rounded-sm px-4 py-3"
        />
        <Button type="submit">{status === "sending" ? "Sending..." : "Send Message"}</Button>

        {status === "sent" && <p className="text-green-600 text-sm">Message sent — thank you.</p>}
        {status === "error" && (
          <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
        )}
      </form>
    </main>
  );
}
