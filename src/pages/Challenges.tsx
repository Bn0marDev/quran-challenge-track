
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ChallengeCard from '@/components/ChallengeCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Award, BookOpen, Calendar, CheckCircle, Users } from 'lucide-react';

// بيانات وهمية للتحديات حتى نقوم بربطها مع Supabase لاحقاً
const challengesMockData = [
  {
    id: '1',
    title: 'ختم القرآن في شهر',
    description: 'قراءة القرآن الكريم كاملاً في مدة شهر واحد',
    duration: '30 يوم',
    type: 'quran' as const,
    difficulty: 'intermediate' as const,
    progress: 0,
  },
  {
    id: '2',
    title: 'أذكار الصباح والمساء',
    description: 'المداومة على أذكار الصباح والمساء لمدة 21 يوماً',
    duration: '21 يوم',
    type: 'athkar' as const,
    difficulty: 'beginner' as const,
    progress: 0,
  },
  {
    id: '3',
    title: 'قراءة سورة الكهف كل جمعة',
    description: 'قراءة سورة الكهف كل يوم جمعة لمدة شهرين',
    duration: '8 أسابيع',
    type: 'quran' as const,
    difficulty: 'beginner' as const,
    progress: 0,
  },
  {
    id: '4',
    title: 'قيام الليل',
    description: 'المداومة على قيام الليل لمدة أسبوعين',
    duration: '14 يوم',
    type: 'mixed' as const,
    difficulty: 'advanced' as const,
    progress: 0,
  },
  {
    id: '5',
    title: 'حفظ جزء عم',
    description: 'حفظ جزء عم كاملاً في فترة شهرين',
    duration: '60 يوم',
    type: 'quran' as const,
    difficulty: 'intermediate' as const,
    progress: 0,
  },
  {
    id: '6',
    title: 'الاستغفار 100 مرة يومياً',
    description: 'المداومة على الاستغفار 100 مرة يومياً لمدة شهر',
    duration: '30 يوم',
    type: 'athkar' as const,
    difficulty: 'beginner' as const,
    progress: 0,
  },
];

export default function Challenges() {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const [activeChallenges, setActiveChallenges] = useState<typeof challengesMockData>([]);
  const [availableChallenges, setAvailableChallenges] = useState<typeof challengesMockData>([]);
  const [completedChallenges, setCompletedChallenges] = useState<typeof challengesMockData>([]);

  useEffect(() => {
    // في المستقبل سنقوم بجلب البيانات من Supabase
    setAvailableChallenges(challengesMockData);
    setActiveChallenges([]);
    setCompletedChallenges([]);
  }, []);

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
              التحديات
            </h1>
            <p className="text-foreground/70">
              اختر التحديات التي تناسبك من قراءة القرآن وحفظه والمواظبة على الأذكار
            </p>
          </div>
          
          <Tabs defaultValue="available">
            <div className="mb-8">
              <TabsList className="w-full grid grid-cols-1 md:grid-cols-3">
                <TabsTrigger value="available" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  التحديات المتاحة
                  <Badge variant="outline" className="ml-2 bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold">
                    {availableChallenges.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="active" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  التحديات النشطة
                  <Badge variant="outline" className="ml-2 bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold">
                    {activeChallenges.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  التحديات المكتملة
                  <Badge variant="outline" className="ml-2 bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold">
                    {completedChallenges.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="available">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="p-2 rounded-full bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold">التحديات المتاحة</h2>
                  </div>
                </div>
                
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {availableChallenges.map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
                </div>
                
                {availableChallenges.length === 0 && (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">لا توجد تحديات متاحة حالياً</h3>
                    <p className="mt-2 text-muted-foreground">تحقق قريباً من التحديات الجديدة</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="active">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="p-2 rounded-full bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold">
                      <Award className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold">التحديات النشطة</h2>
                  </div>
                </div>
                
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {activeChallenges.map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
                </div>
                
                {activeChallenges.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">ليس لديك تحديات نشطة</h3>
                    <p className="mt-2 text-muted-foreground">ابدأ تحدي جديد من قائمة التحديات المتاحة</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="p-2 rounded-full bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold">التحديات المكتملة</h2>
                  </div>
                </div>
                
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {completedChallenges.map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={{...challenge, completed: true}} />
                  ))}
                </div>
                
                {completedChallenges.length === 0 && (
                  <div className="text-center py-12">
                    <Award className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">لم تكمل أي تحدي بعد</h3>
                    <p className="mt-2 text-muted-foreground">تابع التحديات النشطة لديك لإكمالها</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 glass p-6 rounded-lg text-center">
            <h3 className="font-arabic text-xl font-semibold mb-4">فضل المداومة على الطاعات</h3>
            <blockquote className="text-foreground/80 italic">
              <p className="text-lg mb-4 font-arabic">
                "أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ"
              </p>
              <p className="text-sm text-muted-foreground">- صحيح البخاري</p>
            </blockquote>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
