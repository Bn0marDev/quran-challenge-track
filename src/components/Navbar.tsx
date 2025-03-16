
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Book, Calendar, Home, Menu, UserCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { label: 'الرئيسية', path: '/', icon: Home },
  { label: 'القرآن الكريم', path: '/quran', icon: Book },
  { label: 'الأذكار', path: '/athkar', icon: Calendar },
  { label: 'التحديات', path: '/challenges', icon: Calendar },
  { label: 'الملف الشخصي', path: '/profile', icon: UserCircle },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 font-ui",
      isScrolled 
        ? "py-2 bg-background/90 backdrop-blur-lg shadow-sm" 
        : "py-4 bg-transparent"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <motion.div 
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-islamic-teal text-white font-arabic text-xl"
          >
            ق
          </motion.div>
          <span className="font-arabic text-xl font-bold text-islamic-teal dark:text-islamic-lightGold">
            نور القرآن
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          {navItems.map((item) => (
            <NavLink key={item.path} item={item} active={location.pathname === item.path} />
          ))}
        </nav>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <ThemeToggle />
          
          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 glass mt-2 rounded-lg">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <NavLink 
                    key={item.path} 
                    item={item} 
                    active={location.pathname === item.path}
                    mobile
                  />
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface NavLinkProps {
  item: NavItem;
  active: boolean;
  mobile?: boolean;
}

function NavLink({ item, active, mobile = false }: NavLinkProps) {
  const Icon = item.icon;
  
  const baseClasses = "relative flex items-center transition-all duration-300 group";
  const mobileClasses = mobile 
    ? "px-3 py-2 rounded-md w-full justify-start text-lg"
    : "font-medium text-md";
  
  const activeClasses = active 
    ? "text-islamic-teal dark:text-islamic-lightGold" 
    : "text-foreground/70 hover:text-islamic-teal dark:hover:text-islamic-lightGold";

  return (
    <Link 
      to={item.path}
      className={cn(baseClasses, mobileClasses, activeClasses)}
    >
      <Icon className={cn("h-4 w-4 mr-2", mobile && "h-5 w-5")} />
      <span>{item.label}</span>
      
      {active && !mobile && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute bottom-[-8px] left-0 right-0 h-0.5 bg-islamic-teal dark:bg-islamic-lightGold rounded-full"
        />
      )}
      
      {active && mobile && (
        <motion.div
          layoutId="mobileActiveNavIndicator"
          className="absolute left-0 top-0 bottom-0 w-1 bg-islamic-teal dark:bg-islamic-lightGold rounded-full"
        />
      )}
    </Link>
  );
}

export default Navbar;
