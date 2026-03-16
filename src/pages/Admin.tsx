import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import HeroEditor from "@/components/admin/HeroEditor";
import AboutEditor from "@/components/admin/AboutEditor";
import ServicesEditor from "@/components/admin/ServicesEditor";
import SkillsEditor from "@/components/admin/SkillsEditor";
import PortfolioEditor from "@/components/admin/PortfolioEditor";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
import ContactEditor from "@/components/admin/ContactEditor";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/admin/login"); return; }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      if (!roles?.some((r: any) => r.role === "admin")) {
        navigate("/admin/login");
        return;
      }

      setAuthorized(true);
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading || !authorized) {
    return <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground">Loading...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut size={16} /> Logout
        </Button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="hero"><HeroEditor /></TabsContent>
          <TabsContent value="about"><AboutEditor /></TabsContent>
          <TabsContent value="services"><ServicesEditor /></TabsContent>
          <TabsContent value="skills"><SkillsEditor /></TabsContent>
          <TabsContent value="portfolio"><PortfolioEditor /></TabsContent>
          <TabsContent value="experience"><ExperienceEditor /></TabsContent>
          <TabsContent value="contact"><ContactEditor /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
