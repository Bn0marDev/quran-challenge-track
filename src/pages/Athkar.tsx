
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import AthkarSection from '@/components/AthkarSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bell, Coffee, Moon, Sun } from 'lucide-react';

export default function Athkar() {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div dir="rtl" className="min-h-screen font-ui relative">
      <div className="absolute inset-0 islamic-pattern pointer-events-none"></div>
      
      <Navbar />
      
      <motion.main
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="container px-4 md:px-6 pt-32 pb-12"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-arabic text-islamic-teal dark:text-islamic-lightGold mb-4">
              الأذكار اليومية
            </h1>
            <p className="text-foreground/70">
              أذكار الصباح والمساء والأذكار العامة، حافظ على وردك اليومي
            </p>
          </div>
          
          <Tabs defaultValue="morning">
            <div className="mb-8">
              <TabsList className="w-full grid grid-cols-1 md:grid-cols-3">
                <TabsTrigger value="morning" className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  أذكار الصباح
                  <Badge variant="outline" className="ml-2 bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold">15</Badge>
                </TabsTrigger>
                <TabsTrigger value="evening" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  أذكار المساء
                  <Badge variant="outline" className="ml-2 bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold">14</Badge>
                </TabsTrigger>
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <Coffee className="h-4 w-4" />
                  أذكار عامة
                  <Badge variant="outline" className="ml-2 bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold">20</Badge>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="morning">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="p-2 rounded-full bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold">
                      <Sun className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold">أذكار الصباح</h2>
                  </div>
                  
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Bell className="h-3 w-3" />
                    <span>تذكير يومي 6:00 صباحاً</span>
                  </Badge>
                </div>
                
                <AthkarSection />
              </div>
            </TabsContent>
            
            <TabsContent value="evening">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="p-2 rounded-full bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold">
                      <Moon className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold">أذكار المساء</h2>
                  </div>
                  
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Bell className="h-3 w-3" />
                    <span>تذكير يومي 6:00 مساءً</span>
                  </Badge>
                </div>
                
                <AthkarSection />
              </div>
            </TabsContent>
            
            <TabsContent value="general">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="p-2 rounded-full bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold">
                      <Coffee className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold">أذكار عامة</h2>
                  </div>
                </div>
                
                <AthkarSection />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 glass p-6 rounded-lg text-center">
            <h3 className="font-arabic text-xl font-semibold mb-4">فضل الذكر</h3>
            <blockquote className="text-foreground/80 italic">
              <p className="text-lg mb-4 font-arabic">
                "وَالذَّاكِرِينَ اللَّهَ كَثِيرًا وَالذَّاكِرَاتِ أَعَدَّ اللَّهُ لَهُم مَّغْفِرَةً وَأَجْرًا عَظِيمًا"
              </p>
              <p className="text-sm text-muted-foreground">- سورة الأحزاب: 35</p>
            </blockquote>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
