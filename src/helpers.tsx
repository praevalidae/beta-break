// Load all JPGs in the cards directory as URLs at build time
const betaCardMap = import.meta.glob('./cards/beta/**/*.jpg', { as: 'url', eager: true }) as Record<
  string,
  string
>;
const breakCardMap = import.meta.glob('./cards/break/**/*.jpg', {
  as: 'url',
  eager: true,
}) as Record<string, string>;
const eliminateCardMap = import.meta.glob('./cards/eliminate/**/*.jpg', {
  as: 'url',
  eager: true,
}) as Record<string, string>;


const betaCardUrls = Object.values(betaCardMap);
const breakCardUrls = Object.values(breakCardMap);
const eliminateCardUrls = Object.values(eliminateCardMap);

export const getRandomBetaCard = () => {
  if (betaCardUrls.length === 0) return '';

  const randomIndex = Math.floor(Math.random() * betaCardUrls.length);
  return betaCardUrls[randomIndex];
};

export const getRandomBreakCard = () => {
  if (breakCardUrls.length === 0) return '';

  const randomIndex = Math.floor(Math.random() * breakCardUrls.length);
  return breakCardUrls[randomIndex];
};

export const getRandomEliminateCard = () => {
  if (eliminateCardUrls.length === 0) return '';

  const randomIndex = Math.floor(Math.random() * eliminateCardUrls.length);
  return eliminateCardUrls[randomIndex];
};

