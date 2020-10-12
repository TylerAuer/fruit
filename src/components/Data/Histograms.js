import React, { useEffect } from 'react';
import drawFruitHist from './d3/drawFruitHist';
import fruitList from '../../shared/Fruit.json';
import cleanName from '../../shared/functions/cleanFruitName';
import './Charts.scss';

const Histograms = ({ countsByFruit }) => {
  useEffect(() => {
    // Get data for historgrams
    fetch('/data/histograms')
      .then((res) => res.json())
      .then((data) => {
        Object.keys(fruitList).forEach((fruit) => {
          drawFruitHist(fruit, data);
        });
      });
  }, []);

  const fruit2DHistograms = Object.keys(fruitList).map((fruit) => {
    return (
      <div key={fruit} className="chart">
        <div className="chart__header">
          <h3 className="chart__title">
            <img
              className="chart__fruit-img-in-title"
              src={require(`../../shared/img/${fruit}.min.svg`)}
              alt={cleanName(fruit)}
            />
            {cleanName(fruit)}
          </h3>
          <div className="chart__subtitle">
            Two-dimensional histogram showing all{' '}
            {getCountFromCountsByFruit(fruit)} ratings of{' '}
            {cleanName(fruit).toLowerCase()}.
          </div>
        </div>
        <div
          id={`${fruit}-hist-d3`}
          className="chart__chart chart__histogram"
        ></div>
      </div>
    );
  });

  function getCountFromCountsByFruit(fruit) {
    if (countsByFruit) {
      for (let data of countsByFruit) {
        if (data.name === fruit) {
          return data.count;
        }
      }
    } else {
      return '';
    }
  }

  return (
    <section id="histograms">
      <h2 className="section__heading">Variance & Spread</h2>
      <p>
        There's still more we can discover! In the two charts above, each
        fruit's icon is located at its average rating. But, even if two fruits
        have the same average, their data can be spread out in different ways.
      </p>
      <p>
        Some fruit, for example, might have pretty consistent ratings where
        users usually rate them a specific way. Another fruit might have the
        same average but have a wide range of user ratings.
      </p>
      <p>
        Statisticians say that an average (or mean) is a measure of the center
        of a dataset. But, data sets also have other properties. One important
        one is how spread out the data is. This is also called <b>variance</b>{' '}
        and is often measured using a fancy metric called standard deviation.
        Try saying standard deviation out loud ... admit it, you feel smart!
      </p>
      <p>
        Visualizing the spread or variance in data can be tricky. We often use
        histograms (which look like bar charts but where the data is grouped
        into ranges of values) to see how the data is spread out.
      </p>
      <p>
        Things get fun (harder) when you want to display histograms for
        two-dimensional data like our fruit ratings. It doesn't really work with
        bars, so we'll use colors instead. And, frankly, it looks cooler.
      </p>
      <p>
        The graphs below are two-dimensional histograms. They help us see how
        the ratings for each fruit are spread out. Darker pink hexagons
        represent the areas where lots of people placed the fruit.
      </p>
      <div className="histograms">{fruit2DHistograms}</div>
    </section>
  );
};

export default Histograms;
