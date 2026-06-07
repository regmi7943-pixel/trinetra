"use client";

import { useState } from "react";
import { uploadImage } from "@/app/actions/uploadImage";
import { updateContent } from "@/app/actions/updateContent";
import { useRouter } from "next/navigation";
import * as LucideIcons from "lucide-react";
import { Plus, Edit2, Trash2, X, Upload, Save, Check, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface Service {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  icon: string;
  order: number;
  active: boolean;
  slug: string;
}

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <Icon className={className} />;
};

export default function ServicesClient({ initialServicesString }: { initialServicesString: string }) {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>(() => {
    try {
      return JSON.parse(initialServicesString) as Service[];
    } catch {
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form states
  const [formData, setFormData] = useState<Partial<Service>>({});

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData({
        id: crypto.randomUUID(),
        name: "",
        shortDesc: "",
        longDesc: "",
        image: "",
        icon: "Eye",
        order: services.length + 1,
        active: true,
        slug: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setFormData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    setIsUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const result = await uploadImage(data);
      if (result.success && result.url) {
        setFormData((prev) => ({ ...prev, image: result.url }));
      } else {
        alert("Image upload failed: " + result.error);
      }
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const saveServices = async (newServices: Service[]) => {
    setIsSaving(true);
    try {
      const jsonString = JSON.stringify(newServices);
      const res = await updateContent("global", "services_list", jsonString);
      if (res.success) {
        setServices(newServices);
        router.refresh();
        closeModal();
      } else {
        alert("Failed to save changes: " + res.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return alert("Name is required");

    // Auto-generate slug if missing
    let finalSlug = formData.slug?.trim();
    if (!finalSlug) {
      finalSlug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }

    const newService: Service = {
      ...(formData as Service),
      slug: finalSlug,
      order: Number(formData.order) || 0,
    };

    let updatedServices;
    if (editingService) {
      updatedServices = services.map((s) => (s.id === editingService.id ? newService : s));
    } else {
      updatedServices = [...services, newService];
    }

    // Sort by order
    updatedServices.sort((a, b) => a.order - b.order);
    saveServices(updatedServices);
  };

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setDeletingId(id);
    const updatedServices = services.filter((s) => s.id !== id);
    await saveServices(updatedServices);
    setDeletingId(null);
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF055F] hover:bg-[#FF055F]/80 text-white rounded-lg transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Create New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 ? (
          <div className="col-span-full py-12 text-center text-white/50 bg-white/5 border border-white/10 rounded-2xl">
            No services found. Click &quot;Create New Service&quot; to add one.
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-black/50 transition-all flex flex-col"
            >
              {service.image ? (
                <div className="h-48 w-full overflow-hidden bg-black/50 relative">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-black/50 flex flex-col items-center justify-center text-white/20">
                  <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                  <span className="text-sm">No Image</span>
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4A574]/20 flex items-center justify-center text-[#D4A574]">
                      <DynamicIcon name={service.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white leading-tight">{service.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${service.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {service.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-white/60 mb-4 line-clamp-2">
                  {service.shortDesc}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/10">
                  <span className="text-xs text-white/40">Order: {service.order}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal(service)}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      title="Edit"
                      aria-label="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      disabled={deletingId === service.id}
                      className="p-2 text-white/60 hover:text-[#FF055F] hover:bg-[#FF055F]/10 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                      aria-label="Delete Service"
                    >
                      {deletingId === service.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold text-white">
                {editingService ? "Edit Service" : "Create New Service"}
              </h2>
              <button
                onClick={closeModal}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="service-form" onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Service Name <span className="text-[#FF055F]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4A574] transition-colors"
                      placeholder="e.g. Comprehensive Eye Exam"
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Slug <span className="text-white/40 text-xs">(auto-generated if empty)</span>
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4A574] transition-colors"
                      placeholder="e.g. comprehensive-eye-exam"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Icon */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80 flex items-center gap-2">
                      Icon Name 
                      <span className="text-white/40 text-xs">(from lucide-react)</span>
                      {formData.icon && (
                        <div className="ml-auto flex items-center gap-1 text-xs text-[#D4A574]">
                          Preview: <DynamicIcon name={formData.icon} className="w-4 h-4" />
                        </div>
                      )}
                    </label>
                    <input
                      type="text"
                      name="icon"
                      value={formData.icon || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4A574] transition-colors"
                      placeholder="e.g. Eye, Microscope, Glasses"
                    />
                  </div>

                  {/* Order */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order || 0}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4A574] transition-colors"
                    />
                  </div>
                </div>

                {/* Short Desc */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">
                    Short Description <span className="text-[#FF055F]">*</span>
                  </label>
                  <textarea
                    name="shortDesc"
                    required
                    value={formData.shortDesc || ""}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4A574] transition-colors resize-none"
                    placeholder="Brief description for the card..."
                  />
                </div>

                {/* Long Desc */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">
                    Long Description
                  </label>
                  <textarea
                    name="longDesc"
                    value={formData.longDesc || ""}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4A574] transition-colors resize-y"
                    placeholder="Detailed description for the service page..."
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">
                    Service Image
                  </label>
                  <div className="flex items-start gap-6">
                    {formData.image && (
                      <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-white/10 bg-black/50 flex-shrink-0">
                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 hover:border-white/40 transition-all ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-white/40" />
                          <p className="mb-2 text-sm text-white/60">
                            <span className="font-semibold text-[#D4A574]">Click to upload</span> or  and drop
                          </p>
                          <p className="text-xs text-white/40">SVG, PNG, JPG or WEBP</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </label>
                      {isUploading && (
                        <p className="text-[#D4A574] text-sm mt-2 animate-pulse">Uploading image...</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Active Toggle */}
                <div className="flex items-center gap-3 pt-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active || false}
                      onChange={handleToggle}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF055F]"></div>
                  </label>
                  <span className="text-sm font-medium text-white/80">
                    Service is Active
                  </span>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="service-form"
                disabled={isSaving || isUploading}
                className="flex items-center gap-2 px-6 py-2 bg-[#D4A574] hover:bg-[#D4A574]/80 text-[#111111] rounded-xl transition-colors font-bold disabled:opacity-50"
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Service
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
