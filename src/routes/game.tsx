import { createFileRoute } from '@tanstack/react-router'
import TitleBlock from '@/components/TitleBlock';
import { PageLayout } from '@/layout';
import { Header } from '@/features/game';
import { BottomCarousel } from '@/features/game/components/Carousel';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


export const Route = createFileRoute('/game')({
  component: GameComponent,
})

function GameComponent() {
    return (
        <PageLayout>
            <Header title="Binary Search" />
            <BottomCarousel items={[
                <ColorBox color="#FFC107">1</ColorBox>,
                <ColorBox color="#FF5722">2</ColorBox>,
                <ColorBox color="#E91E63">3</ColorBox>,
                <ColorBox color="#673AB7">4</ColorBox>,
                <ColorBox color="#2196F3">5</ColorBox>,
                <ColorBox color="#009688">6</ColorBox>,
                <ColorBox color="#4CAF50">7</ColorBox>,
                <ColorBox color="#FF5722">8</ColorBox>,
                <ColorBox color="#E91E63">9</ColorBox>,
                <ColorBox color="#673AB7">10</ColorBox>,
            ]} />
            <TitleBlock subtitle="The Game Page">Game</TitleBlock>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h3" gutterBottom>
                    This is the game page.
                </Typography>
                <Typography variant="body1">
                    Welcome to the game page! This is where the game will be played.
                </Typography>
            </Box>
        </PageLayout>
    )
}


const ColorBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'color'
})<{ color?: string }>(({ theme, color }) => ({
    backgroundColor: color || theme.palette.primary.main,
    color: theme.palette.primary.superLight,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))


// TODO: Need a drop zone when wanting to discard a piece but no place in the carousel to return it.
// Reshuffle the carouse button
// No timer for the game
// Add a check or submit button to see if the pieces are in the correct order
// Add a reset button to reset the pieces to their original order
// Add a hint button to show the correct order of the pieces -- maybe
// Add a button to show the correct order of the pieces