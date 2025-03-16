
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Repeat, Copy, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for Athkar
const athkarData = [
  {
    id: 1,
    text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
    translation: "Glory be to Allah and His is the praise, Glory be to Allah the Almighty",
    benefit: "ثقيلتان في الميزان، حبيبتان إلى الرحمن",
    repeat: 3,
  },
  {
    id: 2,
    text: "لا إلَه إلاّ اللهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلُّ شَيْءٍ قَدِيرِ",
    translation: "None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and praise, and He is over all things omnipotent",
    benefit: "من قالها في يوم مائة مرة، كانت له عدل عشر رقاب",
    repeat: 10,
  },
  {
    id: 3,
    text: "أستغفر الله",
    translation: "I seek forgiveness from Allah",
    benefit: "من لزم الاستغفار جعل الله له من كل هم فرجاً، ومن كل ضيق مخرجاً",
    repeat: 100,
  },
];

export function AthkarSection() {
  const [copied, setCopied] = useState<number | null>(null);
  const [counts, setCounts] = useState<Record<number, number>>({});

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCount = (id: number, total: number) => {
    setCounts(prev => {
      const current = prev[id] || 0;
      if (current >= total) return { ...prev, [id]: 0 };
      return { ...prev, [id]: current + 1 };
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {athkarData.map((dhikr) => (
        <motion.div key={dhikr.id} variants={item}>
          <Card className="h-full glass-card overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="font-arabic text-xl font-medium text-islamic-teal dark:text-islamic-lightGold">
                  ذِكْر
                </CardTitle>
                <Badge variant="outline" className="bg-islamic-teal/10 text-islamic-teal dark:bg-islamic-gold/10 dark:text-islamic-lightGold">
                  {counts[dhikr.id] || 0}/{dhikr.repeat}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div dir="rtl" className="font-arabic text-lg leading-relaxed mb-3 text-right">
                {dhikr.text}
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">
                {dhikr.translation}
              </p>
              
              <div className="mt-4 pt-4 border-t border-border/30">
                <h4 className="text-sm font-medium text-islamic-teal dark:text-islamic-lightGold">
                  الفضل:
                </h4>
                <p className="text-sm text-foreground/80 mt-1 font-arabic">
                  {dhikr.benefit}
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-border/30 pt-4 gap-2 flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1 gap-1"
                onClick={() => handleCopy(dhikr.id, dhikr.text)}
              >
                {copied === dhikr.id ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>نسخ</span>
                  </>
                )}
              </Button>
              
              <Button 
                variant="default" 
                size="sm"
                className="flex-1 gap-1 bg-islamic-teal hover:bg-islamic-deepTeal"
                onClick={() => handleCount(dhikr.id, dhikr.repeat)}
              >
                <Repeat className="h-4 w-4" />
                <span>تسبيح</span>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default AthkarSection;
