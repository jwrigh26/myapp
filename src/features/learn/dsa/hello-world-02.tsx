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

export default function DSAHelloWorld02() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <StyledCard>
        <CardContent>
          <CategoryChip label="Data Structures & Algorithms" size="small" />
          
          <Typography variant="h4" component="h1" gutterBottom>
            Hello World - DSA Advanced 02
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Advanced Data Structures and Algorithm techniques
          </Typography>

          <ContentSection>
            <Typography variant="h6" gutterBottom>
              Learning Objectives
            </Typography>
            <Typography variant="body1" paragraph>
              • Master advanced data structures (trees, graphs, heaps)
            </Typography>
            <Typography variant="body1" paragraph>
              • Implement complex algorithms (sorting, searching, dynamic programming)
            </Typography>
            <Typography variant="body1" paragraph>
              • Optimize algorithm performance and efficiency
            </Typography>
          </ContentSection>

          <ContentSection sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Content Overview
            </Typography>
            <Typography variant="body1">
              Building on DSA fundamentals, this page covers advanced topics including 
              complex data structures, sophisticated algorithms, and optimization 
              techniques used in competitive programming and software engineering.
            </Typography>
          </ContentSection>
        </CardContent>
      </StyledCard>
    </Container>
  );
}