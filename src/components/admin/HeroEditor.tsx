import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent, useHeroTags } from "@/hooks/useSiteContent";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Save } from "lucide-react";

const HeroEditor = () => {
  const { data: content } = useSiteContent();
  const { data: tags } = useHeroTags();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [tagList, setTagList] = useState<{ id?: string; label: string; sort_order: number }[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content) {
      setTitle(content.hero_title || "");
      setSubtitle(content.hero_subtitle || "");
    }
  }, [content]);

  useEffect(() => {
    if (tags) setTagList(tags.map(t => ({ ...t })));
  }, [tags]);

  const save = async () => {
    setSaving(true);
    try {
      await supabase.from("site_content").upsert([
        { id: "hero_title", value: title, updated_at: new Date().toISOString() },
        { id: "hero_subtitle", value: subtitle, updated_at: new Date().toISOString() },
      ]);

      // Delete removed tags
      const existingIds = tags?.map(t => t.id) || [];
      const currentIds = tagList.filter(t => t.id).map(t => t.id!);
      const toDelete = existingIds.filter(id => !currentIds.includes(id));
      if (toDelete.length) await supabase.from("hero_tags").delete().in("id", toDelete);

      // Upsert tags
      for (const tag of tagList) {
        if (tag.id) {
          await supabase.from("hero_tags").update({ label: tag.label, sort_order: tag.sort_order }).eq("id", tag.id);
        } else {
          await supabase.from("hero_tags").insert({ label: tag.label, sort_order: tag.sort_order });
        }
      }

      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      queryClient.invalidateQueries({ queryKey: ["hero-tags"] });
      toast({ title: "Hero section saved!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-semibold">Hero Section</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Subtitle (top label)</label>
          <Input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="bg-secondary border-border" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Title</label>
          <Input value={title} onChange={e => setTitle(e.target.value)} className="bg-secondary border-border" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Tags</label>
          <div className="space-y-2">
            {tagList.map((tag, i) => (
              <div key={i} className="flex gap-2">
                <Input value={tag.label} onChange={e => { const copy = [...tagList]; copy[i].label = e.target.value; setTagList(copy); }} className="bg-secondary border-border" />
                <Button variant="ghost" size="icon" onClick={() => setTagList(tagList.filter((_, j) => j !== i))}><Trash2 size={16} /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setTagList([...tagList, { label: "", sort_order: tagList.length }])}><Plus size={14} /> Add Tag</Button>
          </div>
        </div>
      </div>
      <Button onClick={save} disabled={saving}><Save size={16} /> {saving ? "Saving..." : "Save"}</Button>
    </div>
  );
};

export default HeroEditor;
