
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import AthkarSection from '@/components/AthkarSection';
import ChallengeCard from '@/components/ChallengeCard';
import AuthModal from '@/components/AuthModal';
import { ArrowRight, BookOpen, Calendar, Shield, Target } from 'lucide-react';

// Mock data for challenges
const challengeSamples = [
  {
    id: "challenge-1",
    title: "ختم القرآن في شهر",
    description: "تحدي قراءة القرآن الكريم كاملاً خلال شهر واحد",
    duration: "30 يوماً",
    type: "quran" as const,
    difficulty: "intermediate" as const,
    progress: 0
  },
  {
    id: "challenge-2",
    title: "أذكار الصباح والمساء",
    description: "المداومة على أذكار الصباح والمساء لمدة 21 يوم",
    duration: "21 يوماً",
    type: "athkar" as const,
    difficulty: "beginner" as const,
    progress: 35
  },
  {
    id: "challenge-3",
    title: "جزء عمّ",
    description: "حفظ جزء عمّ (الجزء الثلاثين من القرآن)",
    duration: "40 يوماً",
    type: "mixed" as const,
    difficulty: "advanced" as const,
    progress: 65
  }
];

export default function Index() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  const iconFeatures = [
    { 
      icon: <BookOpen className="h-10 w-10" />, 
      title: "القرآن الكريم", 
      description: "اقرأ القرآن الكريم واستمع إليه بصوت العديد من القراء المشهورين"
    },
    { 
      icon: <Calendar className="h-10 w-10" />, 
      title: "الأذكار اليومية", 
      description: "أذكار الصباح والمساء والأذكار العامة مع تذكيرات يومية" 
    },
    { 
      icon: <Target className="h-10 w-10" />, 
      title: "التحديات", 
      description: "شارك في تحديات القراءة والحفظ لتطوير علاقتك بالقرآن" 
    },
    { 
      icon: <Shield className="h-10 w-10" />, 
      title: "متابعة التقدم", 
      description: "تتبع تقدمك في القراءة والحفظ والتحديات بسهولة" 
    }
  ];

  return (
    <div dir="rtl" className="min-h-screen font-ui relative overflow-x-hidden">
      <div className="absolute inset-0 islamic-pattern pointer-events-none"></div>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            style={{ opacity, y: translateY }}
          >
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              className="inline-block mb-4 text-sm font-medium px-3 py-1 rounded-full bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold"
            >
              رحلة مع كتاب الله
            </motion.div>
            
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              className="font-arabic text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance"
            >
              نور القرآن يضيء <span className="text-islamic-teal dark:text-islamic-lightGold">حياتك</span>
            </motion.h1>
            
            <motion.p 
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto"
            >
              انضم إلينا في رحلة مع كتاب الله، اقرأ وتعلم وتذكر واستمتع بتجربة روحانية متكاملة
            </motion.p>
            
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="bg-islamic-teal hover:bg-islamic-deepTeal"
                onClick={() => setIsAuthModalOpen(true)}
              >
                ابدأ الآن
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
              
              <Link to="/quran">
                <Button variant="outline" size="lg">
                  استكشف القرآن
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-background to-transparent pointer-events-none"
        />
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-arabic text-islamic-teal dark:text-islamic-lightGold mb-4">
              مميزات التطبيق
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              صمم التطبيق ليساعدك في بناء علاقة أقوى مع القرآن الكريم والأذكار اليومية بطريقة سهلة ومميزة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {iconFeatures.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUpVariants}
              >
                <Card className="h-full glass-card">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-foreground/70">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Daily Athkar Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold font-arabic text-islamic-teal dark:text-islamic-lightGold mb-2">
                الأذكار اليومية
              </h2>
              <p className="text-foreground/70 max-w-2xl">
                أذكار الصباح والمساء والأذكار العامة، حافظ على وردك اليومي
              </p>
            </div>
            
            <Link to="/athkar">
              <Button variant="outline" className="md:shrink-0">
                عرض كل الأذكار
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <AthkarSection />
        </div>
      </section>
      
      {/* Challenges Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold font-arabic text-islamic-teal dark:text-islamic-lightGold mb-2">
                تحديات القرآن
              </h2>
              <p className="text-foreground/70 max-w-2xl">
                شارك في تحديات متنوعة لقراءة وحفظ القرآن الكريم وتابع تقدمك
              </p>
            </div>
            
            <Link to="/challenges">
              <Button variant="outline" className="md:shrink-0">
                عرض كل التحديات
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challengeSamples.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUpVariants}
              >
                <ChallengeCard challenge={challenge} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-islamic-teal dark:bg-islamic-dark bg-opacity-95 dark:bg-opacity-95 text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-arabic mb-6">
              ابدأ رحلتك مع القرآن الكريم اليوم
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              سجل الآن لحفظ تقدمك ومتابعة إنجازاتك والمشاركة في تحديات متنوعة
            </p>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-islamic-teal"
              onClick={() => setIsAuthModalOpen(true)}
            >
              سجل الآن
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-islamic-teal text-white font-arabic text-xl">
                  ق
                </div>
                <span className="font-arabic text-xl font-bold text-islamic-teal dark:text-islamic-lightGold">
                  نور القرآن
                </span>
              </div>
              <p className="text-foreground/70 max-w-md">
                تطبيق شامل يجمع بين قراءة القرآن الكريم والأذكار اليومية وتحديات القراءة والحفظ
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/quran" className="text-foreground/70 hover:text-islamic-teal dark:hover:text-islamic-lightGold">
                    القرآن الكريم
                  </Link>
                </li>
                <li>
                  <Link to="/athkar" className="text-foreground/70 hover:text-islamic-teal dark:hover:text-islamic-lightGold">
                    الأذكار
                  </Link>
                </li>
                <li>
                  <Link to="/challenges" className="text-foreground/70 hover:text-islamic-teal dark:hover:text-islamic-lightGold">
                    التحديات
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="text-foreground/70 hover:text-islamic-teal dark:hover:text-islamic-lightGold">
                    الملف الشخصي
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">تواصل معنا</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-foreground/70 hover:text-islamic-teal dark:hover:text-islamic-lightGold">
                    حول التطبيق
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-islamic-teal dark:hover:text-islamic-lightGold">
                    سياسة الخصوصية
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-islamic-teal dark:hover:text-islamic-lightGold">
                    شروط الاستخدام
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-islamic-teal dark:hover:text-islamic-lightGold">
                    الدعم الفني
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-border/30 text-center text-foreground/50 text-sm">
            &copy; {new Date().getFullYear()} نور القرآن. جميع الحقوق محفوظة
          </div>
        </div>
      </footer>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
