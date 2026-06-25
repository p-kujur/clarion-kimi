import { Link } from 'react-router';

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  return (
    <div className="min-h-screen bg-[#1a0e08] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e08]/60 to-[#1a0e08]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#c8956c]/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Brand */}
        <Link
          to="/"
          className="font-serif text-2xl text-[#f3ece4] hover:text-[#c8956c] transition-colors mb-4"
        >
          Clarion
        </Link>

        <div className="liquid-glass-strong rounded-xl px-8 py-8 flex flex-col items-center gap-5 min-w-[320px]">
          <div className="text-center">
            <h2 className="font-serif text-xl text-[#f3ece4] mb-1">
              Welcome Back
            </h2>
            <p className="text-xs text-[#8c7b6b]">
              Sign in to access your account
            </p>
          </div>

          <button
            onClick={() => { window.location.href = getOAuthUrl(); }}
            className="relative z-10 w-full px-6 py-3 text-sm rounded-full bg-[#c8956c]/20 text-[#c8956c] hover:bg-[#c8956c]/30 transition-colors font-mono text-xs uppercase tracking-widest"
          >
            Sign In with Kimi
          </button>

          <Link
            to="/"
            className="text-xs text-[#6b5d4f] hover:text-[#8c7b6b] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
