import * as d3 from 'd3';

const drawEasyCleveland = (size) => {
  const imgSize = 30;

  // set the dimensions and margins of the graph
  var margin = {
      top: imgSize / 2,
      right: 30,
      bottom: 30,
      left: 30,
    },
    width = 760 - margin.left - margin.right,
    height = (imgSize + 10) * 16 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#easy-d3')
    .append('svg')
    // .attr('width', width + margin.left + margin.right)
    // .attr('height', height + margin.top + margin.bottom)
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', `0 0 760 ${(imgSize + 10) * 16}`)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.json('/data/easy-cleveland').then((data) => {
    // Add X axis
    const x = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const tickLabels = ['Hard', 'Easy'];
    const xAxis = d3
      .axisBottom(x)
      .ticks(1)
      .tickFormat((d, i) => tickLabels[i]);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    // Y axis
    var y = d3
      .scaleBand()
      .range([0, height])
      .domain(data.map((fruit) => fruit.name));

    // Lines
    svg
      .selectAll('myline')
      .data(data)
      .enter()
      .append('line')
      .attr('x1', function (d) {
        return x(d.q1);
      })
      .attr('x2', function (d) {
        return x(d.q3);
      })
      .attr('y1', function (d) {
        return y(d.name);
      })
      .attr('y2', function (d) {
        return y(d.name);
      })
      .attr('stroke', 'black')
      .attr('stroke-width', '2px');

    const bar = {
      height: 10,
      width: 1,
    };

    // Bars for Q3
    svg
      .selectAll('mycircle')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.q3))
      .attr('y', (d) => y(d.name) - bar.height / 2)
      .attr('width', bar.width)
      .attr('height', bar.height)
      .style('fill', 'black');

    // Bars for Q1
    svg
      .selectAll('mycircle')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.q1))
      .attr('y', (d) => y(d.name) - bar.height / 2)
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
      .attr('x', (d) => x(d.avg) - imgSize / 2)
      .attr('y', (d) => y(d.name) - imgSize / 2)
      .attr('width', imgSize)
      .attr('height', imgSize);
  });
};

export default drawEasyCleveland;
