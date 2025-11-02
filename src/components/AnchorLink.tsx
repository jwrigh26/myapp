import { Link, LinkProps } from '@tanstack/react-router';
import { styled } from '@mui/material';

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export interface AnchorLinkProps extends Omit<LinkProps, 'hash'> {
  /** The anchor ID to scroll to (without the # symbol) */
  anchorId: string;
  /** Optional: scroll offset from top in pixels */
  offset?: number;
  /** Optional: additional onClick handler */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}

/**
 * A styled link component that smoothly scrolls to an anchor on the same page.
 * Uses MUI theme styling and TanStack Router's Link component.
 *
 * @example
 * <AnchorLink to="/learn/dsa/binary-search" anchorId="the-transition-point">
 *   See above
 * </AnchorLink>
 */
export function AnchorLink({
  anchorId,
  offset = 0,
  children,
  onClick,
  ...props
}: AnchorLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const element = document.getElementById(anchorId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    // Call the original onClick if provided
    onClick?.(e);
  };

  return (
    <StyledLink {...props} hash={anchorId} onClick={handleClick}>
      {children}
    </StyledLink>
  );
}

export default AnchorLink;
