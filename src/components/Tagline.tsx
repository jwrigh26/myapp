import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface TaglineProps {
  text?: string; // Optional if children is provided
  children?: React.ReactNode; // Allows for custom content
}

const TaglineContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  textWrap: 'balance',
  [theme.breakpoints.up('md')]: {
    textAlign: 'center',
  },
}));

const Tagline: React.FC<TaglineProps> = ({ text, children }) => (
  <TaglineContainer>
    {children ? (
      <Typography variant="h5" color="textSecondary">
        {children}
      </Typography>
    ) : (
      text && (
        <Typography variant="h5" color="textSecondary">
          {text}
        </Typography>
      )
    )}
  </TaglineContainer>
);

export default Tagline;
