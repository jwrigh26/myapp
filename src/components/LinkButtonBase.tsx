import type { ButtonBaseProps } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import { createLink, LinkComponent } from '@tanstack/react-router';
import { forwardRef } from 'react';

interface ButtonBaseLinkProps extends Omit<ButtonBaseProps, 'href'> {
  // Add any additional props you want to pass to the button
}

const ButtonBaseLinkComponent = forwardRef<HTMLAnchorElement, ButtonBaseLinkProps>(
  (props, ref) => {
    return <ButtonBase component={'a'} ref={ref} {...props} />;
  }
);

const CreatedButtonBaseLink = createLink(ButtonBaseLinkComponent);

export const LinkButtonBase: LinkComponent<typeof ButtonBaseLinkComponent> = (props) => {
  return <CreatedButtonBaseLink preload={'intent'} {...props} />;
};

export default LinkButtonBase;