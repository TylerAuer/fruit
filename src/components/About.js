import React from 'react';
import Header from './Header';
import './secondary-page.scss';

const About = () => {
  return (
    <div className="secondary">
      <Header />
      <main>
        <p>
          <b>Fruit Matrix</b> was built by me, Tyler Auer. I've always been
          curious about coding so I decided to make the leap into full-time web
          development after twelve years in education where I worked as a
          teacher coach and taught math, science and technology to elementary,
          middle, and high school students. I've been building cool things and
          learning a ton.{' '}
          <a href="https://tylerauer.com">You should hire me!</a>
        </p>
        <h2>Inspiration</h2>
        <p>
          The original idea for the Fruit Matrix came from Randall Munroe's
          webcomic <a href="https://xkcd.com/">xkcd</a>. If you've never
          encountered Munroe's work before, I am so excited to share it with
          you. His <a href="https://xkcd.com/">webcomic</a> comes out
          thrice-weekly and often includes ideas from science, math, and
          technology. Sometimes the comics are{' '}
          <a href="https://xkcd.com/1040/">incredible</a> or{' '}
          <a href="https://xkcd.com/657/">silly </a>visualizations. He's also
          written a number of{' '}
          <a href="https://www.amazon.com/Books-Randall-Munroe/s?rh=n%3A283155%2Cp_27%3ARandall+Munroe">
            excellent sciency books
          </a>{' '}
          in which he takes a very serious approach to very ridiculous questions
          or a very silly approach to very serious questions.
        </p>
        <p>
          I'm not the first person to expand on Munroe's work. For years math
          teachers have used fruit matrices to help students understand how
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
        <h2>How did you choose the fruit?</h2>
        <p>
          Choosing which types of fruit to include was a balancing act. I wanted
          to honor the original comic so I'd originally planned to keep all 18
          of the fruits Munroe used. But there were some issues.
        </p>
        <p>
          First, in Munroe's comic, each fruit is represented with both an icon
          and a label. When I tried implementing that approach, things were
          quite messy. Since Munroe just chose where the fruit went, he was able
          to consider the labels as he laid out his graph. Since my matrix is
          dynamically created and edited, it was very messy when the labels were
          shown for every fruit. So, I set the labels to show only when hovered
          instead.
        </p>
        <p>
          This created its own issues. Without labels, each fruit needs to be
          identifiable only by its icon. That wasn't possible for seedless
          versus seeded grapes, so those were combined to just grapes. Plums and
          pomegranates are hard to render and aren't that recognizable. So,
          those were out.
        </p>
        <p>
          Finally, after some experimentation, I settled on 16 as an ideal
          number. With 16 fruits you are likely to place a couple fruits in each
          quadrant, but the aggregate displays aren't too crazy (unless you've
          got some particularly unique opinions). I added coconuts (which Munroe
          references in his comic's alt-text) and melons. Why melon? Well, I
          like melon and I'm in charge here.
        </p>
      </main>
    </div>
  );
};

export default About;
