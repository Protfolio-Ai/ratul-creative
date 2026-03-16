import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteContent = () => {
  return useQuery({
    queryKey: ["site-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("id, value");
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((row: any) => { map[row.id] = row.value; });
      return map;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useHeroTags = () => {
  return useQuery({
    queryKey: ["hero-tags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_tags")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as { id: string; label: string; sort_order: number }[];
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as { id: string; title: string; description: string; icon_name: string; sort_order: number }[];
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as { id: string; name: string; percentage: number; category: string; sort_order: number }[];
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const usePortfolioItems = () => {
  return useQuery({
    queryKey: ["portfolio-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as { id: string; title: string; category: string; color_class: string; sort_order: number }[];
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useExperienceItems = () => {
  return useQuery({
    queryKey: ["experience-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experience_items")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as { id: string; role: string; company: string; period: string | null; sort_order: number }[];
    },
    staleTime: 1000 * 60 * 5,
  });
};
