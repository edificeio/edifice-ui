/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export default function useThumbnail(src: string) {
  const [status, setStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setStatus(true);
    };

    img.onerror = () => {
      setStatus(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
      setStatus(null);
    };
  }, []);

  return status;
}
