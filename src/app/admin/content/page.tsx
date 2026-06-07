"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { MonitorPlay, RefreshCw, ExternalLink, ArrowLeft } from "lucide-react";

const PAGES = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Doctor", path: "/doctor" },
  { name: "Contact", path: "/contact" },
];

export default function ContentEditorPage() {
  const [selectedPage, setSelectedPage] = useState(PAGES[0].path);
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#111111] overflow-hidden">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 bg-[#0a0a0a] border-b border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto">
          <Link
            href="/admin"
            className="flex items-center gap-2 pr-4 mr-2 border-r border-white/10 text-white/70 hover:text-white transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Dashboard</span>
          </Link>
          {PAGES.map((page) => (
            <button
              key={page.path}
              onClick={() => setSelectedPage(page.path)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                selectedPage === page.path
                  ? "bg-[#FF055F]/10 text-[#FF055F]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh Iframe</span>
          </button>
          
          <a
            href={selectedPage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#FF055F] hover:bg-[#FF055F]/90 text-white text-sm font-medium rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">View Live Site</span>
          </a>
        </div>
      </div>

      {/* Editor Iframe */}
      <div className="flex-1 bg-white relative">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 text-white/90 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 z-10 shadow-lg pointer-events-none backdrop-blur-sm">
          <MonitorPlay className="w-3.5 h-3.5" />
          Edit Mode Active
        </div>
        <iframe
          ref={iframeRef}
          key={refreshKey}
          src={`${selectedPage}?editMode=true`}
          className="w-full h-full border-0"
          title="Content Editor"
        />
      </div>
    </div>
  );
}
