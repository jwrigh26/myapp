import {
  FeatureDrawer,
  type FeatureCategory,
} from '@/components/FeatureDrawer';
import {
  mdiBookEducationOutline,
  mdiBrain,
  mdiCalculator,
  mdiLanguagePython,
  mdiGit,
} from '@mdi/js';

const learnCategories: FeatureCategory[] = [
  {
    id: 'math',
    title: 'Math',
    icon: mdiCalculator,
    path: '/learn/math',
  },
  {
    id: 'dsa',
    title: 'DSA',
    icon: mdiBrain,
    path: '/learn/dsa',
  },
  {
    id: 'python',
    title: 'Python',
    icon: mdiLanguagePython,
    path: '/learn/python',
  },
  {
    id: 'git',
    title: 'Git',
    icon: mdiGit,
    path: '/learn/git',
  },
  // {
  //   id: 'ai',
  //   title: 'AI',
  //   icon: mdiBookEducationOutline,
  //   path: '/learn/ai',
  // },
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
