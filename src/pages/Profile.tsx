
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(profile?.username || '');

  if (!user) {
    return <Navigate to="/auth" />;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      await refreshProfile();
      toast({
        title: "تم تحديث الملف الشخصي",
        description: "تم تحديث معلومات ملفك الشخصي بنجاح",
      });
    } catch (error: any) {
      toast({
        title: "حدث خطأ",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center font-arabic">الملف الشخصي</h1>
      
      <Card>
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src={profile?.avatar_url || ''} />
            <AvatarFallback className="text-2xl">{username?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4">{profile?.username || user.email}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">اسم المستخدم</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="اسم المستخدم"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-islamic-teal hover:bg-islamic-deepTeal"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  جاري التحديث...
                </>
              ) : (
                'تحديث الملف الشخصي'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={signOut} 
            variant="outline" 
            className="w-full"
          >
            تسجيل الخروج
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
