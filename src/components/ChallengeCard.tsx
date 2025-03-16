
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, BookOpen, Calendar, CheckCircle, Clock, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    duration: string;
    type: 'quran' | 'athkar' | 'mixed';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    progress: number;
    completed?: boolean;
    startDate?: string;
  };
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const difficultyColor = {
    beginner: 'text-green-500 bg-green-500/10 border-green-500/20',
    intermediate: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    advanced: 'text-red-500 bg-red-500/10 border-red-500/20'
  };
  
  const difficultyLabel = {
    beginner: 'للمبتدئين',
    intermediate: 'متوسط',
    advanced: 'متقدم'
  };
  
  const typeIcon = {
    quran: BookOpen,
    athkar: Calendar,
    mixed: Trophy
  };
  
  const TypeIcon = typeIcon[challenge.type];
  
  const handleStartChallenge = () => {
    // Here you would save this challenge to the user's profile
    navigate(`/challenges/${challenge.id}/details`);
  };
  
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={`overflow-hidden h-full transition-all duration-300 ${isHovered ? 'shadow-md' : ''} glass-card`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge className={difficultyColor[challenge.difficulty]}>
              {difficultyLabel[challenge.difficulty]}
            </Badge>
            
            <TypeIcon className="h-5 w-5 text-islamic-teal dark:text-islamic-lightGold" />
          </div>
          <CardTitle className="font-arabic text-xl text-islamic-teal dark:text-islamic-lightGold">
            {challenge.title}
          </CardTitle>
          <CardDescription>{challenge.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Clock className="h-4 w-4" />
            <span>{challenge.duration}</span>
          </div>
          
          {challenge.startDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              <span>بدأت في: {challenge.startDate}</span>
            </div>
          )}
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1 text-sm">
              <span>التقدم</span>
              <span className="font-semibold">{challenge.progress}%</span>
            </div>
            <Progress value={challenge.progress} className="h-2" />
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-border/30 pt-4">
          {challenge.completed ? (
            <Button className="w-full bg-islamic-teal hover:bg-islamic-deepTeal" disabled>
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>مكتمل</span>
            </Button>
          ) : challenge.progress > 0 ? (
            <Button 
              className="w-full bg-islamic-teal hover:bg-islamic-deepTeal"
              onClick={handleStartChallenge}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>متابعة التحدي</span>
            </Button>
          ) : (
            <Button 
              className="w-full bg-islamic-teal hover:bg-islamic-deepTeal"
              onClick={handleStartChallenge}
            >
              <Award className="mr-2 h-4 w-4" />
              <span>بدء التحدي</span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ChallengeCard;
