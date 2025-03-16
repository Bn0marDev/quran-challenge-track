
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface PrayerTime {
  name: string;
  time: string;
  arabicName: string;
}

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Mecca');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Set up timer to update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        // Using Al Adhan API for prayer times
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Saudi Arabia&method=4`
        );
        const data = await response.json();
        
        if (data.code === 200) {
          const timings = data.data.timings;
          
          const prayersData = [
            { name: 'Fajr', arabicName: 'الفجر', time: timings.Fajr },
            { name: 'Sunrise', arabicName: 'الشروق', time: timings.Sunrise },
            { name: 'Dhuhr', arabicName: 'الظهر', time: timings.Dhuhr },
            { name: 'Asr', arabicName: 'العصر', time: timings.Asr },
            { name: 'Maghrib', arabicName: 'المغرب', time: timings.Maghrib },
            { name: 'Isha', arabicName: 'العشاء', time: timings.Isha },
          ];
          
          setPrayerTimes(prayersData);
          
          // Calculate next prayer
          const now = new Date();
          const prayersWithTime = prayersData.map(prayer => {
            const [hour, minute] = prayer.time.split(':').map(Number);
            const prayerTime = new Date();
            prayerTime.setHours(hour, minute, 0);
            return { ...prayer, dateTime: prayerTime };
          });
          
          const upcomingPrayers = prayersWithTime.filter(prayer => prayer.dateTime > now);
          setNextPrayer(upcomingPrayers.length > 0 ? upcomingPrayers[0] : prayersWithTime[0]);
        }
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrayerTimes();
  }, [city]);

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const [hour, minute] = timeString.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'م' : 'ص';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center font-arabic">مواقيت الصلاة</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <Clock className="animate-spin h-8 w-8" />
        </div>
      ) : (
        <div className="space-y-6">
          {nextPrayer && (
            <Card className="bg-islamic-teal/10 border-islamic-teal">
              <CardHeader>
                <CardTitle className="text-center text-islamic-teal">الصلاة القادمة</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-2xl font-arabic">{nextPrayer.arabicName}</h3>
                <p className="text-3xl font-bold mt-2">{formatTime(nextPrayer.time)}</p>
              </CardContent>
            </Card>
          )}
          
          <div className="grid gap-4 md:grid-cols-2">
            {prayerTimes.map((prayer) => (
              <Card key={prayer.name} className={prayer.name === nextPrayer?.name ? 'border-islamic-teal' : ''}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="font-arabic text-lg">{prayer.arabicName}</div>
                  <div className="text-lg font-bold">{formatTime(prayer.time)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrayerTimes;
