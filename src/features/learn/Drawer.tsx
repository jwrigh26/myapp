import { DrawerHeader, Sheet, TemporaryDrawer } from '@/components/Drawer';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Icon from '@/components/Icon';
import {
  FeatureDrawer,
  type FeatureCategory,
} from '@/components/FeatureDrawer';
import {
  mdiBookOpenBlankVariant,
  mdiSchool,
  mdiDesktopClassic,
  mdiCalculator,
  mdiLanguagePython,
  mdiGit,
  mdiOpenInNew,
} from '@mdi/js';
import { useDrawer, useTemp } from '@/hooks/useContext';
import { useIsBreakpointUp } from '@/context/BreakpointContext';

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
    icon: mdiDesktopClassic,
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
      headerIcon={mdiSchool}
    />
  );
}

/**
 * Used for showing or needing to describea collection of notes, summaries, and vocabulary.
 */
export function CompendiumDrawer() {
  const isDesktop = useIsBreakpointUp('sm');
  const { isOpen, closeDrawer } = useDrawer('compendium-drawer');
  const anchorPosition = isDesktop ? 'right' : 'bottom';

  const { temp } = useTemp('compendium-temp');

  // We will pull out from temp:
  const { title = '', content: Content = null } = temp ?? {};

  return (
    <TemporaryDrawer
      anchor={anchorPosition}
      open={isOpen}
      onClose={closeDrawer}
      width={['100%', 'min(50%, 430px)']}
    >
      <DrawerHeader
        icon={mdiBookOpenBlankVariant}
        title={title}
        onClose={closeDrawer}
      />
      <Sheet>{Content ? <Content /> : null}</Sheet>
    </TemporaryDrawer>
  );
}

const StyledCompendiumButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: theme.spacing(0.5, 1),
  minWidth: 'auto',
  display: 'inline-flex',
  gap: theme.spacing(0.5),
  fontSize: 'inherit',
  lineHeight: 'inherit',
  verticalAlign: 'baseline',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface CompendiumButtonProps {
  children: React.ReactNode;
  title: string;
  content: React.ComponentType | (() => JSX.Element); // Component to render
  onClick?: () => void;
}

export function CompendiumButton({
  children,
  title,
  content,
  onClick,
}: CompendiumButtonProps) {
  const { openDrawer } = useDrawer('compendium-drawer');
  const { setTemp } = useTemp('compendium-temp');

  const handleClick = () => {
    setTemp({ title, content });
    openDrawer();

    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledCompendiumButton variant="text" onClick={handleClick}>
      {children}
      <Icon path={mdiOpenInNew} fontSize="small" sx={{ opacity: 0.7 }} />
    </StyledCompendiumButton>
  );
}
