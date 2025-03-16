
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, ChevronLeft, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Quran data until we integrate with API
const quranSample = {
  arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾",
  translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful. [1] All praise is due to Allah, Lord of the worlds [2] The Entirely Merciful, the Especially Merciful, [3] Sovereign of the Day of Recompense. [4] It is You we worship and You we ask for help. [5] Guide us to the straight path - [6] The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray. [7]",
  surah: "الفاتحة",
  surahNumber: 1,
  ayahNumbers: [1, 2, 3, 4, 5, 6, 7]
};

interface QuranReaderProps {
  initialSurah?: number;
  initialAyah?: number;
}

export function QuranReader({ initialSurah = 1, initialAyah = 1 }: QuranReaderProps) {
  const [fontSize, setFontSize] = useState(24);
  const [showTranslation, setShowTranslation] = useState(true);
  const [currentSurah, setCurrentSurah] = useState(initialSurah);
  const [loading, setLoading] = useState(false);
  
  // Use proper Arabic text rendering
  const arabicContent = quranSample.arabic.split('﴿').map((part, index) => {
    if (index === 0) return <span key={index}>{part}</span>;
    
    const [ayahNum, text] = part.split('﴾');
    return (
      <span key={index}>
        <span className="ayah-separator">{ayahNum}</span>
        {text}
      </span>
    );
  });

  const handlePrevSurah = () => {
    setLoading(true);
    // In real implementation, you would fetch previous surah
    setTimeout(() => {
      if (currentSurah > 1) {
        setCurrentSurah(prev => prev - 1);
      }
      setLoading(false);
    }, 500);
  };

  const handleNextSurah = () => {
    setLoading(true);
    // In real implementation, you would fetch next surah
    setTimeout(() => {
      if (currentSurah < 114) {
        setCurrentSurah(prev => prev + 1);
      }
      setLoading(false);
    }, 500);
  };

  const handleBookmark = () => {
    // Here you would save bookmark to user's account
    console.log(`Bookmarked Surah ${currentSurah}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="overflow-hidden glass-card">
        {/* Controls */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFontSize(prev => Math.max(prev - 2, 18))}
            >
              أ-
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFontSize(prev => Math.min(prev + 2, 32))}
            >
              أ+
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTranslation(!showTranslation)}
            >
              {showTranslation ? 'إخفاء الترجمة' : 'إظهار الترجمة'}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className="text-islamic-gold"
          >
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Surah Navigation */}
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevSurah}
            disabled={currentSurah <= 1 || loading}
            className="flex items-center rtl:flex-row-reverse"
          >
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            <span>السابق</span>
          </Button>
          
          <h2 className="text-lg font-arabic font-semibold decoration-islamic">
            سورة {quranSample.surah}
          </h2>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextSurah}
            disabled={currentSurah >= 114 || loading}
            className="flex items-center rtl:flex-row-reverse"
          >
            <span>التالي</span>
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          </Button>
        </div>
        
        <CardContent className="p-6">
          <motion.div
            key={currentSurah}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Arabic Text */}
            <div 
              dir="rtl" 
              className="font-arabic leading-loose mb-6 text-right"
              style={{ fontSize: `${fontSize}px` }}
            >
              {arabicContent}
            </div>
            
            {/* Translation */}
            {showTranslation && (
              <div className="mt-6 pt-6 border-t border-border/30 text-foreground/80 leading-relaxed">
                {quranSample.translation}
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuranReader;
