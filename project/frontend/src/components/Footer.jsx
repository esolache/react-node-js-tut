export default function Footer() {
  return (
    <footer className="bg-black text-neutral-300 text-sm">
      <div className="mx-auto max-w-[1400px] px-6 py-8 flex flex-col sm:flex-row justify-between gap-4">
        {/* TODO: replace with real address / license / social links */}
        <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
        <p>123 Placeholder St, Your City, ST 00000</p>
      </div>
    </footer>
  );
}
