export const getSeparateFingers = (hands: Element[]) => {
  return hands.reduceRight<[string[], string[]]>((acc, hand) => {
    acc.push(
      [...hand.children].reverse().map(fingerNode => fingerNode.id),
    );
    return acc;
    // @ts-ignore
  }, []);
};
