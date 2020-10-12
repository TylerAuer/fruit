import * as d3 from 'd3';

const drawEasyBox = () => {
  const imgSize = 35;

  // set the dimensions and margins of the graph
  const margin = imgSize;
  const width = 760 - 2 * margin;
  const height = (imgSize + 10) * 16 - 2 * margin;

  // append the svg object to the body of the page
  var svg = d3
    .select('#easy-d3')
    .append('svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', `0 0 760 ${(imgSize + 10) * 16}`)
    .append('g')
    .attr('transform', 'translate(' + margin + ',' + margin + ')');

  // Parse the Data
  d3.json('/data/easy-box').then((data) => {
    // Add X axis
    const x = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const tickLabels = ['Hard', 'Easy'];
    const xAxis = d3
      .axisBottom(x)
      .ticks(1)
      .tickFormat((d, i) => tickLabels[i]);

    // Y axis
    const y = d3
      .scaleBand()
      .range([0, height])
      .domain(data.map((fruit) => fruit.name));

    // Midline
    svg
      .selectAll('midline')
      .data(data)
      .enter()
      .append('line')
      .attr('x1', x(50))
      .attr('x2', x(50))
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', '#ddd')
      .attr('stroke-width', '1px');

    // Add x Axis labels
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

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
      .attr('cx', (d) => x(d.q3))
      .attr('cy', (d) => y(d.name))
      .attr('r', circle.radius)
      .style('fill', circle.color);

    // Bars for Q1
    svg
      .selectAll('mycircle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.q1))
      .attr('cy', (d) => y(d.name))
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
      .attr('x', (d) => x(d.avg) - imgSize / 2)
      .attr('y', (d) => y(d.name) - imgSize / 2)
      .attr('width', imgSize)
      .attr('height', imgSize);
  });
};

export default drawEasyBox;
