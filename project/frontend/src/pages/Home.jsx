import { NavLink } from "react-router-dom";
import Button from "../components/common/Button.jsx";

export default function Home() {
  return (
    <main>
      {/* Hero section — TODO: replace placeholder copy and image */}
      <section className="bg-neutral-100 px-6 py-20 text-center">
        <h1 className="text-3xl md:text-5xl font-black text-neutral-900 max-w-3xl mx-auto">
          Headline goes here
        </h1>
        <p className="mt-4 text-neutral-600 max-w-xl mx-auto">
          Supporting subheadline placeholder text describing what the business does.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <NavLink to="/book-online">
            <Button>Book Online</Button>
          </NavLink>
          <NavLink to="/contact">
            <Button className="bg-neutral-900">Contact Us</Button>
          </NavLink>
        </div>
      </section>

      {/* Placeholder content section */}
      <section className="px-6 py-16 max-w-[1400px] mx-auto grid gap-8 sm:grid-cols-3">
        {["Feature One", "Feature Two", "Feature Three"].map((title) => (
          <div key={title} className="border border-neutral-200 rounded-md p-6">
            <h2 className="font-bold text-lg text-neutral-900">{title}</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Placeholder description text for this feature or service.
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
