import { letters } from 'config/soloTrainingConfig';

export const getSeparateFingers = (hands: Element[]): string[][] => {
  return hands.reduceRight<string[][]>((acc, hand) => {
    acc.push(
      [...hand.children]
        .reverse()
        .map(fingerNode => fingerNode.getAttribute('id') || ''),
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
