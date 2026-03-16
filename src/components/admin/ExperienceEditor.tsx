import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useExperienceItems } from "@/hooks/useSiteContent";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Save } from "lucide-react";

type ExpItem = { id?: string; role: string; company: string; period: string | null; sort_order: number };

const ExperienceEditor = () => {
  const { data: dbItems } = useExperienceItems();
  const queryClient = useQueryClient();
  const [items, setItems] = useState<ExpItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (dbItems) setItems(dbItems.map(i => ({ ...i })));
  }, [dbItems]);

  const update = (i: number, field: keyof ExpItem, val: string) => {
    const copy = [...items];
    (copy[i] as any)[field] = val || null;
    setItems(copy);
  };

  const save = async () => {
    setSaving(true);
    try {
      const existingIds = dbItems?.map(i => i.id) || [];
      const currentIds = items.filter(i => i.id).map(i => i.id!);
      const toDelete = existingIds.filter(id => !currentIds.includes(id));
      if (toDelete.length) await supabase.from("experience_items").delete().in("id", toDelete);

      for (const item of items) {
        if (item.id) {
          await supabase.from("experience_items").update({ role: item.role, company: item.company, period: item.period, sort_order: item.sort_order }).eq("id", item.id);
        } else {
          await supabase.from("experience_items").insert({ role: item.role, company: item.company, period: item.period, sort_order: item.sort_order });
        }
      }
      queryClient.invalidateQueries({ queryKey: ["experience-items"] });
      toast({ title: "Experience saved!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-semibold">Experience</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input placeholder="Role" value={item.role} onChange={e => update(i, "role", e.target.value)} className="bg-secondary border-border flex-1" />
            <Input placeholder="Company" value={item.company} onChange={e => update(i, "company", e.target.value)} className="bg-secondary border-border flex-1" />
            <Input placeholder="Period (optional)" value={item.period || ""} onChange={e => update(i, "period", e.target.value)} className="bg-secondary border-border w-36" />
            <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, j) => j !== i))}><Trash2 size={16} /></Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setItems([...items, { role: "", company: "", period: null, sort_order: items.length }])}><Plus size={14} /> Add Item</Button>
      </div>
      <Button onClick={save} disabled={saving}><Save size={16} /> {saving ? "Saving..." : "Save"}</Button>
    </div>
  );
};

export default ExperienceEditor;
