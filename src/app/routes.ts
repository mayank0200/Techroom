import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { Roadmaps } from './pages/Roadmaps';
import { RoadmapDetail } from './pages/RoadmapDetail';
import { Courses } from './pages/Courses';
import { Notes } from './pages/Notes';
import { Projects } from './pages/Projects';
import { ResumeBuilder } from './pages/ResumeBuilder';
import { ATSChecker } from './pages/ATSChecker';
import { InterviewPrep } from './pages/InterviewPrep';
import { CollegeHub } from './pages/CollegeHub';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Pricing } from './pages/Pricing';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'roadmaps', Component: Roadmaps },
      { path: 'roadmaps/:id', Component: RoadmapDetail },
      { path: 'courses', Component: Courses },
      { path: 'notes', Component: Notes },
      { path: 'projects', Component: Projects },
      { path: 'resume-builder', Component: ResumeBuilder },
      { path: 'ats-checker', Component: ATSChecker },
      { path: 'interview-prep', Component: InterviewPrep },
      { path: 'college-hub', Component: CollegeHub },
      { path: 'dashboard', Component: Dashboard },
      { path: 'login', Component: Login },
      { path: 'pricing', Component: Pricing },
    ],
  },
]);
