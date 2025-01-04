import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const CallToActionContainer = styled(Box)(({ theme }) => ({
  display: "block",
  padding: theme.spacing(6),
  backgroundColor: theme.palette.primary.main,
  backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.superLight,
  margin: 0,
}));

const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  fontSize: "1rem",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.secondary.main,
  backgroundImage: `linear-gradient(45deg, ${theme.palette.secondary.main} 70%, ${theme.palette.secondary.dark} 100%)`,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

interface CallToActionProps {
  title: string;
  buttonText: string;
  onClick: () => void;
}

export default function CallToAction({
  title,
  buttonText,
  onClick,
}: CallToActionProps) {
  return (
    <CallToActionContainer>
      <Typography variant="h1" gutterBottom>
        {title}
      </Typography>
      <CTAButton variant="contained" onClick={onClick}>
        {buttonText}
      </CTAButton>
    </CallToActionContainer>
  );
}
