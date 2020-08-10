import * as d3 from 'd3';

const drawTastyBox = () => {
  const imgSize = 30;

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
      .range([0, width])
      .domain(data.map((fruit) => fruit.name));

    // Y axis
    const y = d3.scaleLinear().domain([100, 0]).range([0, height]);
    const tickLabels = ['Tasty', 'Untasty'];
    const yAxis = d3
      .axisLeft(y)
      .ticks(1)
      .tickFormat((d, i) => tickLabels[i]);
    svg
      .append('g')
      .attr('transform', 'translate( ' + width + ',0)')
      .call(yAxis);

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

    const bar = {
      height: 1,
      width: 10,
    };

    // Bars for Q3
    svg
      .selectAll('mycircle')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.name) - bar.width / 2)
      .attr('y', (d) => y(d.q3))
      .attr('width', bar.width)
      .attr('height', bar.height)
      .style('fill', 'black');

    // Bars for Q1
    svg
      .selectAll('mycircle')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.name) - bar.width / 2)
      .attr('y', (d) => y(d.q1))
      .attr('width', bar.width)
      .attr('height', bar.height)
      .style('fill', 'black');

    // FRUIT @ averages
    svg
      .selectAll('svgs')
      .data(data)
      .enter()
      .append('svg:image')
      .attr('xlink:href', (d) => require(`../img/${d.name}.svg`))
      .attr('x', (d) => x(d.name) - imgSize / 2)
      .attr('y', (d) => y(d.avg) - imgSize / 2)
      .attr('width', imgSize)
      .attr('height', imgSize);
  });
};

export default drawTastyBox;
