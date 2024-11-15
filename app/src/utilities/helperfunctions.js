export const capitalizeAllWords = (inputString) => {
  const wordsArray = inputString.split('-');

  const capitalizedWords = wordsArray.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(' ');
}

export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);

  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
  };

  return date.toLocaleString('en-US', options)
}