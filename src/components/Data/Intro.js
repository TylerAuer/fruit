import React from 'react';

const Intro = () => {
  return (
    <section id="intro">
      <h2 className="section__heading">Let's look at the data!</h2>
      <p>
        Our puny human brains are ill-equipped for analyzing data. We can only
        keep a measly{' '}
        <a href="https://en.wikipedia.org/wiki/Working_memory">
          four things in our heads
        </a>{' '}
        at any given time. And, to make matters worse, our brains also{' '}
        <a href="https://en.wikipedia.org/wiki/Apophenia">
          often see patterns where they do not exist
        </a>
        . So we need lots of help to understand trends without overfitting our
        ideas to imagined patterns. Luckily, heroes -- also known as
        statisticians and data visualization experts -- have developed many
        tools and strategies for helping our noggins overcome their evolved
        habits.
      </p>
      <p>
        This page contains a number of visualizations that update as people
        submit or change their ratings in the Fruit Matrix. Visualizations, when
        well-designed, help us notice real and meaningful patterns in data sets.
      </p>
    </section>
  );
};

export default Intro;
