import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled, alpha, useTheme } from '@mui/material/styles';

import Icon from '@/components/Icon';
import { mdiAccountGroup, mdiCompare, mdiGridLarge } from '@mdi/js';

export type ConceptModel = 'Groups' | 'Comparison' | 'Rectangular';

export interface ConceptItem {
  model: ConceptModel;
  /** Primary description or meaning (string or array of strings) */
  description?: string | string[];
  /** Secondary description or application (string or array of strings) */
  application?: string | string[];
  /** Comma-separated examples or story contexts */
  examples?: string;
  icon: string; // mdi path data
}

export interface ConceptCardGridProps {
  items: ConceptItem[];
  dense?: boolean;
  /** Label for the first section (defaults to "Description") */
  descriptionLabel?: string;
  /** Label for the second section (defaults to "Application") */
  applicationLabel?: string;
  /** Label for the examples section (optional, hidden if not provided) */
  examplesLabel?: string;
}

/**
 * Displays a responsive CSS Grid of Concept Cards.
 */
export function ConceptCardGrid({ 
  items, 
  dense = false,
  descriptionLabel = 'Description',
  applicationLabel = 'Application',
  examplesLabel,
}: ConceptCardGridProps) {
  const theme = useTheme();

  return (
    <GridContainer dense={dense}>
      {items.map((item) => (
        <StyledCard key={item.model} role="region" aria-labelledby={`hdr-${item.model}`}>
          <StyledCardHeader
            id={`hdr-${item.model}`}
            titleTypographyProps={{ variant: 'h5', fontWeight: 600 }}
            title={item.model}
            avatar={
              <StyledAvatar>
                <Icon path={item.icon} fontSize="small" />
              </StyledAvatar>
            }
          />
                    <CardContent>
            <Stack spacing={dense ? 1.25 : 1.75}>
              {item.description && (
                <Section>
                  <Label variant="overline">{descriptionLabel}</Label>
                  {Array.isArray(item.description) ? (
                    <Stack spacing={0.5} component="ul" sx={{ margin: 0, paddingLeft: 2 }}>
                      {item.description.map((desc, idx) => (
                        <Typography key={idx} variant="body1" component="li" sx={{ lineHeight: 1.55 }}>
                          {desc}
                        </Typography>
                      ))}
                    </Stack>
                  ) : (
                    <Value variant="body1">{item.description}</Value>
                  )}
                </Section>
              )}

              {item.description && item.application && <DividerLine />}

              {item.application && (
                <Section>
                  <Label variant="overline">{applicationLabel}</Label>
                  {Array.isArray(item.application) ? (
                    <Stack spacing={0.5} component="ul" sx={{ margin: 0, paddingLeft: 2 }}>
                      {item.application.map((app, idx) => (
                        <Typography key={idx} variant="body1" component="li" sx={{ lineHeight: 1.55 }}>
                          {app}
                        </Typography>
                      ))}
                    </Stack>
                  ) : (
                    <Value variant="body1">{item.application}</Value>
                  )}
                </Section>
              )}

              {item.examples && examplesLabel && (
                <>
                  {(item.description || item.application) && <DividerLine />}
                  <Section>
                    <Label variant="overline">{examplesLabel}</Label>
                  </Section>
                </>
              )}

              {item.examples && (
                <TagRow>
                  {item.examples.split(',').map((s) => {
                    const tag = s.trim();
                    return <Chip key={tag} label={tag} size="small" />;
                  })}
                </TagRow>
              )}
            </Stack>
          </CardContent>
        </StyledCard>
      ))}
    </GridContainer>
  );
}

/* ===========================
   Styled Components
   =========================== */

/**
 * Responsive grid container
 */
const GridContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'dense',
})<{ dense?: boolean }>(({ theme, dense }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: theme.spacing(dense ? 2 : 3),
  alignItems: 'stretch',
}));

/**
 * Card with elevation and hover style
 */
const StyledCard = styled(Card)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  const border = alpha(theme.palette.divider, isDark ? 0.25 : 0.5);
  const hoverBg = alpha(theme.palette.primary.light, isDark ? 0.06 : 0.08);

  return {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${border}`,
    borderRadius: theme.shape.borderRadius * 2,
    transition:
      'transform 120ms ease, box-shadow 120ms ease, background-color 120ms ease',
    ...cssFromMixin(theme.mixins.elevation(1)),
    '&:hover': {
      backgroundColor: hoverBg,
      transform: 'translateY(-1px)',
      ...cssFromMixin(theme.mixins.elevation(2)),
    },
  };
});

/**
 * Converts the theme.mixins.elevation() string into a style object
 */
function cssFromMixin(mixinString: string): React.CSSProperties {
  const [prop, value] = mixinString.split(':').map((s) => s.trim());
  if (!prop || !value) return {};
  return { [prop]: value.replace(/;$/, '') };
}

/**
 * Header and Avatar styling
 */
const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  paddingBottom: theme.spacing(0.5),
}));

const StyledAvatar = styled('div')(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 8,
  display: 'grid',
  placeItems: 'center',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.25)
      : alpha(theme.palette.primary.light, 0.3),
  '& svg': { opacity: 0.9 },
}));

/**
 * Text and divider styling
 */
const Section = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.5),
}));

const Label = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  letterSpacing: '.08em',
}));

const Value = styled(Typography)(({ theme }) => ({
  lineHeight: 1.55,
}));

const DividerLine = styled('div')(({ theme }) => ({
  height: 1,
  width: '100%',
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.08)
      : alpha(theme.palette.common.black, 0.06),
}));

const TagRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(0.5),
}));
