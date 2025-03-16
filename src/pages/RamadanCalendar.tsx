
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar as CalendarIcon } from 'lucide-react';

interface RamadanDay {
  day: number;
  gregorianDate: string;
  fajr: string;
  sunrise: string;
  maghrib: string;
  imsak: string;
}

const RamadanCalendar = () => {
  const [ramadanData, setRamadanData] = useState<RamadanDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchRamadanCalendar = async () => {
      try {
        setLoading(true);
        
        // For this example, we'll create sample data since the actual API implementation would depend on specific sources
        // In a real implementation, you would fetch from an Islamic calendar API
        
        // Sample data - in a real app you would get this from an API
        const currentDate = new Date();
        const startDate = new Date(year, 2, 10); // March 10 as example
        
        const sampleData: RamadanDay[] = [];
        for (let i = 1; i <= 30; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i - 1);
          
          sampleData.push({
            day: i,
            gregorianDate: date.toLocaleDateString('ar-SA'),
            fajr: '04:30',
            sunrise: '06:00',
            maghrib: '18:30',
            imsak: '04:15',
          });
        }
        
        setRamadanData(sampleData);
        
        // Calculate current day of Ramadan (if we're in Ramadan)
        const daysSinceStart = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        if (daysSinceStart > 0 && daysSinceStart <= 30) {
          setCurrentDay(daysSinceStart);
        }
      } catch (error) {
        console.error('Error fetching Ramadan calendar:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRamadanCalendar();
  }, [year]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center font-arabic">إمساكية رمضان</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <CalendarIcon className="animate-spin h-8 w-8" />
        </div>
      ) : (
        <div className="space-y-6">
          {currentDay && (
            <Card className="bg-islamic-teal/10 border-islamic-teal">
              <CardHeader>
                <CardTitle className="text-center text-islamic-teal">اليوم الحالي من رمضان</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-4xl font-arabic">{currentDay}</h3>
                <p className="mt-2">
                  {ramadanData[currentDay - 1]?.gregorianDate}
                </p>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center font-arabic">إمساكية رمضان {year} هـ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">اليوم</TableHead>
                      <TableHead className="text-right">التاريخ</TableHead>
                      <TableHead className="text-right">الإمساك</TableHead>
                      <TableHead className="text-right">الفجر</TableHead>
                      <TableHead className="text-right">الشروق</TableHead>
                      <TableHead className="text-right">المغرب</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ramadanData.map((day) => (
                      <TableRow 
                        key={day.day} 
                        className={day.day === currentDay ? 'bg-islamic-teal/10' : ''}
                      >
                        <TableCell className="font-medium">{day.day}</TableCell>
                        <TableCell>{day.gregorianDate}</TableCell>
                        <TableCell>{day.imsak}</TableCell>
                        <TableCell>{day.fajr}</TableCell>
                        <TableCell>{day.sunrise}</TableCell>
                        <TableCell>{day.maghrib}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RamadanCalendar;
