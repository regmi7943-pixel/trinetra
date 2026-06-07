"use client";

import { useState } from "react";
import { updateContent } from "@/app/actions/updateContent";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  Globe, 
  Camera, 
  PlayCircle, 
  Smartphone,
  Save,
  Check,
  AlertCircle
} from "lucide-react";

interface SettingsClientProps {
  initialContent: Record<string, string>;
}

export default function SettingsClient({ initialContent }: SettingsClientProps) {
  const [content, setContent] = useState<Record<string, string>>({
    settings_phone_call: initialContent.settings_phone_call || "",
    settings_phone_whatsapp: initialContent.settings_phone_whatsapp || "",
    settings_email: initialContent.settings_email || "",
    settings_hours_week: initialContent.settings_hours_week || "",
    settings_hours_weekend: initialContent.settings_hours_weekend || "",
    settings_social_fb: initialContent.settings_social_fb || "",
    settings_social_ig: initialContent.settings_social_ig || "",
    settings_social_tt: initialContent.settings_social_tt || "",
    settings_social_yt: initialContent.settings_social_yt || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const keys = Object.keys(content);

      for (const key of keys) {
        await updateContent("global", key, content[key] || "");
      }
      
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error(error);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const InputField = ({ label, icon: Icon, valueKey, placeholder }: any) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/70 flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#FF055F]" />
        {label}
      </label>
      <input
        type="text"
        value={content[valueKey]}
        onChange={(e) => handleChange(valueKey, e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF055F] transition-colors"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Global Settings</h1>
          <p className="text-white/40 mt-1">Manage contact info, working hours, and social links.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#FF055F] hover:bg-[#FF055F]/90 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saveStatus === "success" ? (
            <Check size={20} />
          ) : saveStatus === "error" ? (
            <AlertCircle size={20} />
          ) : (
            <Save size={20} />
          )}
          <span>
            {isSaving ? "Saving..." : saveStatus === "success" ? "Saved!" : "Save Changes"}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-semibold text-[#D4A574] mb-4">Contact Information</h2>
          <InputField
            label="Phone Number (Call)"
            icon={Phone}
            valueKey="settings_phone_call"
            placeholder="+977 1234567890"
          />
          <InputField
            label="WhatsApp Number"
            icon={MessageCircle}
            valueKey="settings_phone_whatsapp"
            placeholder="+977 1234567890"
          />
          <InputField
            label="Email Address"
            icon={Mail}
            valueKey="settings_email"
            placeholder="info@trinetra.com"
          />
        </div>

        {/* Working Hours */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-semibold text-[#D4A574] mb-4">Working Hours</h2>
          <InputField
            label="Weekdays"
            icon={Clock}
            valueKey="settings_hours_week"
            placeholder="Sun - Fri: 9:00 AM - 7:00 PM"
          />
          <InputField
            label="Weekends"
            icon={Clock}
            valueKey="settings_hours_weekend"
            placeholder="Saturday: 9:00 AM - 2:00 PM"
          />
        </div>

        {/* Social Media */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-[#D4A574] mb-4">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Facebook URL"
              icon={Globe}
              valueKey="settings_social_fb"
              placeholder="https://facebook.com/..."
            />
            <InputField
              label="Instagram URL"
              icon={Camera}
              valueKey="settings_social_ig"
              placeholder="https://instagram.com/..."
            />
            <InputField
              label="TikTok URL"
              icon={Smartphone}
              valueKey="settings_social_tt"
              placeholder="https://tiktok.com/@..."
            />
            <InputField
              label="YouTube URL"
              icon={PlayCircle}
              valueKey="settings_social_yt"
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
