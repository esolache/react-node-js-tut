import { useState, useEffect } from "react";

export default function IntakeList() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | idle | error

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("Failed to load submissions");
      const data = await res.json();
      setSubmissions(data);
      if (data.length > 0) setSelectedId(data[0].id);
      setStatus("idle");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  const selected = submissions.find((s) => s.id === selectedId) || null;

  return (
    <main className="px-6 py-10 max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-black text-neutral-900 mb-6">Contact Submissions</h1>

      {status === "loading" && <p className="text-neutral-600">Loading…</p>}
      {status === "error" && <p className="text-red-600">Could not load submissions.</p>}

      {status === "idle" && submissions.length === 0 && (
        <p className="text-neutral-600">No submissions yet.</p>
      )}

      {status === "idle" && submissions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
          <ul className="border border-neutral-200 rounded-md divide-y divide-neutral-100 max-h-[70vh] overflow-y-auto">
            {submissions.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setSelectedId(s.id)}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    s.id === selectedId ? "bg-neutral-900 text-white" : "hover:bg-neutral-50"
                  }`}
                >
                  <div className="font-bold text-sm truncate">{s.name || "(no name)"}</div>
                  <div className={`text-xs truncate ${s.id === selectedId ? "text-neutral-300" : "text-neutral-500"}`}>
                    {s.email}
                  </div>
                  {s.created_at && (
                    <div className={`text-[11px] mt-1 ${s.id === selectedId ? "text-neutral-400" : "text-neutral-400"}`}>
                      {new Date(s.created_at).toLocaleString()}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {selected ? (
            <IntakeDetail key={selected.id} submission={selected} />
          ) : (
            <div className="border border-neutral-200 rounded-md p-6">
              <p className="text-neutral-500">Select a submission to view details.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

function IntakeDetail({ submission }) {
  const [notes, setNotes] = useState([]);
  const [notesStatus, setNotesStatus] = useState("loading"); // loading | idle | error
  const [newNote, setNewNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [submission.id]);

  async function fetchNotes() {
    setNotesStatus("loading");
    try {
      const res = await fetch(`/api/contact/${submission.id}/notes`);
      if (!res.ok) throw new Error("Failed to load notes");
      setNotes(await res.json());
      setNotesStatus("idle");
    } catch (err) {
      console.error(err);
      setNotesStatus("error");
    }
  }

  async function handleAddNote(e) {
    e.preventDefault();
    if (!newNote.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/contact/${submission.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNote.trim() }),
      });
      if (!res.ok) throw new Error("Failed to add note");
      const created = await res.json();
      setNotes((prev) => [...prev, created]);
      setNewNote("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="border border-neutral-200 rounded-md p-6">
      <dl className="grid grid-cols-[100px_1fr] gap-y-4 gap-x-4 text-sm">
        <dt className="text-neutral-500 font-semibold">Name</dt>
        <dd>{submission.name}</dd>

        <dt className="text-neutral-500 font-semibold">Email</dt>
        <dd>
          <a href={`mailto:${submission.email}`} className="text-blue-600 underline">
            {submission.email}
          </a>
        </dd>

        <dt className="text-neutral-500 font-semibold">Phone</dt>
        <dd>
          {submission.phone ? (
            <a href={`tel:${submission.phone}`} className="text-blue-600 underline">
              {submission.phone}
            </a>
          ) : (
            "—"
          )}
        </dd>

        <dt className="text-neutral-500 font-semibold">Address</dt>
        <dd>{submission.address || "—"}</dd>

        <dt className="text-neutral-500 font-semibold">Message</dt>
        <dd className="whitespace-pre-wrap">{submission.message}</dd>
      </dl>

      <div className="mt-8 pt-6 border-t border-neutral-200">
        <h2 className="font-bold text-sm text-neutral-900 mb-3">Notes</h2>

        {notesStatus === "loading" && <p className="text-sm text-neutral-500">Loading notes…</p>}
        {notesStatus === "error" && <p className="text-sm text-red-600">Could not load notes.</p>}

        {notesStatus === "idle" && notes.length === 0 && (
          <p className="text-sm text-neutral-500 mb-4">No notes yet.</p>
        )}

        {notesStatus === "idle" && notes.length > 0 && (
          <ul className="flex flex-col gap-3 mb-4">
            {notes.map((n) => (
              <li key={n.id} className="bg-neutral-50 rounded-md p-3">
                <p className="text-sm whitespace-pre-wrap">{n.note}</p>
                <p className="text-xs text-neutral-400 mt-1">
                  {n.author_username} · {new Date(n.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleAddNote} className="flex flex-col gap-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note…"
            rows={3}
            className="border border-neutral-300 rounded-sm px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={submitting || !newNote.trim()}
            className="self-start bg-neutral-900 text-white text-sm font-bold px-4 py-2 rounded-sm disabled:opacity-40"
          >
            {submitting ? "Adding…" : "Add Note"}
          </button>
        </form>
      </div>
    </div>
  );
}