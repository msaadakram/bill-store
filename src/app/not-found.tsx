import Link from "next/link";
import { FileSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
        <FileSearch className="w-10 h-10 text-slate-400" />
      </div>
      <h1
        className="text-slate-900 mb-3"
        style={{ fontSize: "28px", fontWeight: 800 }}
      >
        Page Not Found
      </h1>
      <p className="text-slate-500 mb-6 max-w-md" style={{ fontSize: "15px" }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
        style={{ background: 'linear-gradient(135deg, #3E8B8E, #5A9FA2)', fontWeight: 600, fontSize: '14px' }}
      >
        Back to Home
      </Link>
    </div>
  );
}
