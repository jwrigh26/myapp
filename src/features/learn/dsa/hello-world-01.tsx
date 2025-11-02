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
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

const ContentSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[200]}`,
}));

export default function DSAHelloWorld01() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <StyledCard>
        <CardContent>
          <CategoryChip label="Data Structures & Algorithms" size="small" />

          <Typography variant="h4" component="h1" gutterBottom>
            Hello World - DSA Fundamentals 01
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Introduction to Data Structures and Algorithm fundamentals
          </Typography>

          <ContentSection>
            <Typography variant="h6" gutterBottom>
              Learning Objectives
            </Typography>
            <Typography variant="body1" paragraph>
              • Understand basic data structures (arrays, linked lists)
            </Typography>
            <Typography variant="body1" paragraph>
              • Learn fundamental algorithm concepts
            </Typography>
            <Typography variant="body1" paragraph>
              • Analyze time and space complexity
            </Typography>
          </ContentSection>

          <ContentSection sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Content Overview
            </Typography>
            <Typography variant="body1">
              This page introduces the fundamental concepts of data structures
              and algorithms. We'll explore how to organize data efficiently and
              implement basic algorithms for common programming problems.
            </Typography>
          </ContentSection>
        </CardContent>
      </StyledCard>
    </Container>
  );
}
