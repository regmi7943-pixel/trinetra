"use client";

import React, { useState, useRef, useCallback } from "react";

import Image from "next/image";
import Cropper from "react-easy-crop";
import { Camera, Loader2, X } from "lucide-react";
import { updateContent } from "@/app/actions/updateContent";
import { uploadImage } from "@/app/actions/uploadImage";
import { getCroppedImg } from "@/lib/cropImage";

interface EditableImageProps {
  page: string;
  contentKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
}

export function EditableImage({
  page,
  contentKey,
  defaultSrc,
  alt,
  className = "",
  width,
  height,
  fill,
}: EditableImageProps) {
  const [editMode, setEditMode] = useState(false);
  
  const [src, setSrc] = useState(defaultSrc);
  const [isUploading, setIsUploading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setEditMode(new URLSearchParams(window.location.search).get("editMode") === "true");
  }, []);

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setTempImage(reader.result?.toString() || null);
        setShowCropper(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCrop = async () => {
    if (!tempImage || !croppedAreaPixels) return;
    
    setIsUploading(true);
    setShowCropper(false);
    
    try {
      const croppedBlob = await getCroppedImg(tempImage, croppedAreaPixels);
      if (!croppedBlob) throw new Error("Failed to crop image");

      const formData = new FormData();
      formData.append("file", croppedBlob, "cropped-image.jpg");

      const uploadResult = await uploadImage(formData);
      if (!uploadResult.success || !uploadResult.url) {
        throw new Error(uploadResult.error || "Failed to upload image");
      }

      const updateResult = await updateContent(page, contentKey, uploadResult.url);
      if (!updateResult.success) {
        throw new Error(updateResult.error || "Failed to update content");
      }

      setSrc(uploadResult.url);
    } catch (error) {
      console.error(error);
      alert("Error saving image.");
    } finally {
      setIsUploading(false);
      setTempImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const imageProps: any = {
    src,
    alt,
    className: `object-cover ${className}`,
    sizes: "(max-width: 768px) 100vw, 50vw",
  };

  if (fill) {
    imageProps.fill = true;
  } else {
    imageProps.width = width || 500;
    imageProps.height = height || 500;
  }

  if (!editMode) {
    return <Image {...imageProps} />;
  }

  return (
    <>
      <div 
        className={`relative group inline-block ${fill ? 'w-full h-full' : ''}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Image {...imageProps} />
        
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer">
          <div className="bg-[#FF055F] text-white px-4 py-2 rounded-full flex items-center gap-2 transform scale-95 group-hover:scale-100 transition-transform">
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Camera className="w-5 h-5" />
                <span className="font-medium">Change Image</span>
              </>
            )}
          </div>
        </div>

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {showCropper && tempImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-4xl h-[80vh] bg-[#111111] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h3 className="text-white font-medium">Crop Image</h3>
              <button 
                onClick={() => {
                  setShowCropper(false);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="relative flex-1 bg-black">
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={undefined}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            
            <div className="p-4 border-t border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/40">Zoom</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-32 accent-[#FF055F]"
                />
              </div>
              <button
                onClick={handleSaveCrop}
                className="bg-[#FF055F] hover:bg-[#FF055F]/90 text-white px-6 py-2 rounded-xl transition-colors font-medium"
              >
                Save Image
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
