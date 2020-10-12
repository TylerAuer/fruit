import * as d3 from 'd3';

const drawTastyBox = () => {
  const imgSize = 35;

  // set the dimensions and margins of the graph
  const margin = imgSize / 2;
  const width = 760 - 2 * margin;
  const height = 600 - 2 * margin;

  // append the svg object to the body of the page
  const svg = d3
    .select('#tasty-d3')
    .append('svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', `0 0 760 600`)
    .append('g')
    .attr('transform', 'translate(' + margin + ',' + margin + ')');

  // Parse the Data
  d3.json('/data/tasty-box').then((data) => {
    // Add X axis
    const x = d3
      .scaleBand()
      .range([imgSize + 10, width])
      .domain(data.map((fruit) => fruit.name));

    // Y axis
    const y = d3.scaleLinear().domain([100, 0]).range([0, height]);
    const tickLabels = ['Tasty', 'Untasty'];
    const yAxis = d3
      .axisLeft(y)
      .ticks(1)
      .tickFormat((d, i) => tickLabels[i]);

    // Midline
    svg
      .selectAll('midline')
      .data(data)
      .enter()
      .append('line')
      .attr('x1', '0')
      .attr('x2', width)
      .attr('y1', y(50))
      .attr('y2', y(50))
      .attr('stroke', '#ddd')
      .attr('stroke-width', '1px');

    // Y Axis Labels
    svg
      .append('g')
      .call(yAxis)
      .selectAll('text')
      .style('text-anchor', 'start')
      .attr('dx', '20')
      .attr('dy', '7');

    // Lines
    svg
      .selectAll('myline')
      .data(data)
      .enter()
      .append('line')
      .attr('x1', (d) => x(d.name))
      .attr('x2', (d) => x(d.name))
      .attr('y1', (d) => y(d.q1))
      .attr('y2', (d) => y(d.q3))
      .attr('stroke', 'black')
      .attr('stroke-width', '2px');

    const circle = {
      radius: 3,
      color: 'rgb(255, 0, 183)',
    };

    // Bars for Q3
    svg
      .selectAll('mycircle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.name))
      .attr('cy', (d) => y(d.q3))
      .attr('r', circle.radius)
      .style('fill', circle.color);

    // Bars for Q1
    svg
      .selectAll('mycircle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.name))
      .attr('cy', (d) => y(d.q1))
      .attr('r', circle.radius)
      .style('fill', circle.color);

    // FRUIT @ averages
    svg
      .selectAll('svgs')
      .data(data)
      .enter()
      .append('svg:image')
      .attr('xlink:href', (d) =>
        require(`../../../shared/img/${d.name}.min.svg`)
      )
      .attr('x', (d) => x(d.name) - imgSize / 2)
      .attr('y', (d) => y(d.avg) - imgSize / 2)
      .attr('width', imgSize)
      .attr('height', imgSize);
  });
};

export default drawTastyBox;
