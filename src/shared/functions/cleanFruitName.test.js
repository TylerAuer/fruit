import cleanFruitName from './cleanFruitName';

it('cleans red_apples', () => {
  expect(cleanFruitName('red_apples')).toEqual('Red Apples');
});

it('cleans green_apples', () => {
  expect(cleanFruitName('green_apples')).toEqual('Green Apples');
});

it('capitalizes bananas', () => {
  expect(cleanFruitName('bananas')).toEqual('Bananas');
});
