import { createRoot } from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import App from "./App.tsx";
import "./index.css";

// Shared queryClient — also used by App
export const queryClient = new QueryClient();

// Prefetch critical data immediately at boot
queryClient.prefetchQuery({
  queryKey: ["site-content"],
  queryFn: async () => {
    const { data, error } = await supabase.from("site_content").select("id, value");
    if (error) throw error;
    const map: Record<string, string> = {};
    data?.forEach((row: any) => { map[row.id] = row.value; });
    return map;
  },
  staleTime: 1000 * 60 * 10,
});

queryClient.prefetchQuery({
  queryKey: ["portfolio-items"],
  queryFn: async () => {
    const { data, error } = await supabase.from("portfolio_items").select("*").order("sort_order");
    if (error) throw error;
    return data;
  },
  staleTime: 1000 * 60 * 10,
});

queryClient.prefetchQuery({
  queryKey: ["hero-tags"],
  queryFn: async () => {
    const { data, error } = await supabase.from("hero_tags").select("*").order("sort_order");
    if (error) throw error;
    return data;
  },
  staleTime: 1000 * 60 * 10,
});

createRoot(document.getElementById("root")!).render(<App />);
