import Card from '@mui/material/Card';
import { styled } from '@mui/system';
import React from 'react';

export interface BlogPostCardProps {
  glow?: boolean;
  children: React.ReactNode;
  [key: string]: any;
}

export const BlogPostCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'glow',
})<BlogPostCardProps>(({ theme, glow }) => {
  const isLight = theme.palette.mode === 'light';
  if (glow) {
    const borderColor = isLight ? theme.palette.primary.dark : theme.palette.primary.main;
    const glowColor = isLight ? theme.palette.primary.dark : theme.palette.primary.main;
    const hoverGlow = isLight ? theme.palette.primary.main : theme.palette.primary.light;
    return {
      border: `2px solid ${borderColor}`,
      borderRadius: '8px',
      boxShadow: `
        0 0 0 2px ${glowColor}33,
        0 4px 16px ${glowColor}55,
        0 6px 24px ${glowColor}22
      `,
      transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.2s ease',
      '&:hover, &:focus-within': {
        transform: 'translateY(-1px)',
        boxShadow: isLight 
          ? `
            0 0 0 3px ${hoverGlow}66,
            0 8px 32px ${hoverGlow}77,
            0 16px 48px ${hoverGlow}44
          `
          : `
            0 0 0 2px ${hoverGlow}55,
            0 6px 28px ${hoverGlow}66,
            0 12px 40px ${hoverGlow}38
          `,
        borderColor: hoverGlow,
      },
    };
  }
  // Default: subtle grey border, no glow
  return {
    border: isLight
      ? `1px solid ${theme.palette.primary.dark}`
      : `1px solid ${theme.palette.primary.light}`,
    boxShadow: '0px 3px 6px rgba(0,0,0,0.12), 0px 1.5px 3px rgba(0,0,0,0.08)',
    transition: 'box-shadow 0.3s, border-color 0.3s',
  };
});
