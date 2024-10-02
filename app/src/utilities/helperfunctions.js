export const capitalizeAllWords = (inputString) => {
  const wordsArray = inputString.split('-');

  const capitalizedWords = wordsArray.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(' ');
}