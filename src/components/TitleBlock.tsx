import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface TitleBlockProps {
  title?: string; // Optional if children is provided
  subtitle?: string;
  children?: React.ReactNode; // Allows for custom title content
}

const TitleBlock: React.FC<TitleBlockProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <StyledTitleBlock>
      {children ? (
        <Typography variant="h1" component="h1" gutterBottom>
          {children}
        </Typography>
      ) : (
        title && (
          <Typography variant="h1" component="h1" gutterBottom>
            {title}
          </Typography>
        )
      )}
      {subtitle && (
        <Typography variant="subtitle1" component="p" color="textSecondary">
          {subtitle}
        </Typography>
      )}
    </StyledTitleBlock>
  );
};

export default TitleBlock;

//#######################################
//### Styles
//#######################################

const StyledTitleBlock = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  '& h1': {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.h2.fontSize,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.h1.fontSize,
    },
  },
  '& p': {
    fontSize: theme.typography.subtitle1.fontSize,
    color: theme.palette.text.secondary,
  },
}));
