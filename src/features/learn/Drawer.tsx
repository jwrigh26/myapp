import {
  FeatureDrawer,
  type FeatureCategory,
} from '@/components/FeatureDrawer';
import { mdiBookEducationOutline, mdiBrain, mdiCalculator, mdiLanguagePython, mdiGit } from '@mdi/js';

const learnCategories: FeatureCategory[] = [
  {
    id: 'math',
    title: 'Math',
    icon: mdiCalculator,
    path: '/learn/posts/math',
  },
  {
    id: 'dsa',
    title: 'DSA',
    icon: mdiBrain,
    path: '/learn/posts/dsa',
  },
  {
    id: 'python',
    title: 'Python',
    icon: mdiLanguagePython,
    path: '/learn/posts/python',
  },
  {
    id: 'git',
    title: 'Git',
    icon: mdiGit,
    path: '/learn/posts/git',
  },
  {
    id: 'ai',
    title: 'AI',
    icon: mdiBookEducationOutline,
    path: '/learn/posts/ai',
  },
];

export function LearnDrawer() {
  return (
    <FeatureDrawer
      categories={learnCategories}
      drawerKey="learn-drawer"
      featureName="learn"
    />
  );
}
