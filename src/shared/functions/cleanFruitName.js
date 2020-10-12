const cleanFruitName = (fruitName) => {
  return fruitName
    .split('_') // Convert into array
    .map((word) => word[0].toUpperCase() + word.slice(1)) // capitalize first letter
    .join(' '); // Convert into string
};

export default cleanFruitName;
