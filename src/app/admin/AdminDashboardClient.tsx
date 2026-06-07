"use client";

import Link from "next/link";
import { Edit3, Layers, Glasses, ArrowRight, Activity, BarChart3 } from "lucide-react";

interface AdminDashboardClientProps {
  totalServices: number;
  totalEyewear: number;
}

export default function AdminDashboardClient({ totalServices, totalEyewear }: AdminDashboardClientProps) {
  const quickAccess = [
    {
      title: "Content Editor",
      description: "Manage homepage and static content",
      href: "/admin/content",
      icon: Edit3,
      color: "text-[#FF055F]",
      bg: "bg-[#FF055F]/10",
    },
    {
      title: "Manage Services",
      description: "Add, edit or remove services",
      href: "/admin/services",
      icon: Layers,
      color: "text-[#D4A574]",
      bg: "bg-[#D4A574]/10",
    },
    {
      title: "Manage Eyewear",
      description: "Manage eyewear products inventory",
      href: "/admin/eyewear",
      icon: Glasses,
      color: "text-[#FF055F]",
      bg: "bg-[#FF055F]/10",
    },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">Welcome back</h1>
          <p className="text-white/40">Here's what's happening with your website today.</p>
        </div>

        {/* Stats Overview */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-white/80 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#D4A574]" />
            Stats Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#D4A574]/10 rounded-xl">
                  <Layers className="w-6 h-6 text-[#D4A574]" />
                </div>
                <span className="text-3xl font-semibold">{totalServices}</span>
              </div>
              <h3 className="text-white/70 font-medium">Total Services</h3>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#D4A574] opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#FF055F]/10 rounded-xl">
                  <Glasses className="w-6 h-6 text-[#FF055F]" />
                </div>
                <span className="text-3xl font-semibold">{totalEyewear}</span>
              </div>
              <h3 className="text-white/70 font-medium">Total Eyewear</h3>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#FF055F] opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-white/80 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#FF055F]" />
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickAccess.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link key={idx} href={item.href} className="group block">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 hover:border-white/20">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${item.bg}`}>
                        <Icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
