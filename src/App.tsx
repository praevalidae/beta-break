import { useState } from 'react';
import { getRandomBetaCard, getRandomBreakCard, getRandomEliminateCard } from './helpers';
import { styled } from '@mui/system';
import CardBack from './cards/back.jpg';
import styling from "App.css"

const MainContainer = styled('div')({
  backgroundColor: '#aaa',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
});

const CardContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%',
  gap: '1rem',
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  borderRadius: '1rem',
});

const StyledImageWrapper = styled('div')({
  padding: '1rem',
});

function App() {
  const [drawnCards, setDrawnCards] = useState<string[]>([]);
  const [currentBetaCard, setCurrentBetaCard] = useState<string>(getRandomBetaCard());
  const [currentBreakCard, setCurrentBreakCard] = useState<string>(getRandomBreakCard());

  const handleDrawCard = () => {
    const randomIndex = Math.floor(Math.random() * 3);

    // for a drawn card
    // if it's an existing beta or break card, draw another one

    // show the dialog with the card
    // if it's an eliminate, just update the eliminate count
    // if it's a valid beta break card, update the current beta and break cards
  };

  return (
    <MainContainer>
      <CardContainer>
        <StyledImageWrapper>
          <StyledImage src={currentBetaCard} alt="Beta" />
        </StyledImageWrapper>

        <StyledImageWrapper>
          <StyledImage src={currentBreakCard} alt="Break" />
        </StyledImageWrapper>

        <StyledImageWrapper>
          <StyledImage src={CardBack} alt="deck" />
        </StyledImageWrapper>
      </CardContainer>
    </MainContainer>
  );
}

export default App;
