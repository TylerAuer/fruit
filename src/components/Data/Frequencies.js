import React from 'react';
import { useEffect } from 'react';
import drawCountsBar from './d3/drawCountsBar';
import './Charts.scss';

const Frequencies = ({ countOfUsers, countOfAllRatings, countsByFruit }) => {
  useEffect(() => {
    if (countsByFruit) {
      drawCountsBar(countsByFruit);
    }
  }, [countsByFruit]);

  return (
    <section id="frequencies">
      <h2 className="section__heading">Sample Size & Frequency</h2>
      <p>
        How can you tell when something is a real pattern instead of just
        randomness? Statisticians have strategies to help with this. The most
        useful is to think about the <b>sample size</b> or{' '}
        <b>
          <i>n</i>
        </b>{' '}
        of a data set which describes how much data was collected. The dataset
        for this site is made up of {countOfAllRatings} ratings by{' '}
        {countOfUsers} people.
      </p>
      <p>
        The more data you collect, the more likely it is that the patterns you
        see are real. But, even huge data sets don't guarantee accuracy. All
        sorts of things can throw off your conclusions, so statisticians use
        probabilities to describe how likely a pattern is to be true. Statistics
        is hard! Lots of very smart people mess it up.
      </p>
      <p>
        Statisticians also keep track of <b>frequency</b>, the number of times
        something appears in data. Frequency is also sometimes called{' '}
        <b>count</b> because you are literally counting how many times something
        appears in your dataset.
      </p>
      <p>
        Since we don't require you to rate every fruit, some fruits are rated
        more frequently than others. You can see the relative counts below.
      </p>

      <div className="chart">
        <div className="chart__header">
          <h3 className="chart__title">Ratings by Fruit</h3>
          <div className="chart__subtitle">
            {countOfUsers} people have submitted a total of {countOfAllRatings}{' '}
            ratings. This bar chart shows how those ratings are spread out among
            the 16 different fruits.
          </div>
        </div>
        <div id="counts-d3" className="chart__chart"></div>
      </div>
    </section>
  );
};

export default Frequencies;
