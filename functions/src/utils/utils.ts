import { GameScoresDoc, ScoreWithUid } from '../data';

export const sortUsersScores = (sc: GameScoresDoc) => {
  const users = Object.keys(sc.scores);
  const scoresWithUsers = users.map(
    uid => ({ ...sc.scores[uid], uid } as ScoreWithUid),
  );
  return scoresWithUsers.sort(
    (first, second) => second.points - first.points,
  );
};

export const getTextPropertiesForMeasurment = (text: string) => {
  const arrayedText = text.split(' ');
  const intervalsBetweenWords = Math.ceil(arrayedText.length * 0.15);
  const intervalsAmount = Math.ceil(
    arrayedText.length / intervalsBetweenWords,
  );

  let writtenWordsByInterval: number[] = [];
  do {
    writtenWordsByInterval.push(
      writtenWordsByInterval.length * intervalsBetweenWords,
    );
  } while (intervalsAmount !== writtenWordsByInterval.length - 1);
  //remove first measurement (always 0)
  writtenWordsByInterval.shift();
  // correct when last inteval is away than text length
  if (writtenWordsByInterval.slice(-1)[0] > arrayedText.length) {
    writtenWordsByInterval.pop();
    writtenWordsByInterval.push(arrayedText.length);
  }

  const cursorPoints = writtenWordsByInterval.reduce(
    (acc, to, index) => {
      const from = writtenWordsByInterval[index - 1] || 0;

      let amountOfWords = arrayedText.slice(from, to).join(' ')
        .length;
      const previousValue = acc[index - 1];

      // add space (until it is not last word)
      if (index !== writtenWordsByInterval.length - 1) {
        amountOfWords += 1;
      }

      //first time
      if (!previousValue) {
        acc.push(amountOfWords);
      } else {
        acc.push(amountOfWords + previousValue);
      }

      return acc;
    },
    [],
  );

  return { cursorPoints, writtenWordsByInterval };
};
