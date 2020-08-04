import { useState, useEffect } from 'react';
import fruitList from '../components/Fruit.json';

const useManageAggregate = () => {
  const [aggregate, setAggregate] = useState(fruitList);

  const getAggregate = () => {
    fetch('/aggregate')
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
