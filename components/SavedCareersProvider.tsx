"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";

interface SavedCareersContextType {
  saved: string[];
  toggle: (careerId: string) => Promise<void>;
  isSaved: (careerId: string) => boolean;
}

const SavedCareersContext = createContext<SavedCareersContextType>({
  saved: [],
  toggle: async () => {},
  isSaved: () => false,
});

export function SavedCareersProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    if (!session) {
      setSaved([]);
      return;
    }
    fetch("/api/user/saved-careers")
      .then((r) => r.json())
      .then((d) => setSaved(d.savedCareers || []));
  }, [session]);

  const toggle = useCallback(async (careerId: string) => {
    setSaved((prev) =>
      prev.includes(careerId) ? prev.filter((id) => id !== careerId) : [...prev, careerId]
    );
    const res = await fetch("/api/user/saved-careers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ careerId }),
    });
    const data = await res.json();
    setSaved(data.savedCareers || []);
  }, []);

  const isSaved = useCallback((careerId: string) => saved.includes(careerId), [saved]);

  return (
    <SavedCareersContext.Provider value={{ saved, toggle, isSaved }}>
      {children}
    </SavedCareersContext.Provider>
  );
}

export const useSavedCareers = () => useContext(SavedCareersContext);
