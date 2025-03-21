import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {
  /**
   * The SVG path data from `@mdi/js`.
   */
  path: string;
}

export default function Icon({ path, ...props }: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d={path} />
    </SvgIcon>
  );
}
