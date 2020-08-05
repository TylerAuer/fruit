import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from './Button';
import './About.scss';

const About = ({ countOfSubmissions, countOfAllRatings }) => {
  const history = useHistory();

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
        {countOfAllRatings && (
          <>
            <h2>Stats</h2>
            <p>
              {countOfSubmissions} people have rated {countOfAllRatings} fruits
              since this went live.
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default About;
