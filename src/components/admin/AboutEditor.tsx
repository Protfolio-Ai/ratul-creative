import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const AboutEditor = () => {
  const { data: content } = useSiteContent();
  const queryClient = useQueryClient();
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content) {
      setText1(content.about_text_1 || "");
      setText2(content.about_text_2 || "");
    }
  }, [content]);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("site_content").upsert([
      { id: "about_text_1", value: text1, updated_at: new Date().toISOString() },
      { id: "about_text_2", value: text2, updated_at: new Date().toISOString() },
    ]);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { queryClient.invalidateQueries({ queryKey: ["site-content"] }); toast({ title: "About section saved!" }); }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-semibold">About Section</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Paragraph 1</label>
          <Textarea rows={4} value={text1} onChange={e => setText1(e.target.value)} className="bg-secondary border-border" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Paragraph 2</label>
          <Textarea rows={4} value={text2} onChange={e => setText2(e.target.value)} className="bg-secondary border-border" />
        </div>
      </div>
      <Button onClick={save} disabled={saving}><Save size={16} /> {saving ? "Saving..." : "Save"}</Button>
    </div>
  );
};

export default AboutEditor;
