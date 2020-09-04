import React from 'react';
import drawEasyBox from './d3/drawEasyBox';
import drawTastyBox from './d3/drawTastyBox';
import { useEffect } from 'react';
import './Charts.scss';

const Dimensions = ({ countOfUsers }) => {
  useEffect(() => {
    drawEasyBox();
    drawTastyBox();
  }, []);

  return (
    <section id="iso-dimensions">
      <h2>Isolating Dimensions</h2>
      <p>
        As a middle school math teacher, I often had to help students understand
        scatterplots and the Cartesian plane. They usually already knew how to
        use ordered pairs of coordinates to find a location on the graph but
        they didn't really get the point (Ha! I do not apologize!).
      </p>
      <p>
        The trickiest concept is that any point represents two distinct pieces
        of information. In the case of the Fruit Matrix, those two dimensions
        are tastiness and ease of eating. But, the power of scatterplots like
        the Fruit Matrix is that they let you see each dimension in isolation as
        well as how those dimensions are correlated.
      </p>
      <p>
        Moving between these perspectives -- isolated versus interrelated
        dimensions -- is a tough abstraction that takes a lot of experience
        before it feels natural. To help, here are two charts showing each
        dimension in isolation.
      </p>

      <div className="chart">
        <div className="chart__header">
          <h3 className="chart__title">Tastiness Only</h3>
          <div className="chart__subtitle">
            Displays how tasty each fruit is as an average of {countOfUsers}{' '}
            users' ratings. The bars stretch from the 25th to the 75th
            percentile (Q1 to Q3).
          </div>
        </div>
        <div id="tasty-d3" className="chart__chart"></div>
      </div>

      <div className="chart">
        <div className="chart__header">
          <h3 className="chart__title">Easiness of Eating Only</h3>
          <div className="chart__subtitle">
            Displays how easy each fruit is to eat as an average of{' '}
            {countOfUsers} users' ratings. The bars stretch from the 25th to the
            75th percentile (Q1 to Q3).
          </div>
        </div>
        <div id="easy-d3" className="chart__chart"></div>
      </div>
    </section>
  );
};

export default Dimensions;
