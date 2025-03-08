import React, { useRef } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Icon from '@/components/Icon';

interface CarouselProps {
  items: React.ReactNode[];
}

export const BottomCarousel: React.FC<CarouselProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  // Scrolls the carousel by one viewport width
  const scrollByWidth = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollOffset =
        direction === 'left' ? -window.innerWidth : window.innerWidth;
      containerRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px -2px 5px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        zIndex: 1300, // Make sure it stays on top
      }}
    >
      {/* Left Scroll Button */}
      <IconButton
        onClick={() => scrollByWidth('left')}
        aria-label="scroll left"
      >
        <Icon path={mdiChevronLeft} />
      </IconButton>

      {/* Carousel Container */}
      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE 10+
          '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari, Opera
          width: '100%',
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              minWidth: 'calc(100vw - 96px)', // Subtract space for buttons (48px each)
              height: 150,
              scrollSnapAlign: 'start',
              border: '1px solid grey',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              p: 1,
            }}
          >
            {item}
          </Box>
        ))}
      </Box>

      {/* Right Scroll Button */}
      <IconButton
        onClick={() => scrollByWidth('right')}
        aria-label="scroll right"
      >
        <Icon path={mdiChevronRight} />
      </IconButton>
    </Box>
  );
};
