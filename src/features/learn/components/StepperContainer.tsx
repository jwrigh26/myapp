/**
 * Generic Stepper Container for Learn Topics
 * 
 * Dynamically lazy loads step components based on topic path.
 * Supports directional slide animations and non-linear navigation.
 * 
 * @example
 * <StepperContainer
 *   topic="dsa/binary-search"
 *   totalSteps={4}
 *   title="Binary Search Walkthrough"
 * />
 */

import { Suspense, useState, useEffect, ComponentType, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import StepIcon, { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import { useIsMobile } from '@/context/BreakpointContext';
import Icon from '@/components/Icon';
import { mdiChevronLeft, mdiChevronRight, mdiRestart } from '@mdi/js';

interface StepperContainerProps {
  /** Array of lazy-loaded step components */
  steps: Array<React.LazyExoticComponent<ComponentType<any>>>;
  /** Optional title displayed above stepper */
  title?: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Starting step index (default: 0) */
  initialStep?: number;
}

const ANIMATION_DURATION = 400;

export default function StepperContainer({
  steps,
  title,
  subtitle,
  initialStep = 0,
}: StepperContainerProps) {
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(initialStep);
  const [previousStep, setPreviousStep] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  const totalSteps = steps.length;

  // Preload adjacent steps for smooth transitions
  useEffect(() => {
    const adjacentSteps = [
      activeStep > 0 ? steps[activeStep - 1] : null,
      activeStep < totalSteps - 1 ? steps[activeStep + 1] : null,
    ].filter(Boolean) as ComponentType[];

    adjacentSteps.forEach((StepComponent) => {
      const container = document.createElement('div');
      container.style.display = 'none';
      document.body.appendChild(container);

      const root = createRoot(container);
      root.render(createElement(StepComponent));

      setTimeout(() => {
        root.unmount();
        document.body.removeChild(container);
      }, 100);
    });
  }, [activeStep, steps, totalSteps]);

  const transitionToStep = (newStep: number, dir: 'next' | 'prev') => {
    setHasNavigated(true);
    setDirection(dir);
    setPreviousStep(activeStep);
    setActiveStep(newStep);
    setIsTransitioning(true);

    setTimeout(() => {
      setPreviousStep(null);
      setIsTransitioning(false);
    }, ANIMATION_DURATION);
  };

  const handleStep = (step: number) => () => {
    if (isTransitioning || step === activeStep) return;
    transitionToStep(step, step > activeStep ? 'next' : 'prev');
  };

  const handleNext = () => {
    if (activeStep < totalSteps - 1 && !isTransitioning) {
      transitionToStep(activeStep + 1, 'next');
    }
  };

  const handleBack = () => {
    if (activeStep > 0 && !isTransitioning) {
      transitionToStep(activeStep - 1, 'prev');
    }
  };

  const handleReset = () => {
    if (!isTransitioning && activeStep !== 0) {
      transitionToStep(0, 'prev');
    }
  };

  const StepComponent = steps[activeStep];

  return (
    <StepperWrapper>
      {/* Optional Header */}
      {(title || subtitle) && (
        <HeaderSection>
          {title && <HeaderTitle variant="h4">{title}</HeaderTitle>}
          {subtitle && <HeaderSubtitle variant="body1">{subtitle}</HeaderSubtitle>}
        </HeaderSection>
      )}

      {/* Top Navigation Controls */}
      <TopNavigationRow>
        <CompactNavButton
          onClick={handleBack}
          disabled={activeStep === 0}
          startIcon={<Icon path={mdiChevronLeft} fontSize="small" />}
          aria-label="Previous step"
        >
          {!isMobile && 'Previous'}
        </CompactNavButton>

        {/* Stepper Navigation */}
        <StyledStepper nonLinear activeStep={activeStep}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <StyledStep key={index}>
              <StyledStepButton onClick={handleStep(index)}>
                <StepLabel 
                  slots={{ stepIcon: ZeroBasedStepIcon }}
                  slotProps={{ stepIcon: { index } as any }}
                />
              </StyledStepButton>
            </StyledStep>
          ))}
        </StyledStepper>

        <CompactNavButton
          onClick={handleNext}
          disabled={activeStep === totalSteps - 1}
          endIcon={<Icon path={mdiChevronRight} fontSize="small" />}
          aria-label="Next step"
        >
          {!isMobile && 'Next'}
        </CompactNavButton>
      </TopNavigationRow>

      {/* Step Content with Slide Animation */}
      <StepContentContainer>
        <Suspense fallback={<LoadingFallback />}>
          {previousStep !== null && (
            <SlideWrapper 
              key={`prev-${previousStep}`}
              direction={direction} 
              isExiting
            >
              {createElement(steps[previousStep])}
            </SlideWrapper>
          )}
          <SlideWrapper 
            key={`current-${activeStep}`}
            direction={direction} 
            isExiting={false}
            skipAnimation={!hasNavigated}
          >
            <StepComponent />
          </SlideWrapper>
        </Suspense>
      </StepContentContainer>

      {/* Navigation Controls */}
      <NavigationButtons>
        <NavButton
          onClick={handleBack}
          disabled={activeStep === 0}
          startIcon={<Icon path={mdiChevronLeft} fontSize="small" />}
          aria-label="Previous step"
        >
          {!isMobile && 'Previous'}
        </NavButton>

        <CenterControls>
          <StepIndicator>
            Step {activeStep} of {totalSteps - 1}
          </StepIndicator>
          {activeStep > 0 && (
            <ResetButton
              onClick={handleReset}
              size="small"
              startIcon={<Icon path={mdiRestart} fontSize="small" />}
            >
              {!isMobile && 'Reset'}
            </ResetButton>
          )}
        </CenterControls>

        <NavButton
          onClick={handleNext}
          disabled={activeStep === totalSteps - 1}
          endIcon={<Icon path={mdiChevronRight} fontSize="small" />}
          aria-label="Next step"
        >
          {!isMobile && 'Next'}
        </NavButton>
      </NavigationButtons>
    </StepperWrapper>
  );
}

