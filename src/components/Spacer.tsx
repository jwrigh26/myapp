import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface SpacerProps extends BoxProps {
  size?: number | string;
  axis?: 'horizontal' | 'vertical';
  flexSpace?: boolean;
  mobile?: boolean; // Show only on mobile
  desktop?: boolean; // Show only on desktop
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Spacer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['size', 'axis', 'flexSpace', 'mobile', 'desktop', 'style'].includes(
      prop as string
    ),
})<SpacerProps>(({
  theme,
  size = 1,
  axis = 'vertical',
  flexSpace = false,
  mobile,
  desktop,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  if ((mobile && !isMobile) || (desktop && !isDesktop)) {
    return { display: 'none' }; // Hide based on mobile/desktop props
  }

  return {
    display: flexSpace ? 'flex' : 'block',
    ...(axis === 'horizontal'
      ? {
          width: theme.spacing(size),
          height: 'auto',
          minHeight: '1px',
        }
      : {
          height: theme.spacing(size),
          width: '100%',
        }),
    flex: flexSpace ? 1 : 'none',
  };
});

export function SectionSpacer({
  size = 4,
  axis = 'vertical',
  flexSpace = false,
  mobile,
  desktop,
  id,
  className,
  style,
}: SpacerProps & {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Spacer
      size={size}
      axis={axis}
      flexSpace={flexSpace}
      mobile={mobile}
      desktop={desktop}
      sx={style}
      id={id}
      className={className}
    />
  );
}
