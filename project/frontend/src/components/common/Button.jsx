// Generic reusable button. Extend with variants (primary/secondary/outline)
// as the design system grows.
export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-brand-primary hover:opacity-90 transition-opacity text-white font-bold uppercase tracking-wide px-5 py-3 rounded-sm ${className}`}
    >
      {children}
    </button>
  );
}
