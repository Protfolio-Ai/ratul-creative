import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePortfolioItems } from "@/hooks/useSiteContent";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Save } from "lucide-react";

type PortfolioItem = { id?: string; title: string; category: string; color_class: string; image_url: string; sort_order: number };

const PortfolioEditor = () => {
  const { data: dbItems } = usePortfolioItems();
  const queryClient = useQueryClient();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (dbItems) setItems(dbItems.map(i => ({ ...i, image_url: i.image_url || "" })));
  }, [dbItems]);

  const update = (i: number, field: keyof PortfolioItem, val: string) => {
    const copy = [...items];
    (copy[i] as any)[field] = val;
    setItems(copy);
  };

  const save = async () => {
    setSaving(true);
    try {
      const existingIds = dbItems?.map(i => i.id) || [];
      const currentIds = items.filter(i => i.id).map(i => i.id!);
      const toDelete = existingIds.filter(id => !currentIds.includes(id));
      if (toDelete.length) await supabase.from("portfolio_items").delete().in("id", toDelete);

      for (const item of items) {
        const payload = { title: item.title, category: item.category, color_class: item.color_class, image_url: item.image_url || null, sort_order: item.sort_order } as any;
        if (item.id) {
          await supabase.from("portfolio_items").update(payload).eq("id", item.id);
        } else {
          await supabase.from("portfolio_items").insert(payload);
        }
      }
      queryClient.invalidateQueries({ queryKey: ["portfolio-items"] });
      toast({ title: "Portfolio saved!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-semibold">Portfolio Items</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-2 p-3 bg-secondary/50 rounded-lg border border-border">
            <div className="flex gap-2 items-center">
              <Input placeholder="Title" value={item.title} onChange={e => update(i, "title", e.target.value)} className="bg-secondary border-border flex-1" />
              <Input placeholder="Category" value={item.category} onChange={e => update(i, "category", e.target.value)} className="bg-secondary border-border w-36" />
              <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, j) => j !== i))}><Trash2 size={16} /></Button>
            </div>
            <div className="flex gap-2 items-center">
              <Input placeholder="Image URL (e.g. /portfolio/image.jpg)" value={item.image_url} onChange={e => update(i, "image_url", e.target.value)} className="bg-secondary border-border flex-1" />
              <Input placeholder="Color class" value={item.color_class} onChange={e => update(i, "color_class", e.target.value)} className="bg-secondary border-border w-48" />
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setItems([...items, { title: "", category: "", color_class: "from-primary/30 to-primary/10", image_url: "", sort_order: items.length }])}><Plus size={14} /> Add Item</Button>
      </div>
      <Button onClick={save} disabled={saving}><Save size={16} /> {saving ? "Saving..." : "Save"}</Button>
    </div>
  );
};

export default PortfolioEditor;
