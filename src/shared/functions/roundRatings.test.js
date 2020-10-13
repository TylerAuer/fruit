import roundRatings from './roundRatings';

it('handle null ratings', () => {
  const ratings = {
    bananas: null,
    blueberries: null,
    cherries: null,
  };

  expect(roundRatings(ratings)).toEqual(ratings);
});

it('round down', () => {
  const before = {
    bananas: {
      x: 23.2222222,
      y: 50.0000002,
    },
  };

  const after = {
    bananas: {
      x: 23.2,
      y: 50.0,
    },
  };

  expect(roundRatings(before)).toEqual(after);
});

it('round up', () => {
  const before = {
    bananas: {
      x: 23.99,
      y: 99.55,
    },
  };

  const after = {
    bananas: {
      x: 24.0,
      y: 99.6,
    },
  };

  expect(roundRatings(before)).toEqual(after);
});

it('handle whole numbers', () => {
  const before = {
    bananas: {
      x: 1,
      y: 55,
    },
  };

  const after = {
    bananas: {
      x: 1.0,
      y: 55.0,
    },
  };

  expect(roundRatings(before)).toEqual(after);
});

it('handle min and max values', () => {
  const before = {
    bananas: {
      x: 0,
      y: 100,
    },
  };

  const after = {
    bananas: {
      x: 0.0,
      y: 100.0,
    },
  };

  expect(roundRatings(before)).toEqual(after);
});
