import { styled } from '@mui/material/styles';
import { mdiArrowRight } from '@mdi/js';
import Icon from './Icon';

/**
 * Arrow component - displays a styled arrow icon inline with text
 * Uses primary.main color from theme with MDI arrow-right icon
 * 
 * @example
 * <Typography>
 *   Dividend <Arrow /> the number being divided
 * </Typography>
 */
const Arrow = styled(Icon)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  color: theme.palette.primary.main,
  fontSize: '1em',
  verticalAlign: 'middle',
}));

// Wrapper to set default props
const ArrowComponent = (props: any) => (
  <Arrow path={mdiArrowRight} {...props} />
);

export default ArrowComponent;
