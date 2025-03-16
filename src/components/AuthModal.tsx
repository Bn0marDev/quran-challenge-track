
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState('signin');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Close the modal after success
      setTimeout(() => {
        onClose();
        // Reset state after closing
        setTimeout(() => {
          setSuccess(false);
        }, 300);
      }, 1000);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-lg glass overflow-hidden">
        <DialogTitle className="text-center font-arabic text-2xl text-islamic-teal dark:text-islamic-lightGold">
          {activeTab === 'signin' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
        </DialogTitle>
        <DialogDescription className="text-center">
          {activeTab === 'signin' 
            ? 'سجل الدخول للوصول إلى جميع الميزات ومتابعة تقدمك' 
            : 'أنشئ حساباً جديداً للاستفادة من كافة مميزات التطبيق'}
        </DialogDescription>
        
        <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="signin">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="signup">حساب جديد</TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === 'signin' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === 'signin' ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="signin" className="mt-0">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-signin">البريد الإلكتروني</Label>
                      <Input id="email-signin" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password-signin">كلمة المرور</Label>
                        <Button 
                          variant="link" 
                          className="px-0 h-auto text-xs text-islamic-teal dark:text-islamic-lightGold"
                        >
                          نسيت كلمة المرور؟
                        </Button>
                      </div>
                      <Input id="password-signin" type="password" required />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-islamic-teal hover:bg-islamic-deepTeal"
                    disabled={loading || success}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري التسجيل...
                      </>
                    ) : success ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        تم تسجيل الدخول بنجاح
                      </>
                    ) : (
                      'تسجيل الدخول'
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-0">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name-signup">الاسم</Label>
                      <Input id="name-signup" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-signup">البريد الإلكتروني</Label>
                      <Input id="email-signup" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signup">كلمة المرور</Label>
                      <Input id="password-signup" type="password" required />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-islamic-teal hover:bg-islamic-deepTeal"
                    disabled={loading || success}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري إنشاء الحساب...
                      </>
                    ) : success ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        تم إنشاء الحساب بنجاح
                      </>
                    ) : (
                      'إنشاء الحساب'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          بتسجيل الدخول أو إنشاء حساب جديد، أنت توافق على
          <Button variant="link" className="px-1 h-auto text-islamic-teal dark:text-islamic-lightGold">
            شروط الاستخدام
          </Button>
          و
          <Button variant="link" className="px-1 h-auto text-islamic-teal dark:text-islamic-lightGold">
            سياسة الخصوصية
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