// ################################################
// ### Custom Step Icon (Zero-based)
// ################################################

interface ZeroBasedStepIconProps extends StepIconProps {
  index: number;
}

function ZeroBasedStepIcon({ index, active, completed, className }: ZeroBasedStepIconProps) {
  return (
    <StepIcon
      icon={index}
      active={active}
      completed={completed}
      className={className}
    />
  );
}

// ################################################
// ### Styled Components
// ################################################

const StepperWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  marginBottom: theme.spacing(2),
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
  fontSize: '1.75rem',
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  maxWidth: 800,
}));

const TopNavigationRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  width: '100%',
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: theme.spacing(2, 0),
  flex: 1,
  // Override MUI connector styles
  '& .MuiStepConnector-root': {
    top: 20,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
  },
  '& .MuiStepConnector-line': {
    borderColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.divider,
    borderTopWidth: 2,
    transition: 'border-color 0.3s ease',
  },
  '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
    borderColor: theme.palette.primary.main,
  },
}));

const StyledStep = styled(Step)({
  padding: 0,
});

const StyledStepButton = styled(StepButton)(({ theme }) => ({
  '& .MuiStepLabel-root': {
    padding: 0,
  },
  '& .MuiStepLabel-iconContainer': {
    padding: 0,
  },
  // Hide the label text completely
  '& .MuiStepLabel-label': {
    display: 'none',
  },
  // Style the step icon (circle with number)
  '& .MuiStepIcon-root': {
    fontSize: '1.75rem',
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.grey[400],
    transition: 'all 0.3s ease',
  },
  '& .MuiStepIcon-root.Mui-active': {
    color: theme.palette.primary.main,
    ...(theme.palette.mode === 'dark' && {
      filter: `drop-shadow(0 0 8px $<span class="MuiStepLabel-label css-1srlnzz-MuiStepLabel-label">1</span>{theme.palette.primary.main}66)`,
    }),
    transform: 'scale(1.1)',
  },
  '& .MuiStepIcon-root.Mui-completed': {
    color: theme.palette.primary.main,
  },
  // Style the number inside the icon
  '& .MuiStepIcon-text': {
    fill: theme.palette.primary.contrastText,
    fontSize: '0.875rem',
    fontWeight: 600,
  },
  '&:hover .MuiStepIcon-root': {
    color: theme.palette.primary.light,
    transform: 'scale(1.05)',
  },
}));

const StepContentContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 400,
  width: '100%',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  ...(theme.palette.mode === 'dark' && {
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: `
      0 0 0 1px ${theme.palette.primary.main}22,
      0 2px 8px ${theme.palette.primary.main}44,
      0 3px 12px ${theme.palette.primary.main}11
    `,
  }),
  ...(theme.palette.mode === 'light' && {
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: '0px 3px 6px rgba(0,0,0,0.12), 0px 1.5px 3px rgba(0,0,0,0.08)',
  }),
}));

const SlideWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'direction' && prop !== 'isExiting' && prop !== 'skipAnimation',
})<{ direction: 'next' | 'prev'; isExiting?: boolean; skipAnimation?: boolean }>(({ theme, direction, isExiting, skipAnimation }) => {
  const getAnimationName = () => {
    if (isExiting) {
      return direction === 'next' ? 'pageSlideOutLeft' : 'pageSlideOutRight';
    }
    return direction === 'next' ? 'pageSlideInRight' : 'pageSlideInLeft';
  };

  return {
    position: isExiting ? 'absolute' : 'relative',
    top: isExiting ? 0 : 'auto',
    left: isExiting ? 0 : 'auto',
    right: isExiting ? 0 : 'auto',
    padding: theme.spacing(3),
    width: '100%',
    animation: skipAnimation ? 'none' : `${getAnimationName()} 0.4s ${theme.transitions.easing.easeInOut}`,
    zIndex: isExiting ? 0 : 1,

    // Entering animations - slide in from off-screen
    '@keyframes pageSlideInRight': {
      '0%': {
        transform: 'translateX(100%)',
      },
      '100%': {
        transform: 'translateX(0)',
      },
    },

    '@keyframes pageSlideInLeft': {
      '0%': {
        transform: 'translateX(-100%)',
      },
      '100%': {
        transform: 'translateX(0)',
      },
    },

    // Exiting animations - slide out off-screen
    '@keyframes pageSlideOutLeft': {
      '0%': {
        transform: 'translateX(0)',
      },
      '100%': {
        transform: 'translateX(-100%)',
      },
    },

    '@keyframes pageSlideOutRight': {
      '0%': {
        transform: 'translateX(0)',
      },
      '100%': {
        transform: 'translateX(100%)',
      },
    },

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  };
});

const NavigationButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const CompactNavButton = styled(Button)(({ theme }) => ({
  minWidth: 100,
  textTransform: 'none',
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  transition: 'all 0.3s ease',
  padding: theme.spacing(0.75, 2),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transform: 'translateY(-1px)',
    ...(theme.palette.mode === 'dark' && {
      boxShadow: `0 4px 12px ${theme.palette.primary.main}44`,
    }),
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 'auto',
    padding: theme.spacing(0.75, 1),
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  minWidth: 100,
  textTransform: 'none',
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transform: 'translateY(-1px)',
    ...(theme.palette.mode === 'dark' && {
      boxShadow: `0 4px 12px ${theme.palette.primary.main}44`,
    }),
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 'auto',
    padding: theme.spacing(1),
  },
}));

const CenterControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const StepIndicator = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));

const ResetButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '0.75rem',
  padding: theme.spacing(0.5, 1),
  minWidth: 'auto',
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
}));

const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 400,
    }}
  >
    <CircularProgress />
  </Box>
);
