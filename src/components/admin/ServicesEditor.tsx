import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useServices } from "@/hooks/useSiteContent";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Save } from "lucide-react";

type ServiceItem = { id?: string; title: string; description: string; icon_name: string; sort_order: number };

const ServicesEditor = () => {
  const { data: services } = useServices();
  const queryClient = useQueryClient();
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (services) setItems(services.map(s => ({ ...s })));
  }, [services]);

  const update = (i: number, field: keyof ServiceItem, val: string) => {
    const copy = [...items];
    (copy[i] as any)[field] = val;
    setItems(copy);
  };

  const save = async () => {
    setSaving(true);
    try {
      const existingIds = services?.map(s => s.id) || [];
      const currentIds = items.filter(i => i.id).map(i => i.id!);
      const toDelete = existingIds.filter(id => !currentIds.includes(id));
      if (toDelete.length) await supabase.from("services").delete().in("id", toDelete);

      for (const item of items) {
        if (item.id) {
          await supabase.from("services").update({ title: item.title, description: item.description, icon_name: item.icon_name, sort_order: item.sort_order }).eq("id", item.id);
        } else {
          await supabase.from("services").insert({ title: item.title, description: item.description, icon_name: item.icon_name, sort_order: item.sort_order });
        }
      }
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Services saved!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-semibold">Services</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="p-4 rounded-lg border border-border space-y-3">
            <div className="flex gap-2">
              <Input placeholder="Title" value={item.title} onChange={e => update(i, "title", e.target.value)} className="bg-secondary border-border" />
              <Input placeholder="Icon (e.g. Palette)" value={item.icon_name} onChange={e => update(i, "icon_name", e.target.value)} className="bg-secondary border-border w-40" />
              <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, j) => j !== i))}><Trash2 size={16} /></Button>
            </div>
            <Textarea placeholder="Description" value={item.description} onChange={e => update(i, "description", e.target.value)} className="bg-secondary border-border" rows={2} />
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setItems([...items, { title: "", description: "", icon_name: "Palette", sort_order: items.length }])}><Plus size={14} /> Add Service</Button>
      </div>
      <Button onClick={save} disabled={saving}><Save size={16} /> {saving ? "Saving..." : "Save"}</Button>
    </div>
  );
};

export default ServicesEditor;
