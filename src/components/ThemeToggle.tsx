
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden rounded-full"
      aria-label={theme === 'light' ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح'}
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: theme === 'light' ? 0 : 180, opacity: theme === 'light' ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun size={18} className="text-islamic-gold" />
        </motion.div>
        <motion.div
          initial={{ rotate: 180 }}
          animate={{ rotate: theme === 'light' ? 180 : 0, opacity: theme === 'light' ? 0 : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon size={18} className="text-islamic-gold" />
        </motion.div>
      </div>
    </Button>
  );
}

export default ThemeToggle;
