"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 bg-[#FDF8F3] text-[#2C1810] w-full">
      <div className="flex flex-col items-center max-w-md text-center p-8 bg-white rounded-2xl shadow-sm border border-black/5">
        <div className="w-16 h-16 rounded-full bg-[#FF055F]/10 flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-[#FF055F]" />
        </div>
        
        <h1 className="text-3xl font-semibold tracking-tight text-[#2C1810] mb-3">
          Something went wrong
        </h1>
        
        <p className="text-[#2C1810]/70 mb-8 leading-relaxed">
          We apologize for the inconvenience. An unexpected error has occurred while trying to load this page.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF055F] text-white font-medium rounded-xl hover:bg-[#FF055F]/90 transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
          
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4A574]/10 text-[#2C1810] font-medium rounded-xl hover:bg-[#D4A574]/20 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
