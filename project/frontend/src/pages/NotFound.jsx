import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="px-6 py-24 text-center">
      <h1 className="text-4xl font-black text-neutral-900">404</h1>
      <p className="mt-2 text-neutral-600">Page not found.</p>
      <NavLink to="/" className="mt-6 inline-block text-brand-primary font-bold underline">
        Back home
      </NavLink>
    </main>
  );
}
