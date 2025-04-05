import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

export interface BodyBlockProps {
  children: React.ReactNode;
  gap?: number;
  padding?: number;
  color?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

const StyledBodyBlock = styled(Stack, {
  shouldForwardProp: (prop: string) => !['gap', 'padding', 'color'].includes(prop),
})(({ theme, gap, padding, color }: any) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(gap),
  padding: theme.spacing(padding),
  backgroundColor: color ?? theme.palette.background.paper,
}));

export function BodyBlock({
  children,
  gap = 2,
  padding = 0,
  color,
  id,
  className,
  style,
  ref,
}: BodyBlockProps) {
  const theme = useTheme();
  return (
    <StyledBodyBlock
      gap={gap}
      padding={padding}
      color={color ?? theme.palette.background.paper}
      id={id}
      className={className}
      style={style}
      ref={ref}
    >
      {children}
    </StyledBodyBlock>
  );
}