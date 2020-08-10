import React, { useEffect } from 'react';
import drawTastyCleveland from '../d3/drawTastyCleveland';

const AggregateDetails = () => {
  useEffect(() => {
    drawTastyCleveland();
  });

  return (
    <>
      <h2>Let's look at the data!</h2>
      <p>
        Since the Fruit Matrix is a 2-dimensional graph, each piece of fruit is
        rated in two different ways. Looking at the aggregate averages is
        interesting and shows important information. For example, a fruit in the
        top-right corner is the optimal cobination of tasty and easy to eat.
        But, there is also interesting inforamtion to discover by looking at the
        data in different ways.
      </p>
      <p>
        One way is to consider just one dimension (tastyness of easyness) at a
        time. This helps us more easily see which fruits are tasty (or not)
        without worrying about how easy they are to eat (looking at you
        grapefruit).
      </p>
      <p>
        The Cleveland dot plots below isolate each dimension to make it easier
        to think about. The spread between the dots represents the range that
        ~68% of the data fall within (this is caluclated using standard
        deviation and mean). So, a piece of fruit with a short bar is ranked
        consistently by people. A long bar means people's opinions are more
        varied. The more to the right or up the bar is, the more easy or tasty
        people find the fruit.
      </p>
      <div id="tasty-d3"></div>
      <div id="easy-d3"></div>
    </>
  );
};

export default AggregateDetails;
