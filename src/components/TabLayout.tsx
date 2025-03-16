
import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Book, 
  MessageSquareText, 
  Clock, 
  Calendar, 
  Trophy, 
  User,
  Home
} from 'lucide-react';

const TabLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('/');

  useEffect(() => {
    // Update active tab based on current path
    const path = location.pathname;
    setActiveTab(path);
  }, [location]);

  const handleTabClick = (path: string) => {
    navigate(path);
    setActiveTab(path);
  };

  const tabs = [
    { path: '/', icon: <Home className="w-6 h-6" />, label: 'الرئيسية' },
    { path: '/quran', icon: <Book className="w-6 h-6" />, label: 'القرآن' },
    { path: '/athkar', icon: <MessageSquareText className="w-6 h-6" />, label: 'الأذكار' },
    { path: '/prayer-times', icon: <Clock className="w-6 h-6" />, label: 'مواقيت الصلاة' },
    { path: '/ramadan', icon: <Calendar className="w-6 h-6" />, label: 'إمساكية رمضان' },
    { path: '/challenges', icon: <Trophy className="w-6 h-6" />, label: 'التحديات' },
    { path: '/profile', icon: <User className="w-6 h-6" />, label: 'الملف الشخصي' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container py-6">
        <Outlet />
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="container flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              className={`flex flex-1 flex-col items-center py-3 px-1 min-w-[4rem] ${
                activeTab === tab.path 
                  ? 'text-islamic-teal dark:text-islamic-lightGold' 
                  : 'text-muted-foreground'
              }`}
            >
              {tab.icon}
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      {/* Add padding at the bottom to account for the fixed tab bar */}
      <div className="h-20"></div>
    </div>
  );
};

export default TabLayout;
