import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSkills } from "@/hooks/useSiteContent";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Save } from "lucide-react";

type SkillItem = { id?: string; name: string; percentage: number; category: string; sort_order: number };

const SkillsEditor = () => {
  const { data: skills } = useSkills();
  const queryClient = useQueryClient();
  const [items, setItems] = useState<SkillItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (skills) setItems(skills.map(s => ({ ...s })));
  }, [skills]);

  const update = (i: number, field: keyof SkillItem, val: string | number) => {
    const copy = [...items];
    (copy[i] as any)[field] = val;
    setItems(copy);
  };

  const save = async () => {
    setSaving(true);
    try {
      const existingIds = skills?.map(s => s.id) || [];
      const currentIds = items.filter(i => i.id).map(i => i.id!);
      const toDelete = existingIds.filter(id => !currentIds.includes(id));
      if (toDelete.length) await supabase.from("skills").delete().in("id", toDelete);

      for (const item of items) {
        if (item.id) {
          await supabase.from("skills").update({ name: item.name, percentage: item.percentage, category: item.category, sort_order: item.sort_order }).eq("id", item.id);
        } else {
          await supabase.from("skills").insert({ name: item.name, percentage: item.percentage, category: item.category, sort_order: item.sort_order });
        }
      }
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast({ title: "Skills saved!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-semibold">Skills</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input placeholder="Skill name" value={item.name} onChange={e => update(i, "name", e.target.value)} className="bg-secondary border-border flex-1" />
            <Input type="number" min={0} max={100} value={item.percentage} onChange={e => update(i, "percentage", parseInt(e.target.value) || 0)} className="bg-secondary border-border w-20" />
            <Input placeholder="Category" value={item.category} onChange={e => update(i, "category", e.target.value)} className="bg-secondary border-border w-28" />
            <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, j) => j !== i))}><Trash2 size={16} /></Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setItems([...items, { name: "", percentage: 50, category: "Design", sort_order: items.length }])}><Plus size={14} /> Add Skill</Button>
      </div>
      <Button onClick={save} disabled={saving}><Save size={16} /> {saving ? "Saving..." : "Save"}</Button>
    </div>
  );
};

export default SkillsEditor;
