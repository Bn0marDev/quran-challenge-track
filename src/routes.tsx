
import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Quran from "./pages/Quran";
import Athkar from "./pages/Athkar";
import Challenges from "./pages/Challenges";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import PrayerTimes from "./pages/PrayerTimes";
import RamadanCalendar from "./pages/RamadanCalendar";
import TabLayout from "./components/TabLayout";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TabLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "quran",
        element: <Quran />,
      },
      {
        path: "athkar",
        element: <Athkar />,
      },
      {
        path: "prayer-times",
        element: <PrayerTimes />,
      },
      {
        path: "ramadan",
        element: <RamadanCalendar />,
      },
      {
        path: "challenges",
        element: <Challenges />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ]
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
