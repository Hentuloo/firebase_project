import { letters } from 'config/soloTrainingConfig';

export const getSeparateFingers = (hands: Element[]) => {
  return hands.reduceRight<[string[], string[]]>((acc, hand) => {
    acc.push(
      [...hand.children].reverse().map(fingerNode => fingerNode.id),
    );
    return acc;
    // @ts-ignore
  }, []);
};
export const getFingerIdByCursor = (text: string, cursor: number) => {
  const word = text.charAt(cursor);
  if (word === ' ') return 5;
  const fingerIndex = letters[word] ? letters[word].finger : 5;
  return fingerIndex;
};
