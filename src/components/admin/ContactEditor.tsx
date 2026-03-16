import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const ContactEditor = () => {
  const { data: content } = useSiteContent();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [behance, setBehance] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [pinterest, setPinterest] = useState("");
  const [footer, setFooter] = useState("");
  const [cvDesc, setCvDesc] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content) {
      setEmail(content.contact_email || "");
      setPhone(content.contact_phone || "");
      setLocation(content.contact_location || "");
      setWhatsapp(content.whatsapp_number || "");
      setBehance(content.behance_url || "");
      setFacebook(content.facebook_url || "");
      setLinkedin(content.linkedin_url || "");
      setInstagram(content.instagram_url || "");
      setPinterest(content.pinterest_url || "");
      setFooter(content.footer_text || "");
      setCvDesc(content.cv_description || "");
    }
  }, [content]);

  const save = async () => {
    setSaving(true);
    const now = new Date().toISOString();
    const { error } = await supabase.from("site_content").upsert([
      { id: "contact_email", value: email, updated_at: now },
      { id: "contact_phone", value: phone, updated_at: now },
      { id: "contact_location", value: location, updated_at: now },
      { id: "whatsapp_number", value: whatsapp, updated_at: now },
      { id: "behance_url", value: behance, updated_at: now },
      { id: "facebook_url", value: facebook, updated_at: now },
      { id: "linkedin_url", value: linkedin, updated_at: now },
      { id: "instagram_url", value: instagram, updated_at: now },
      { id: "pinterest_url", value: pinterest, updated_at: now },
      { id: "footer_text", value: footer, updated_at: now },
      { id: "cv_description", value: cvDesc, updated_at: now },
    ]);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { queryClient.invalidateQueries({ queryKey: ["site-content"] }); toast({ title: "Contact & Footer saved!" }); }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-semibold">Contact & Footer</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium mb-1 block">Email</label><Input value={email} onChange={e => setEmail(e.target.value)} className="bg-secondary border-border" /></div>
        <div><label className="text-sm font-medium mb-1 block">Phone</label><Input value={phone} onChange={e => setPhone(e.target.value)} className="bg-secondary border-border" /></div>
        <div><label className="text-sm font-medium mb-1 block">Location</label><Input value={location} onChange={e => setLocation(e.target.value)} className="bg-secondary border-border" /></div>
        <div><label className="text-sm font-medium mb-1 block">WhatsApp Number</label><Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="bg-secondary border-border" /></div>
        <div><label className="text-sm font-medium mb-1 block">Behance URL</label><Input value={behance} onChange={e => setBehance(e.target.value)} className="bg-secondary border-border" /></div>
        <div><label className="text-sm font-medium mb-1 block">Facebook URL</label><Input value={facebook} onChange={e => setFacebook(e.target.value)} className="bg-secondary border-border" /></div>
        <div><label className="text-sm font-medium mb-1 block">LinkedIn URL</label><Input value={linkedin} onChange={e => setLinkedin(e.target.value)} className="bg-secondary border-border" /></div>
        <div><label className="text-sm font-medium mb-1 block">Instagram URL</label><Input value={instagram} onChange={e => setInstagram(e.target.value)} className="bg-secondary border-border" /></div>
        <div className="sm:col-span-2"><label className="text-sm font-medium mb-1 block">Pinterest URL</label><Input value={pinterest} onChange={e => setPinterest(e.target.value)} className="bg-secondary border-border" /></div>
      </div>
      <div><label className="text-sm font-medium mb-1 block">CV Description</label><Textarea value={cvDesc} onChange={e => setCvDesc(e.target.value)} className="bg-secondary border-border" rows={2} /></div>
      <div><label className="text-sm font-medium mb-1 block">Footer Text</label><Input value={footer} onChange={e => setFooter(e.target.value)} className="bg-secondary border-border" /></div>
      <Button onClick={save} disabled={saving}><Save size={16} /> {saving ? "Saving..." : "Save"}</Button>
    </div>
  );
};

export default ContactEditor;
