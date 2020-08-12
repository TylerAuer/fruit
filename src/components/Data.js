import React, { useEffect, useState } from 'react';
import Header from './Header';
import drawEasyBox from '../d3/drawEasyBox';
import drawTastyBox from '../d3/drawTastyBox';
import drawCountsBar from '../d3/drawCountsBar';
import './secondary-page.scss';
import './Charts.scss';

const Data = () => {
  const [countOfAllRatings, setCountOfAllRatings] = useState(null);

  useEffect(() => {
    drawEasyBox();
    drawTastyBox();
    drawCountsBar();
    fetch('/data/count-of-all-ratings')
      .then((res) => res.json())
      .then((count) => setCountOfAllRatings(count.count_of_all_ratings));
  }, []);

  return (
    <div className="secondary">
      <Header />
      <main>
        <h2>Let's look at the data!</h2>
        <p>
          Our puny human brains need help to understand sets of data. Luckily,
          statisticians and visualization designers give us tools to help our
          feeble noggins parse big data sets.
        </p>
        <p>
          The Fruit Matrix is a 2-dimensional graph meaning each piece of fruit
          is rated in two different ways. When you look at a scatter plot or
          similar chart showing both pieces of information at the same time,
          it's easiest to see how to two dimensions interact. For example, a
          fruit in the top-right corner is the optimal cobination of tasty and
          easy to eat.
        </p>
        <p>
          The challenge of this approach is that it makes it harder to think
          about each dimension on its own. Two fruits may be rated equally tasty
          but be far apart in the scatterplot. That's confusing! By considering
          just one dimension (tastiness or easyness) at a time we can help our
          minds notice other details. We can, for example, see which fruits are
          tasty (or not) without worrying about how easy they are to eat
          (looking at you grapefruit).
        </p>
        <div className="chart">
          <div className="chart__header">
            <h3 className="chart__title">Which fruits are rated most</h3>
            <div className="chart__subtitle">
              People have submited {countOfAllRatings} ratings overall. This bar
              chart shows how those ratings are spread out among the 16
              different fruits.
            </div>
          </div>
          <div id="counts-d3" className="chart__chart"></div>
        </div>
        <p>
          The graphs below isolate tastiness and easyness to make each easier to
          think about. The bars contain the middle 50% of responses with each
          fruit located at its average.
        </p>

        <div className="chart">
          <div className="chart__header">
            <h3 className="chart__title">Tastiness Only</h3>
            <div className="chart__subtitle">Blah, blah, subtitle</div>
          </div>
          <div id="tasty-d3" className="chart__chart"></div>
        </div>

        <div className="chart">
          <div className="chart__header">
            <h3 className="chart__title">Easyness of Eating Only</h3>
            <div className="chart__subtitle">Blah, blah, subtitle</div>
          </div>
          <div id="easy-d3" className="chart__chart"></div>
        </div>

        <p>The bars on the</p>
      </main>
    </div>
  );
};

export default Data;
