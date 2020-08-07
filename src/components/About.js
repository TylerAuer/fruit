import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from './Button';
import './About.scss';
import fruitList from './Fruit.json';

const About = ({ aggregate: agg }) => {
  const history = useHistory();

  const cleanFruitName = (fruitName) => {
    return fruitName
      .split('_') // Convert into array
      .map((word) => word[0].toUpperCase() + word.slice(1)) // capitalize first letter
      .join(' '); // Convert into string
  };

  // Determine the highest and lowest rated fruit in each category
  let mostTastyVal = 0;
  let mostEasyVal = 0;
  let leastTastyVal = 100;
  let leastEasyVal = 100;
  let mostTastyName;
  let leastTastyName;
  let mostEasyName;
  let leastEasyName;

  if (agg.fruit) {
    // Skip until fruit data is loaded
    for (let fruit in fruitList) {
      // Check if MOST EASY
      if (agg.fruit[fruit].avg_x > mostEasyVal) {
        mostEasyVal = agg.fruit[fruit].avg_x;
        mostEasyName = fruit;
      }
      // Check if LEAST EASY
      if (agg.fruit[fruit].avg_x < leastEasyVal) {
        leastEasyVal = agg.fruit[fruit].avg_x;
        leastEasyName = fruit;
      }
      // Check if MOST TASTY
      if (agg.fruit[fruit].avg_y > mostTastyVal) {
        mostTastyVal = agg.fruit[fruit].avg_y;
        mostTastyName = fruit;
      }
      // Check if LEAST TASTY
      if (agg.fruit[fruit].avg_y < leastTastyVal) {
        leastTastyVal = agg.fruit[fruit].avg_y;
        leastTastyName = fruit;
      }
    }
  }

  return (
    <div className="about">
      <header className="about__header">
        <Link to="/">
          <h1 className="about__title">Fruit Matrix</h1>
        </Link>
        <div className="about__subtitle">
          An aggregator of people's feelings about fruit. Inspired by XKCD.
        </div>
      </header>
      <Button onClick={() => history.push('/')} text="Back to Graph" />
      <main>
        <p>
          <b>Fruit Matrix</b> was built by me, Tyler Auer. I've always been
          curious about coding so I decided to make the leap into full-time web
          development after twelve years in education where I worked as a
          teacher coach and math, science and technology teacher for elementary,
          middle, and high school students. I've been building cool things and
          learning a ton.{' '}
          <a href="https://tylerauer.com">You should hire me!</a>
        </p>
        <h2>Inspiration</h2>
        <p>
          The original idea of a fruit matrix comes from Randall Munroe's web
          comic <a href="https://xkcd.com/">XKCD</a>. If you've never
          encountered Munroe's work before, I am so excited to share it with
          you. His <a href="https://xkcd.com/">web-comic</a> comes out
          thrice-weekly and is often about science, math, and technology.
          Sometimes the comics are{' '}
          <a href="https://xkcd.com/1040/">incredible</a> or{' '}
          <a href="https://xkcd.com/657/">silly </a>visualizations. He's also
          written a number of{' '}
          <a href="https://www.amazon.com/Books-Randall-Munroe/s?rh=n%3A283155%2Cp_27%3ARandall+Munroe">
            excellent sciency books
          </a>{' '}
          in which he takes a very serious approach to very ridiculous
          questions. I've avoided linking to the exact comic that inspired this
          site because its title includes a swear -- I expect students to use
          this site -- but searching for "XKCD grapefruit" will find it quickly.
        </p>
        <p>
          I'm not the first person to expand on Munroe's work. For years math
          teachers have used the fruit matrix to help students understand how
          points on a two-axis graph represent two distinct values.{' '}
          <a href="https://www.desmos.com/">Desmos</a>, the amazing free
          graphing calculator and math interactive company, has their own
          interactive version they call{' '}
          <a href="https://teacher.desmos.com/activitybuilder/custom/58cb067910f10b0a21d4db93">
            Pomegraphit
          </a>
          .
        </p>
        <p>
          <a href="https://www.nytimes.com/">The New York Times</a> even made a
          similar interactive for{' '}
          <a href="https://www.nytimes.com/interactive/2017/08/09/upshot/game-of-thrones-chart.html">
            Game of Thrones
          </a>
          . You'll no doubt notice how their great app influenced the layout of
          mine.
        </p>
        {agg.count_of_all_ratings && (
          <>
            <h2>Stats</h2>
            <ul>
              <li>
                {agg.count_of_submissions} people have rated{' '}
                {agg.count_of_all_ratings} fruits since this went live.
              </li>
              <li>
                {cleanFruitName(agg.most_rated_fruit_name)} have been rated{' '}
                {agg.fruit[agg.most_rated_fruit_name].count} times, the most of
                any fruit.
              </li>
              <li>
                {cleanFruitName(agg.least_rated_fruit_name)} have been rated{' '}
                {agg.fruit[agg.least_rated_fruit_name].count} times, the least
                of any fruit.
              </li>
              <li>
                {cleanFruitName(mostTastyName)} are the tastiest fruit.{' '}
                {cleanFruitName(leastTastyName)} are the least tasty.
              </li>
              <li>
                {cleanFruitName(mostEasyName)} are the easiest fruit to eat.{' '}
                {cleanFruitName(leastEasyName)} are the least easy.
              </li>
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default About;
