"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  Type,
  Activity,
  Glasses,
  LogOut,
  Menu,
  X,
  Settings,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/12312341");
      } else {
        setUserEmail(session.user.email ?? null);
        setLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.push("/12312341");
        } else {
          setUserEmail(session.user.email ?? null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/12312341");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF055F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Content Editor", href: "/admin/content", icon: Type },
    { name: "Services", href: "/admin/services", icon: Activity },
    { name: "Eyewear", href: "/admin/eyewear", icon: Glasses },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isContentEditor = pathname === "/admin/content";

  return (
    <div className="flex min-h-screen bg-[#111111] text-white">
      {/* Mobile Sidebar Overlay */}
      {!isContentEditor && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {!isContentEditor && (
        <aside
          className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#FF055F]">Trinetra Admin</h2>
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#FF055F]/10 text-[#FF055F]"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} className={isActive ? "text-[#FF055F]" : ""} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="px-4 py-3 mb-2 text-sm text-white/40 truncate">
            {userEmail}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        {/* Mobile Header */}
        {!isContentEditor && (
          <header className="md:hidden bg-[#0a0a0a] border-b border-white/5 p-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#FF055F]">Trinetra Admin</h2>
            <button
              className="text-white/70 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
          </header>
        )}

        {/* Page Content */}
        <main className={`flex-1 overflow-y-auto w-full ${isContentEditor ? "p-0" : "p-6 md:p-10"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
