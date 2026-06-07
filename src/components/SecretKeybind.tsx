"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SecretKeybind() {
  const router = useRouter();

  useEffect(() => {
    let sequence = "";
    const targetSequence = "123123";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      sequence += e.key;

      if (sequence.length > targetSequence.length) {
        sequence = sequence.slice(-targetSequence.length);
      }

      if (sequence === targetSequence) {
        router.push("/12312341");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return null;
}
