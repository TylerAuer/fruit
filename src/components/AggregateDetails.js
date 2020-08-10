import React, { useEffect } from 'react';
import Header from './Header';
import drawEasyCleveland from '../d3/drawEasyCleveland';
import './secondary-page.scss';
import './Clevelands.scss';

const AggregateDetails = () => {
  useEffect(() => {
    drawEasyCleveland();
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
          just one dimension (tastyness or easyness) at a time we can help our
          minds notice other details. We can, for example, see which fruits are
          tasty (or not) without worrying about how easy they are to eat
          (looking at you grapefruit).
        </p>
        <p>
          The Cleveland Dot Plots below isolate tastyness and easyness to make
          each easier to think about. The spread between the dots represents the
          range that ~68% of the data fall within (this is calculated using
          standard deviation and mean). So, a piece of fruit with a short bar is
          ranked more consistently by people. A long bar means people's opinions
          are more varied. The more to the right or up the bar is, the more easy
          or tasty people find the fruit.
        </p>

        {/* <div className="chart">
          <h3 className="chart__title">Fruit by Tastyness</h3>
          <div id="tasty-d3" className="chart__chart"></div>
        </div> */}

        <div className="chart">
          <div className="chart__header">
            <h3 className="chart__title">Fruit by Easyness</h3>
            <div className="chart__subtitle">
              Shows how easy a fruit is to eat. Fruit image is located at the
              average. The bars hold about 68% of users' ratings for each fruit,
              so a larger bar means people's opinions vary more.
            </div>
          </div>
          <div id="easy-d3" className="chart__chart"></div>
        </div>

        <p>The bars on the</p>
      </main>
    </div>
  );
};

export default AggregateDetails;
