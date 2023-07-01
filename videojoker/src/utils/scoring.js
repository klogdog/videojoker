export function scoreHand(hand) {
    let suits = hand.map(card => card.suit);
    let values = hand.map(card => card.value);
    values.sort((a, b) => {
      if (['J', 'Q', 'K', 'A'].includes(a)) a = 11 + ['J', 'Q', 'K', 'A'].indexOf(a);
      if (['J', 'Q', 'K', 'A'].includes(b)) b = 11 + ['J', 'Q', 'K', 'A'].indexOf(b);
      return a - b;
    });

    let uniqueSuits = [...new Set(suits)];
    let uniqueValues = [...new Set(values)];

    // Count occurrences of each card value
    let counts = values.reduce((acc, val) => {
      if (val in acc) {
        acc[val]++;
      } else {
        acc[val] = 1;
      }
      return acc;
    }, {});

  // Check for Royal Flush
  if (uniqueSuits.length === 1 && values.join('') === '10JQKA') {
    return { score: 800, message: 'Royal Flush' };
  }

  // Check for Straight Flush
  if (uniqueSuits.length === 1 && uniqueValues.length === 5 && values[4] - values[0] === 4) {
    return { score: 50, message: 'Straight Flush' };
  }

  // Check for Four of a Kind
  if (Object.values(counts).includes(4)) {
    return { score: 25, message: 'Four of a Kind' };
  }

  // Check for Full House
  if (Object.values(counts).includes(3) && Object.values(counts).includes(2)) {
    return { score: 9, message: 'Full House' };
  }

  // Check for Flush
  if (uniqueSuits.length === 1) {
    return { score: 6, message: 'Flush' };
  }

  // Check for Straight
  if (uniqueValues.length === 5 && values[4] - values[0] === 4) {
    return { score: 4, message: 'Straight' };
  }

  // Check for Three of a Kind
  if (Object.values(counts).includes(3)) {
    return { score: 3, message: 'Three of a Kind' };
  }

  // Check for Two Pair
  if (Object.values(counts).filter(val => val === 2).length === 2) {
    return { score: 2, message: 'Two Pair' };
  }

  // Check for Jacks or Better
  if (Object.entries(counts).filter(([key, val]) => ['J', 'Q', 'K', 'A'].includes(key) && val >= 2).length > 0) {
    return { score: 1, message: 'Jacks or Better' };
  }

  return { score: 0, message: 'No Match' };
}