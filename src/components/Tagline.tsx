import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const TaglineContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  textWrap: "balance",
  [theme.breakpoints.up("md")]: {
    textAlign: "center",
  },
}));

const Tagline = ({ text }: { text: string }) => (
  <TaglineContainer>
    <Typography variant="h5" color="textSecondary">
      {text}
    </Typography>
  </TaglineContainer>
);

export default Tagline;
