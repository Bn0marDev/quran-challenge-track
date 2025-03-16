
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import QuranReader from '@/components/QuranReader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookMarked, BookOpen } from 'lucide-react';

export default function Quran() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [activeTab, setActiveTab] = useState('read');
  
  // Mock surah list data
  const surahs = [
    { number: 1, name: "الفاتحة", versesCount: 7 },
    { number: 2, name: "البقرة", versesCount: 286 },
    { number: 3, name: "آل عمران", versesCount: 200 },
    { number: 4, name: "النساء", versesCount: 176 },
    { number: 5, name: "المائدة", versesCount: 120 },
    { number: 6, name: "الأنعام", versesCount: 165 },
    { number: 7, name: "الأعراف", versesCount: 206 },
    { number: 8, name: "الأنفال", versesCount: 75 },
    { number: 9, name: "التوبة", versesCount: 129 },
    { number: 10, name: "يونس", versesCount: 109 },
    // More surahs would be added in a real implementation
  ];
  
  // Filter surahs based on search query
  const filteredSurahs = surahs.filter(surah => 
    surah.name.includes(searchQuery) || surah.number.toString().includes(searchQuery)
  );
  
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
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
              القرآن الكريم
            </h1>
            <p className="text-foreground/70">
              اقرأ، استمع، وتدبر آيات القرآن الكريم
            </p>
          </div>
          
          <div className="mb-8">
            <Tabs defaultValue="read" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <TabsList className="w-full md:w-auto">
                  <TabsTrigger value="read" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    قراءة
                  </TabsTrigger>
                  <TabsTrigger value="bookmarks" className="flex items-center gap-2">
                    <BookMarked className="h-4 w-4" />
                    العلامات المرجعية
                  </TabsTrigger>
                </TabsList>
                
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ابحث عن سورة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Surah List */}
                <div className="md:col-span-1">
                  <div className="h-[calc(100vh-300px)] overflow-y-auto pr-2 glass rounded-lg p-4">
                    <motion.div
                      variants={staggerContainerVariants}
                      initial="hidden"
                      animate="show"
                      className="space-y-2"
                    >
                      {filteredSurahs.map((surah) => (
                        <motion.div
                          key={surah.number}
                          variants={itemVariants}
                          onClick={() => setSelectedSurah(surah.number)}
                          className={`cursor-pointer p-3 rounded-md transition-colors flex items-center justify-between ${
                            selectedSurah === surah.number
                              ? "bg-islamic-teal text-white dark:bg-islamic-gold dark:text-islamic-dark"
                              : "hover:bg-muted"
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 ${
                              selectedSurah === surah.number
                                ? "bg-white text-islamic-teal dark:bg-islamic-dark dark:text-islamic-gold"
                                : "bg-muted-foreground/10 text-muted-foreground"
                            }`}>
                              {surah.number}
                            </div>
                            <div>
                              <h3 className="font-arabic font-medium">{surah.name}</h3>
                              <p className={`text-xs ${
                                selectedSurah === surah.number
                                  ? "text-white/80 dark:text-islamic-dark/80"
                                  : "text-muted-foreground"
                              }`}>
                                {surah.versesCount} آية
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
                
                {/* Quran Reader */}
                <div className="md:col-span-2">
                  <TabsContent value="read" className="mt-0">
                    <QuranReader initialSurah={selectedSurah} />
                  </TabsContent>
                  
                  <TabsContent value="bookmarks" className="mt-0">
                    <div className="glass rounded-lg p-6 text-center">
                      <BookMarked className="h-16 w-16 mx-auto mb-4 text-islamic-teal/30 dark:text-islamic-gold/30" />
                      <h3 className="text-xl font-semibold mb-2">لا توجد علامات مرجعية بعد</h3>
                      <p className="text-muted-foreground mb-4">
                        أضف علامات مرجعية أثناء القراءة للوصول إليها بسهولة لاحقاً
                      </p>
                      <Button onClick={() => setActiveTab('read')}>
                        ابدأ القراءة الآن
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
