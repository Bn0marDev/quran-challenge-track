
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { searchParams } = new URL(window.location.href);
      const code = searchParams.get('code');
      
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      }
      
      // Redirect to the home page after successful authentication
      navigate('/');
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">جاري تسجيل الدخول...</h2>
        <p className="mt-2">يرجى الانتظار بينما نقوم بمعالجة تسجيل دخولك.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
