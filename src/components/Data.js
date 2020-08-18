import React, { useEffect, useState } from 'react';
import Header from './Header';
import drawEasyBox from '../d3/drawEasyBox';
import drawTastyBox from '../d3/drawTastyBox';
import drawCountsBar from '../d3/drawCountsBar';
import drawFruitHist from '../d3/drawFruitHist';
import fruitList from '../components/Fruit.json';
import cleanName from '../functions/cleanFruitName';
import './secondary-page.scss';
import './Charts.scss';

const Data = () => {
  const [countOfAllRatings, setCountOfAllRatings] = useState(null);
  const [countOfUsers, setCountOfUsers] = useState(null);
  const [countsByFruit, setCountsByFruit] = useState(null);

  useEffect(() => {
    drawEasyBox();
    drawTastyBox();
    // Get total count of ratings and count of users
    fetch('/data/counts-of-ratings-and-users')
      .then((res) => res.json())
      .then((count) => {
        setCountOfAllRatings(count.count_of_all_ratings);
        setCountOfUsers(count.count_of_users);
      });
    // Get counts by fruit
    fetch('/data/counts-of-ratings-by-fruit')
      .then((res) => res.json())
      .then((countsByFruit) => {
        setCountsByFruit(countsByFruit);
        drawCountsBar(countsByFruit);
      });

    // Get data for historgrams
    fetch('/data/histograms')
      .then((res) => res.json())
      .then((data) => {
        Object.keys(fruitList).forEach((fruit) => {
          drawFruitHist(fruit, data);
        });
      });
  }, []);

  const fruit2DHistograms = Object.keys(fruitList).map((fruit, index) => {
    return (
      <div key={fruit} className="chart">
        <div className="chart__header">
          <h3 className="chart__title">
            <img
              className="chart__fruit-img-in-title"
              src={require(`../img/${fruit}.svg`)}
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
    <div className="secondary">
      <Header />
      <main>
        <h2>Let's look at the data!</h2>
        <p>
          Our puny human brains are ill-equiped for analyzing data. We can only
          keep about{' '}
          <a href="https://en.wikipedia.org/wiki/Working_memory">
            four things in our heads
          </a>{' '}
          at any given time. But, our brains also{' '}
          <a href="https://en.wikipedia.org/wiki/Apophenia">
            often see patterns where they do not exist
          </a>
          . We need help to understand trends without overfitting our ideas to
          imagined patterns. Luckily, heroes (also known as statisticians and
          data visualization experts) have developed many tools and strategies
          for helping our noggins overcome their evolved habits.
        </p>
        <p>
          This page contains a number of visualizations that update as people
          submit or change their ratings in the fruit matrix. Visualizations,
          when well-designed, help us notice real and meaningful patterns in
          data sets.
        </p>
        <h2>Sample Size & Frequency</h2>
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
          probabilities to describe how likely a pattern is to be true.
          Statistics is hard! Lots of very smart people mess it up.
        </p>
        <p>
          Statisticians also keep track of <b>frequency</b>, the number of times
          something appears in data. Frequency is also sometimes called{' '}
          <b>count</b> because you are literally counting how many times
          something appears in your dataset.
        </p>
        <p>
          Since I don't require you to rate every fruit, some fruits are rated
          more than others. You can see the relative frequencies below.
        </p>
        <div className="chart">
          <div className="chart__header">
            <h3 className="chart__title">Ratings by Fruit</h3>
            <div className="chart__subtitle">
              {countOfUsers} people have submited a total of {countOfAllRatings}{' '}
              ratings. This bar chart shows how those ratings are spread out
              among the 16 different fruits.
            </div>
          </div>
          <div id="counts-d3" className="chart__chart"></div>
        </div>
        <h2>Isolating Dimensions</h2>
        <p>
          As a middle school math teacher, I often had to help students
          understand scatterplots and the Cartesian plane. They usually already
          knew how to use ordered pairs of coordinates find a location on the
          graph but they didn't really understand what the point (Ha! I do not
          apologize!) was.
        </p>
        <p>
          The trickiest concept is that any point represents two distinct pieces
          of information. In the case of the Fruit Matrix, those two dimensions
          are tastiness and the easiness. But, the power of scatterplots like
          the Fruit Matrix is that they let you see each dimension in isolation
          as well as how those dimensions are correlated.
        </p>
        <p>
          Moving between these perspecitives -- isolated versus interrelated
          dimensions -- is a tough abstraction that takes a lot of experience to
          feel natural. To help, here are two charts showing each dimension in
          isolation.
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
              {countOfUsers} users' ratings. The bars stretch from the 25th to
              the 75th percentile (Q1 to Q3).
            </div>
          </div>
          <div id="easy-d3" className="chart__chart"></div>
        </div>

        <h2>Variance & Spread</h2>
        <p>
          There's still more we can discover! In the two charts above, each
          fruit's icon is located at the average rating. But, even if two fruits
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
          one is how spread out the data is. This is also called variance and is
          often described using a fancy term called standard deviation. Try
          saying standard deviation out loud ... admit it, you feel smart!
        </p>
        <p>
          Visualizing the spread or variance in data can be tricky. We often use
          histograms (which look like bar charts but where the data is grouped
          into ranges of values).
        </p>
        <p>
          Things get fun (harder) when you want to display histograms for
          two-dimensional data like our fruit ratings. It doesn't really work
          with bars, so we'll use colors instead. And, frankly, it looks
          sweeter.
        </p>
        <p>
          The graphs below are two-dimensional histograms. They help us see how
          the ratings for each fruit are spread out.
        </p>
        <div className="histograms">{fruit2DHistograms}</div>
      </main>
    </div>
  );
};

export default Data;
