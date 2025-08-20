import { useEffect, useState } from 'react';
import { getRandomBetaCard, getRandomBreakCard, getRandomEliminateCard } from './helpers';
import { styled } from '@mui/system';
import CardBack from './cards/back.jpg';
import Gym from "./cards/gym.jpg"
import './App.css';
import { Dialog } from '@mui/material';

const MainContainer = styled('div')({
  backgroundImage: `url(${Gym})`,
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '150vh',
  width: '150vw',
  padding: "5rem"
});

const CardContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%',
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  borderRadius: '1.5rem',
});

const StyledImageWrapper = styled('div')({
  padding: '1rem',
});

const DialogImageWrapper = styled('div')({
  padding: '1rem',
  maxHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const DialogImage = styled('img')({
  maxWidth: '100%',
  maxHeight: 'calc(100vh - 2rem)', // Account for padding
  objectFit: 'contain',
  borderRadius: '1.5rem',
});

function App() {
  const [currentBetaCard, setCurrentBetaCard] = useState<string>('');
  const [currentBreakCard, setCurrentBreakCard] = useState<string>('');
  const [currentDialogCard, setCurrentDialogCard] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    setCurrentBetaCard(getRandomBetaCard());
    setCurrentBreakCard(getRandomBreakCard());
  }, []);

  const handleDrawCard = () => {
    const randomIndex = Math.floor(Math.random() * 3);

    if (randomIndex === 0) {
      // set a beta card
      let randomBetaCard = getRandomBetaCard();

      while (currentBetaCard === randomBetaCard) {
        randomBetaCard = getRandomBetaCard();
      }

      setCurrentBetaCard(randomBetaCard);
      setCurrentDialogCard(randomBetaCard);
      setIsDialogOpen(true);
      return;
    }

    if (randomIndex === 1) {
      let randomBreakCard = getRandomBreakCard();

      while (currentBreakCard === randomBreakCard) {
        randomBreakCard = getRandomBreakCard();
      }

      setCurrentBreakCard(randomBreakCard);
      setCurrentDialogCard(randomBreakCard);
      setIsDialogOpen(true);
      return;
    }

    if (randomIndex === 2) {
      setCurrentDialogCard(getRandomEliminateCard());
      setIsDialogOpen(true);
      return;
    }
  };

  return (
    <MainContainer>
      <CardContainer>
        <StyledImageWrapper>
          <div className="shimmer-border">
            <div className="shimmer-content">
              <StyledImage src={currentBetaCard} alt="Beta" />
            </div>
          </div>
        </StyledImageWrapper>

        <StyledImageWrapper>
          <div className="shimmer-border">
            <div className="shimmer-content">
              <StyledImage src={currentBreakCard} alt="Break" />
            </div>
          </div>
        </StyledImageWrapper>

        <StyledImageWrapper onClick={handleDrawCard}>
          <div className="shimmer-border">
            <div className="shimmer-content">
              <StyledImage src={CardBack} alt="deck" />
            </div>
          </div>
        </StyledImageWrapper>
      </CardContainer>

      <Dialog
        sx={{
          backgroundColor: 'transparent',
          '& .MuiDialog-paper': {
            maxHeight: '100vh',
            maxWidth: '100vw',
            margin: 0,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'hidden',
          },
        }}
        maxWidth={false}
        open={isDialogOpen}
        onClick={() => setIsDialogOpen(false)}
        onClose={() => setIsDialogOpen(false)}
      >
        <DialogImageWrapper>
          <div className="shimmer-border">
            <div className="shimmer-content">
              <DialogImage src={currentDialogCard} alt="Dialog" />
            </div>
          </div>
        </DialogImageWrapper>
      </Dialog>
    </MainContainer>
  );
}

export default App;
