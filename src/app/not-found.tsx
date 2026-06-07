import Link from "next/link";
import { Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 bg-[#FDF8F3] text-[#2C1810] w-full">
      <div className="flex flex-col items-center max-w-md text-center p-8 bg-white rounded-2xl shadow-sm border border-black/5">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-[#D4A574]/10 flex items-center justify-center">
            <Search className="w-10 h-10 text-[#D4A574]" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#FF055F] text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            404
          </div>
        </div>
        
        <h1 className="text-3xl font-semibold tracking-tight text-[#2C1810] mb-3">
          Page not found
        </h1>
        
        <p className="text-[#2C1810]/70 mb-8 leading-relaxed">
          We couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        
        <Link
          href="/"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF055F] text-white font-medium rounded-xl hover:bg-[#FF055F]/90 transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
