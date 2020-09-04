import React, { useEffect } from 'react';
import drawCorrelation from './d3/drawCorrelation';

const Correlation = () => {
  useEffect(() => {
    // Get data for correlation matrixes
    fetch('/data/correlation')
      .then((res) => res.json())
      .then((data) => {
        drawCorrelation(data, 'y');
        drawCorrelation(data, 'x');
      });
  }, []);

  return (
    <section id="correlation">
      <h2>Correlation</h2>
      <p>
        Now that we’ve looked at each fruit on its own, let’s start to think
        about how they relate to one another. As you rated each fruit, you may
        have realized that you felt similarly about certain types of fruit.
        Maybe you thought that green and red apples are each just as easy to
        eat. Maybe lots of other people feel the same way!
      </p>
      <p>
        Scientists look for relationships between different things, specifically
        how different values are related to one another. One way of describing
        the strength of a relationship is with correlation. Correlation is a
        value that describes how well the measure of one thing predicts the
        measure of another.
      </p>
      <p>
        Correlation has a simple scale; it always ranges from -1 to +1. Where
        the closer the value is to -1 or 1 the stronger the relationship. A
        correlation close to 0 means there is not much of a relationship.
      </p>
      <p>
        A positive correlation means that when one value goes up, the other
        value goes up too. For example, age and height are positively
        correlated. As your age increases, your height also increases (at least
        while you are a kid).
      </p>
      <p>
        When correlation is negative it means there is an inverse relationship
        -- when one value goes up the other value goes down. The amount of food
        you’ve eaten and your hunger level are negatively correlated. When the
        amount of food you’ve eaten goes up, your hunger level goes down.
        There’s still a relationship even though the measures go in opposite
        directions. What’s important is that one can be used to predict the
        other.
      </p>
      <p>
        But,{' '}
        <a href="https://xkcd.com/552/">
          just because two things are correlated doesn’t mean that one causes
          the other
        </a>
        . There is often something else behind the relationship.
      </p>
      <p>
        For example, ice cream sales and drowning are positively correlated --
        they both increase together. But, that doesn’t mean eating ice cream
        causes drowning or that drowning makes you crave ice cream. Instead,
        they increase together because people eat ice cream and swim much more
        often in the summer. The time of year is a hidden variable causing the
        relationship between the ice cream and drowning to appear.
      </p>
      <p>
        Below are matrices of correlations between each fruit's tastiness and
        ease of eating. The pinker squares have stronger correlations. The
        diagonal line of dark pink squares appears because everything has a
        perfect relationship with itself.
      </p>

      <div className="chart">
        <div className="chart__header">
          <h3 className="chart__title">Tastiness Correlation Matrix</h3>
          <div className="chart__subtitle">
            Correlation matrix for tastiness with the correlation coefficient
            shown in each square. Darker pink squares represent stronger
            relationships.
          </div>
        </div>
        <div id="y-cor-d3" className="chart__chart"></div>
      </div>

      <div className="chart">
        <div className="chart__header">
          <h3 className="chart__title">Easiness Correlation Matrix</h3>
          <div className="chart__subtitle">
            Correlation matrix for easiness of eating with the correlation
            coefficient shown in each square. Darker pink squares represent
            stronger relationships.
          </div>
        </div>
        <div id="x-cor-d3" className="chart__chart"></div>
      </div>
    </section>
  );
};

export default Correlation;
