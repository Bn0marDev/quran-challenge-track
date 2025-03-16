
import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Quran from "./pages/Quran";
import Athkar from "./pages/Athkar";
import Challenges from "./pages/Challenges";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/quran",
    element: <Quran />,
  },
  {
    path: "/athkar",
    element: <Athkar />,
  },
  {
    path: "/challenges",
    element: <Challenges />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
