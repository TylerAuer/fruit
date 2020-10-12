import { useState, useEffect } from 'react';
import fruitList from '../Fruit.json';

const useManageAggregate = () => {
  const [aggregate, setAggregate] = useState(fruitList);

  const getAggregate = () => {
    fetch('/data/averages')
      .then((res) => res.json())
      .then((data) => {
        setAggregate(data);
      });
  };

  useEffect(() => {
    getAggregate();
  }, []);

  return { aggregate, getAggregate };
};

export default useManageAggregate;
