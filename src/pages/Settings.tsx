import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Profile Information</h2>
          <p className="text-gray-500">Email: {profile?.email}</p>
          <p className="text-gray-500">Name: {profile?.full_name || 'Not set'}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Email Preferences</h2>
          <Button variant="outline">Update Email Preferences</Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Password</h2>
          <Button variant="outline">Change Password</Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;