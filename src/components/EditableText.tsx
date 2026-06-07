"use client";

import React, { useState, useEffect, useRef } from "react";

import { updateContent } from "@/app/actions/updateContent";
import { Loader2 } from "lucide-react";

interface EditableTextProps {
  page: string;
  contentKey: string;
  defaultText: string;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function EditableText({
  page,
  contentKey,
  defaultText,
  as: Component = "span",
  className = "",
  style = {},
}: EditableTextProps) {
  const [editMode, setEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultText);
  const [isSaving, setIsSaving] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setText(defaultText);
  }, [defaultText]);

  useEffect(() => {
    setEditMode(new URLSearchParams(window.location.search).get("editMode") === "true");
  }, []);

  const handleSave = async () => {
    if (!elementRef.current) return;
    const newText = elementRef.current.innerText.trim();
    if (newText === text) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    const result = await updateContent(page, contentKey, newText);
    if (result.success) {
      setText(newText);
    } else {
      // Revert on error
      elementRef.current.innerText = text;
      alert("Failed to save content");
    }
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      elementRef.current?.blur(); // This will trigger handleBlur/handleSave
    }
  };

  if (!editMode) {
    return <Component className={className} style={style}>{text}</Component>;
  }

  return (
    <span className="relative inline-block w-full">
      <Component
        ref={elementRef}
        contentEditable
        suppressContentEditableWarning
        suppressHydrationWarning
        onFocus={() => setIsEditing(true)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`outline-none transition-all duration-200 cursor-text hover:ring-2 hover:ring-[var(--color-primary,#FF055F)] rounded px-1 -mx-1 ${
          isEditing ? "ring-2 ring-[#FF055F] bg-white/5" : ""
        } ${className}`}
        style={style}
      >
        {text}
      </Component>
      {isSaving && (
        <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-[#FF055F]">
          <Loader2 className="w-4 h-4 animate-spin" />
        </span>
      )}
    </span>
  );
}
