import type { ButtonProps } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { createLink, LinkComponent } from '@tanstack/react-router';
import { forwardRef } from 'react';

interface MUILinkProps extends Omit<ButtonProps, 'href'> {
  // Add any addditional props you want to pass to the button
}

const MUILinkComponent = forwardRef<HTMLAnchorElement, MUILinkProps>(
  (props, ref) => {
    return <IconButton component={'a'} ref={ref} {...props} />;
  }
);

const CreatedLinkComponent = createLink(MUILinkComponent);

export const CustomIconLink: LinkComponent<typeof MUILinkComponent> = (
  props
) => {
  return <CreatedLinkComponent preload={'intent'} {...props} />;
};

export default CustomIconLink;
