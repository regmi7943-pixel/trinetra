"use client";

import { useState, useRef } from "react";
import { Plus, Edit2, Trash2, Image as ImageIcon, X, Upload, CheckCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { updateContent } from "@/app/actions/updateContent";
import { uploadImage } from "@/app/actions/uploadImage";

type EyewearItem = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  gender: string;
  images: string[];
  description: string;
  inStock: boolean;
  featured: boolean;
  externalLink?: string;
};

export default function EyewearClient({ initialEyewearList }: { initialEyewearList: string }) {
  const [items, setItems] = useState<EyewearItem[]>(() => {
    try {
      return JSON.parse(initialEyewearList) || [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EyewearItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultFormState: Omit<EyewearItem, "id"> = {
    name: "",
    brand: "",
    category: "Frames",
    price: 0,
    gender: "Unisex",
    images: [],
    description: "",
    inStock: true,
    featured: false,
    externalLink: "",
  };

  const [formData, setFormData] = useState<Omit<EyewearItem, "id">>(defaultFormState);

  const categories = ["All", "Frames", "Sunglasses", "Contact Lenses"];
  const formCategories = ["Frames", "Sunglasses", "Contact Lenses"];
  const genders = ["Men", "Women", "Unisex", "Kids"];

  const filteredItems = filter === "All" ? items : items.filter((i) => i.category === filter);

  const handleOpenModal = (item?: EyewearItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        brand: item.brand,
        category: item.category,
        price: item.price,
        gender: item.gender,
        images: item.images || [],
        description: item.description || "",
        inStock: item.inStock ?? true,
        featured: item.featured ?? false,
        externalLink: item.externalLink || "",
      });
    } else {
      setEditingItem(null);
      setFormData(defaultFormState);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(defaultFormState);
  };

  const saveToServer = async (newItems: EyewearItem[]) => {
    setSaving(true);
    try {
      const res = await updateContent("global", "eyewear_list", JSON.stringify(newItems));
      if (res.success) {
        setItems(newItems);
        handleCloseModal();
      } else {
        alert("Failed to save: " + res.error);
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.brand || formData.price === undefined) {
      alert("Name, Brand, and Price are required.");
      return;
    }

    let newItems;
    if (editingItem) {
      newItems = items.map((item) =>
        item.id === editingItem.id ? { ...formData, id: item.id } : item
      );
    } else {
      const newItem: EyewearItem = {
        ...formData,
        id: crypto.randomUUID(),
      };
      newItems = [...items, newItem];
    }

    saveToServer(newItems);
  };

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setDeletingId(id);
      const newItems = items.filter((item) => item.id !== id);
      await saveToServer(newItems);
      setDeletingId(null);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      const res = await uploadImage(uploadData);
      
      if (res.success && res.url) {
        setFormData((prev) => ({ ...prev, images: [...prev.images, res.url!] }));
      } else {
        alert("Upload failed: " + res.error);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-[#FF055F] text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#FF055F] hover:bg-[#FF055F]/90 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-[#FF055F]/20"
          aria-label="Add Eyewear"
        >
          <Plus size={18} />
          Add Eyewear
        </button>
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
          <ImageIcon className="mx-auto h-12 w-12 text-white/20 mb-4" />
          <h3 className="text-lg font-medium text-white mb-1">No products found</h3>
          <p className="text-white/60">Get started by adding a new eyewear product.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-black/20 transition-all"
            >
              <div className="aspect-[4/3] bg-black/40 relative">
                {item.images && item.images.length > 0 ? (
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="text-white/20" size={48} />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-white transition-colors"
                    aria-label="Edit Product"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="p-2 bg-red-500/80 hover:bg-red-500 backdrop-blur-md rounded-lg text-white transition-colors disabled:opacity-50"
                    aria-label="Delete Product"
                  >
                    {deletingId === item.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </button>
                </div>
                {item.featured && (
                  <div className="absolute top-3 left-3 bg-[#D4A574] text-black text-xs font-bold px-2 py-1 rounded-md">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{item.name}</h3>
                    <p className="text-sm text-[#D4A574]">{item.brand}</p>
                  </div>
                  <span className="text-lg font-bold text-[#FF055F]">Rs. {item.price}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-md text-white/70">
                    {item.category}
                  </span>
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-md text-white/70">
                    {item.gender}
                  </span>
                  {item.inStock ? (
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-md flex items-center gap-1">
                      <CheckCircle size={12} /> In Stock
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-md flex items-center gap-1">
                      <X size={12} /> Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl my-auto">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {editingItem ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Close Modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF055F] transition-colors"
                    placeholder="e.g. Aviator Classic"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF055F] transition-colors"
                    placeholder="e.g. Ray-Ban"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF055F] transition-colors"
                  >
                    {formCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF055F] transition-colors"
                  >
                    {genders.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Price (Rs.)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF055F] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF055F] transition-colors"
                  placeholder="Short description about the product..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">External Link (Optional)</label>
                <input
                  type="url"
                  value={formData.externalLink || ""}
                  onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF055F] transition-colors"
                  placeholder="https://yourstore.com/product"
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-10 h-6 rounded-full transition-colors relative ${formData.inStock ? 'bg-[#FF055F]' : 'bg-white/20'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.inStock ? 'left-5' : 'left-1'}`} />
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={formData.inStock}
                    onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                  />
                  <span className="text-sm font-medium text-white/80">In Stock</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-10 h-6 rounded-full transition-colors relative ${formData.featured ? 'bg-[#D4A574]' : 'bg-white/20'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.featured ? 'left-5' : 'left-1'}`} />
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  <span className="text-sm font-medium text-white/80">Featured</span>
                </label>
              </div>

              {/* Images */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70 flex justify-between">
                  <span>Product Images</span>
                  <span className="text-xs">{formData.images.length} added</span>
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {formData.images.map((url, idx) => (
                    <div key={idx} className="aspect-square bg-black/40 rounded-xl relative group overflow-hidden border border-white/10">
                      <Image src={url} alt="Product" fill className="object-cover" />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all"
                        aria-label="Remove Image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="aspect-square bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-2 text-white/50 hover:text-white/80 transition-colors disabled:opacity-50"
                  >
                    {uploadingImage ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>
                        <Upload size={24} />
                        <span className="text-xs font-medium">Upload Image</span>
                      </>
                    )}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-white/10">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2.5 rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-[#FF055F] hover:bg-[#FF055F]/90 text-white transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
