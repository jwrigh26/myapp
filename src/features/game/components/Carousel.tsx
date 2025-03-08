import React, { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MobileStepper from '@mui/material/MobileStepper';
import Box from '@mui/material/Box';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Icon from '@/components/Icon';
import { useDebounce } from '@/hooks/useDebounce';

interface CarouselProps {
  items: React.ReactNode[];
}

export const BottomCarousel: React.FC<CarouselProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleScroll = useDebounce(() => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollLeft;
      const itemWidth = containerRef.current.clientWidth;
      const newStep = Math.round(scrollPosition / itemWidth);
      setActiveStep(newStep);
    }
  }, 50);

  // Scrolls the carousel by one viewport width
  const scrollByWidth = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollOffset =
        direction === 'left' ? -window.innerWidth : window.innerWidth;
      const newStep = direction === 'left' ? activeStep - 1 : activeStep + 1;
      setActiveStep(Math.max(0, Math.min(newStep, items.length - 1)));
      containerRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth',
      });
    }
  };
  return (
    <CarouselContainer>
      <ScrollButton
        onClick={() => scrollByWidth('left')}
        aria-label="scroll left"
      >
        <Icon path={mdiChevronLeft} />
      </ScrollButton>

      <StyledMobileStepper
        variant="text"
        steps={items.length}
        position="static"
        activeStep={activeStep}
        nextButton={null}
        backButton={null}
        sx={{
          '& .MuiMobileStepper-positionStatic': {
            width: 'auto',
          },
        }}
      />

      <ScrollContainer ref={containerRef} onScroll={handleScroll}>
        {items.map((item, index) => (
          <CarouselItem key={index}>{item}</CarouselItem>
        ))}
      </ScrollContainer>

      <ScrollButton
        onClick={() => scrollByWidth('right')}
        aria-label="scroll right"
      >
        <Icon path={mdiChevronRight} />
      </ScrollButton>
    </CarouselContainer>
  );
};

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100svw',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  zIndex: 1300,
}));

const ScrollButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '112px',
  borderRadius: '0px',
  width: 40,
}));

const StyledMobileStepper = styled(MobileStepper)({
  position: 'absolute',
  top: -34,
  right: 8,
  justifyContent: 'center',
  transition: 'all 0.2s ease-in-out',
  minWidth: 80,
  backgroundColor: 'transparent',
  '& .MuiTypography-root': {
    transition: 'all 0.2s ease-in-out',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  '& .MuiMobileStepper-dots': {
    display: 'none',
  },
});

const ScrollContainer = styled(Box)({
  display: 'flex',
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none', // IE 10+
  '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari, Opera
});

const CarouselItem = styled(Box)(({ theme }) => ({
  minWidth: 'calc(100svw - 80px)', // Subtract space for buttons
  height: 112,
  scrollSnapAlign: 'start',
  border: `1px solid ${theme.palette.grey[400]}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  padding: 0,
}));
