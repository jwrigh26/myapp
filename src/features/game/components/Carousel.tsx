import React, { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MobileStepper from '@mui/material/MobileStepper';
import Box from '@mui/material/Box';
import { useDebounce } from '@/hooks/useDebounce';
import Icon from '@/components/Icon';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { CarouselState, BlockItem, ContainerType } from '../types';
import CodeBlock from './CodeBlock';

interface CarouselProps {
  items: CarouselState;
}

export const BottomCarousel: React.FC<CarouselProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleScroll = useDebounce(() => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollLeft;
      const itemWidth = containerRef.current.clientWidth;
      const newStep = Math.round(scrollPosition / itemWidth);
      setActiveStep(newStep);
    }
  }, 50);

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
      <ScrollContainer ref={containerRef} onScroll={handleScroll}>
        {items.map((item, index) => (
          <CarouselItemContainer key={item!.id}>
            <CodeBlock
              id={item!.id}
              index={index}
              containerType={ContainerType.CAROUSEL}
              disabled={false}
            >
              {item!.content}
            </CodeBlock>
          </CarouselItemContainer>
        ))}
      </ScrollContainer>

      <ButtonContainer>
        <ScrollButton onClick={() => scrollByWidth('left')}>
          <Icon path={mdiChevronLeft} />
        </ScrollButton>
        <ScrollButton onClick={() => scrollByWidth('right')}>
          <Icon path={mdiChevronRight} />
        </ScrollButton>
      </ButtonContainer>
    </CarouselContainer>
  );
};

const carouselHeight = 64 + 40;

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column', // Changed to column
  padding: 0,
  zIndex: 1300,
  height: carouselHeight,
}));

const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

const ScrollButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '0px',
  width: 40,
  height: 40, // Fixed height for buttons
  flex: '1 0 40px',
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
  '&:active': {
    backgroundColor: theme.palette.background.default,
  },
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
  height: 64, // Fixed height for the scroll container
  width: '100%',
});

const CarouselItemContainer = styled(Box)(({ theme }) => ({
  minWidth: '100%',
  scrollSnapAlign: 'start',
  borderTop: `1px solid ${theme.palette.grey[800]}`,
  borderBottom: `1px solid ${theme.palette.grey[800]}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: theme.spacing(0, 1),
}));
