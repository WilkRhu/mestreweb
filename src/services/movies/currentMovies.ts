export const currentMoviesPerData = (finalDate) => {
  const final = Date.parse(parseDate(finalDate));
  const currentDay = Date.now();
  const day = 1000 * 60 * 60 * 24;
  const finalResult = (final - currentDay) / day;
  return Math.round(finalResult);
};

export const currentMoviesArray = (array) => {
  return array.map((item, indice) => {
    const final = Date.parse(parseDate(item.finalDate));
    const currentDay = Date.now();
    const day = 1000 * 60 * 60 * 24;
    const finalResult = (final - currentDay) / day;
    return { [indice]: item, timeLeft: Math.round(finalResult) };
  });
};

const parseDate = (date) => {
  const newDate = date.split('/');
  return (
    parseInt(newDate[2]) +
    ',' +
    parseInt(newDate[1]) +
    ',' +
    parseInt(newDate[0])
  );
};
