import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const ContentSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[200]}`,
}));

export default function MathHelloWorld02() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <StyledCard>
        <CardContent>
          <CategoryChip label="Mathematics" size="small" />
          
          <Typography variant="h4" component="h1" gutterBottom>
            Hello World - Math Intermediate 02
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Building upon basic math concepts with intermediate topics
          </Typography>

          <ContentSection>
            <Typography variant="h6" gutterBottom>
              Learning Objectives
            </Typography>
            <Typography variant="body1" paragraph>
              • Apply advanced mathematical operations
            </Typography>
            <Typography variant="body1" paragraph>
              • Understand algebraic expressions and equations
            </Typography>
            <Typography variant="body1" paragraph>
              • Explore geometric concepts and formulas
            </Typography>
          </ContentSection>

          <ContentSection sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Content Overview
            </Typography>
            <Typography variant="body1">
              This page builds on the foundation established in Math Basics 01, 
              introducing more complex mathematical concepts including algebra, 
              geometry, and advanced problem-solving techniques.
            </Typography>
          </ContentSection>
        </CardContent>
      </StyledCard>
    </Container>
  );
}