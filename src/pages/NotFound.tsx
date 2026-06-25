import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1a0e08] flex flex-col items-center justify-center px-6">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#c8956c] mb-4">
        404
      </p>
      <h1 className="font-serif text-5xl md:text-7xl text-[#f3ece4] mb-6 text-center">
        Page Not Found
      </h1>
      <p className="text-sm text-[#8c7b6b] mb-8 text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-[#c8956c] text-[#1a0e08] font-mono text-xs uppercase tracking-widest rounded-full hover:bg-[#d4a574] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
