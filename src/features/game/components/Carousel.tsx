import Icon from '@/components/Icon';
import { useDebounce } from '@/hooks/useDebounce';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MobileStepper from '@mui/material/MobileStepper';
import { styled } from '@mui/material/styles';
import React, { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ContainerType, ItemTypes } from '../constants';
import type { BlockItemState, DraggedItem, GameProps } from '../types';
import CodeBlock from './CodeBlock';
import { CODE_BLOCK_HEIGHT } from './Styles';

export const BottomCarousel: React.FC<GameProps> = ({
  workspace,
  carousel,
}) => {
  const { items, placeBlock } = carousel;
  const { getItem, removeBlock: removeWorkspaceBlock } = workspace;

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
        {items.map((block, index) => (
          <CarouselItemContainer key={index}>
            <DropZoneItem
              block={block}
              index={index}
              getItem={getItem}
              placeBlock={placeBlock}
              removeWorkspaceBlock={removeWorkspaceBlock}
            />
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

// ######################
// ### DropZoneItem
// ######################

interface DropZoneItemProps {
  block: BlockItemState;
  index: number;
  getItem: (id: string) => BlockItemState;
  placeBlock: (block: BlockItemState, index: number) => void;
  removeWorkspaceBlock: (index: number) => void;
}

const DropZoneItem: React.FC<DropZoneItemProps> = ({
  index,
  block,
  getItem,
  placeBlock,
  removeWorkspaceBlock,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CODE_BLOCK,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item: DraggedItem) => {
      if (!canDrop || !ref.current) {
        return;
      }

      if (item?.containerType === ContainerType.WORKSPACE) {
        // Move block from workspace to carousel
        // Remove block from workspace
        // placeBlock(getItem(item.id), index);
        // removeWorkspaceBlock(item.index);
      }

      return item;
    },
  });

  drop(ref);

  // return (
  //   <CodeBlock
  //     id={block!.id}
  //     index={index}
  //     containerType={ContainerType.CAROUSEL}
  //     code={block!.code}
  //   />
  // );
  return (
    <DropZoneStyled ref={ref} isOver={isOver && canDrop}>
      {block && (
        <CodeBlock
          id={block.id}
          index={index}
          containerType={ContainerType.CAROUSEL}
          code={block.code}
        />
      )}
      <Placeholder isOver={isOver && canDrop}>Drop Here</Placeholder>
    </DropZoneStyled>
  );
};

// ######################
// ### Styled Components
// ######################

const carouselHeight = 64 + 40;

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark} 25%, ${theme.palette.primary.dark} 75%, ${theme.palette.primary.main})`,
  display: 'flex',
  flexDirection: 'column',
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

// DropZoneItem Styles
const DropZoneStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOver',
})<{ isOver: boolean }>(({ theme, isOver }) => ({
  height: `${CODE_BLOCK_HEIGHT}px`,
  minHeight: `${CODE_BLOCK_HEIGHT}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: theme.spacing(0.5),
    left: theme.spacing(0.5),
    right: theme.spacing(0.5),
    bottom: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    border: `2px dashed ${theme.palette.common.black}`,
    pointerEvents: 'none',
    opacity: isOver ? 0.5 : 0.25,
    transform: isOver ? 'scale(1.01, 1.2)' : 'scale(1)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }),
    zIndex: -1,
  },
}));

const Placeholder = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOver',
})<{ isOver: boolean }>(({ theme, isOver }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: -1,
  color: theme.palette.common.black,
  opacity: isOver ? 0.5 : 0.25,
  fontStyle: 'italic',
  ...theme.typography.subtitle2,
}));
