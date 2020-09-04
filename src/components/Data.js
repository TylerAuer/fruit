import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Header from './Header';
import drawCountsBar from '../d3/drawCountsBar';
import drawEasyBox from '../d3/drawEasyBox';
import drawTastyBox from '../d3/drawTastyBox';
import drawFruitHist from '../d3/drawFruitHist';
import drawCorrelation from '../d3/drawCorrelation';
import fruitList from '../components/Fruit.json';
import cleanName from '../functions/cleanFruitName';
import './secondary-page.scss';
import './Charts.scss';

const Data = () => {
  const [countOfAllRatings, setCountOfAllRatings] = useState(null);
  const [countOfUsers, setCountOfUsers] = useState(null);
  const [countsByFruit, setCountsByFruit] = useState(null);

  useEffect(() => {
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

    drawEasyBox();
    drawTastyBox();

    // Get data for historgrams
    fetch('/data/histograms')
      .then((res) => res.json())
      .then((data) => {
        Object.keys(fruitList).forEach((fruit) => {
          drawFruitHist(fruit, data);
        });
      });

    // Get data for correlation matrixes
    fetch('/data/correlation')
      .then((res) => res.json())
      .then((data) => {
        drawCorrelation(data, 'y');
        drawCorrelation(data, 'x');
      });
  }, []);

  const fruit2DHistograms = Object.keys(fruitList).map((fruit) => {
    return (
      <div key={fruit} className="chart">
        <div className="chart__header">
          <h3 className="chart__title">
            <img
              className="chart__fruit-img-in-title"
              src={require(`../img/${fruit}.min.svg`)}
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
        <section id="intro">
          <h2>Let's look at the data!</h2>
          <p>
            Our puny human brains are ill-equipped for analyzing data. We can
            only keep a measly{' '}
            <a href="https://en.wikipedia.org/wiki/Working_memory">
              four things in our heads
            </a>{' '}
            at any given time. And, to make matters worse, our brains also{' '}
            <a href="https://en.wikipedia.org/wiki/Apophenia">
              often see patterns where they do not exist
            </a>
            . So we need lots of help to understand trends without overfitting
            our ideas to imagined patterns. Luckily, heroes -- also known as
            statisticians and data visualization experts -- have developed many
            tools and strategies for helping our noggins overcome their evolved
            habits.
          </p>
          <p>
            This page contains a number of visualizations that update as people
            submit or change their ratings in the Fruit Matrix. Visualizations,
            when well-designed, help us notice real and meaningful patterns in
            data sets.
          </p>
        </section>
        <nav class="nav">
          <div className="nav__wrapper">
            <div className="nav__title">Jump to Sections</div>
            <ul>
              <li>
                <Link className="nav__link" to="/data/#frequencies">
                  Rating Frequencies
                </Link>
              </li>
              <li>
                <Link className="nav__link" to="/data/#iso-dimensions">
                  Isolated Dimensions
                </Link>
              </li>
              <li>
                <Link className="nav__link" to="/data/#histograms">
                  2D Histograms
                </Link>
              </li>
              <li>
                <Link className="nav__link" to="/data/#correlation">
                  Correlation Matrices
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <section id="frequencies">
          <h2>Sample Size & Frequency</h2>
          <p>
            How can you tell when something is a real pattern instead of just
            randomness? Statisticians have strategies to help with this. The
            most useful is to think about the <b>sample size</b> or{' '}
            <b>
              <i>n</i>
            </b>{' '}
            of a data set which describes how much data was collected. The
            dataset for this site is made up of {countOfAllRatings} ratings by{' '}
            {countOfUsers} people.
          </p>
          <p>
            The more data you collect, the more likely it is that the patterns
            you see are real. But, even huge data sets don't guarantee accuracy.
            All sorts of things can throw off your conclusions, so statisticians
            use probabilities to describe how likely a pattern is to be true.
            Statistics is hard! Lots of very smart people mess it up.
          </p>
          <p>
            Statisticians also keep track of <b>frequency</b>, the number of
            times something appears in data. Frequency is also sometimes called{' '}
            <b>count</b> because you are literally counting how many times
            something appears in your dataset.
          </p>
          <p>
            Since we don't require you to rate every fruit, some fruits are
            rated more frequently than others. You can see the relative counts
            below.
          </p>
          <div className="chart">
            <div className="chart__header">
              <h3 className="chart__title">Ratings by Fruit</h3>
              <div className="chart__subtitle">
                {countOfUsers} people have submitted a total of{' '}
                {countOfAllRatings} ratings. This bar chart shows how those
                ratings are spread out among the 16 different fruits.
              </div>
            </div>
            <div id="counts-d3" className="chart__chart"></div>
          </div>
        </section>
        <section id="iso-dimensions">
          <h2>Isolating Dimensions</h2>
          <p>
            As a middle school math teacher, I often had to help students
            understand scatterplots and the Cartesian plane. They usually
            already knew how to use ordered pairs of coordinates to find a
            location on the graph but they didn't really get the point (Ha! I do
            not apologize!).
          </p>
          <p>
            The trickiest concept is that any point represents two distinct
            pieces of information. In the case of the Fruit Matrix, those two
            dimensions are tastiness and ease of eating. But, the power of
            scatterplots like the Fruit Matrix is that they let you see each
            dimension in isolation as well as how those dimensions are
            correlated.
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
                {countOfUsers} users' ratings. The bars stretch from the 25th to
                the 75th percentile (Q1 to Q3).
              </div>
            </div>
            <div id="easy-d3" className="chart__chart"></div>
          </div>
        </section>
        <section id="histograms">
          <h2>Variance & Spread</h2>
          <p>
            There's still more we can discover! In the two charts above, each
            fruit's icon is located at its average rating. But, even if two
            fruits have the same average, their data can be spread out in
            different ways.
          </p>
          <p>
            Some fruit, for example, might have pretty consistent ratings where
            users usually rate them a specific way. Another fruit might have the
            same average but have a wide range of user ratings.
          </p>
          <p>
            Statisticians say that an average (or mean) is a measure of the
            center of a dataset. But, data sets also have other properties. One
            important one is how spread out the data is. This is also called{' '}
            <b>variance</b> and is often measured using a fancy metric called
            standard deviation. Try saying standard deviation out loud ... admit
            it, you feel smart!
          </p>
          <p>
            Visualizing the spread or variance in data can be tricky. We often
            use histograms (which look like bar charts but where the data is
            grouped into ranges of values) to see how the data is spread out.
          </p>
          <p>
            Things get fun (harder) when you want to display histograms for
            two-dimensional data like our fruit ratings. It doesn't really work
            with bars, so we'll use colors instead. And, frankly, it looks
            cooler.
          </p>
          <p>
            The graphs below are two-dimensional histograms. They help us see
            how the ratings for each fruit are spread out. Darker pink hexagons
            represent the areas where lots of people placed the fruit.
          </p>
          <div className="histograms">{fruit2DHistograms}</div>
        </section>
        <section id="correlation">
          <h2>Correlation</h2>
          <p>
            Now that we’ve looked at each fruit on its own, let’s start to think
            about how they relate to one another. As you rated each fruit, you
            may have realized that you felt similarly about certain types of
            fruit. Maybe you thought that green and red apples are each just as
            easy to eat. Maybe lots of other people feel the same way!
          </p>
          <p>
            Scientists look for relationships between different things,
            specifically how different values are related to one another. One
            way of describing the strength of a relationship is with
            correlation. Correlation is a value that describes how well the
            measure of one thing predicts the measure of another.
          </p>
          <p>
            Correlation has a simple scale; it always ranges from -1 to +1.
            Where the closer the value is to -1 or 1 the stronger the
            relationship. A correlation close to 0 means there is not much of a
            relationship.
          </p>
          <p>
            A positive correlation means that when one value goes up, the other
            value goes up too. For example, age and height are positively
            correlated. As your age increases, your height also increases (at
            least while you are a kid).
          </p>
          <p>
            When correlation is negative it means there is an inverse
            relationship -- when one value goes up the other value goes down.
            The amount of food you’ve eaten and your hunger level are negatively
            correlated. When the amount of food you’ve eaten goes up, your
            hunger level goes down. There’s still a relationship even though the
            measures go in opposite directions. What’s important is that one can
            be used to predict the other.
          </p>
          <p>
            But,{' '}
            <a href="https://xkcd.com/552/">
              just because two things are correlated doesn’t mean that one
              causes the other
            </a>
            . There is often something else behind the relationship.
          </p>
          <p>
            For example, ice cream sales and drowning are positively correlated
            -- they both increase together. But, that doesn’t mean eating ice
            cream causes drowning or that drowning makes you crave ice cream.
            Instead, they increase together because people eat ice cream and
            swim much more often in the summer. The time of year is a hidden
            variable causing the relationship between the ice cream and drowning
            to appear.
          </p>
          <p>
            Below are matrices of correlations between each fruit's tastiness
            and ease of eating. The pinker squares have stronger correlations.
            The diagonal line of dark pink squares appears because everything
            has a perfect relationship with itself.
          </p>

          <div className="chart">
            <div className="chart__header">
              <h3 className="chart__title">Tastiness Correlation Matrix</h3>
              <div className="chart__subtitle">
                Correlation matrix for tastiness with the correlation
                coefficient shown in each square. Darker pink squares represent
                stronger relationships.
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
      </main>
    </div>
  );
};

export default Data;
