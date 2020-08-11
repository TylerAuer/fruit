import * as d3 from 'd3';

const drawCountsBar = () => {
  const imgSize = 30;
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 10, bottom: 30, left: 2 * imgSize },
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#counts-d3')
    .append('svg')
    .attr('viewBox', `0 0 1000 700`)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Parse the Data
  d3.json('/data/counts').then((data) => {
    const max = d3.max(data.map(({ count }) => count));

    // Scales
    const x = d3.scaleLinear().domain([0, max]).range([0, width]).nice();

    const y = d3
      .scaleBand()
      .range([0, height])
      .domain(data.map((d) => d.name))
      .padding(0.2);

    //Bars
    svg
      .selectAll('myRect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(0))
      .attr('y', (d) => y(d.name))
      .attr('width', (d) => x(d.count))
      .attr('height', y.bandwidth())
      .attr('fill', '#bbb');

    // Y Axis Fruits
    // svg.append('g').call(d3.axisLeft(y));
    svg
      .selectAll('svgs')
      .data(data)
      .enter()
      .append('svg:image')
      .attr('xlink:href', (d) => require(`../img/${d.name}.svg`))
      .attr('x', -1 * imgSize - 10)
      .attr('y', (d) => y(d.name))
      .attr('width', imgSize)
      .attr('height', imgSize);

    // X Axis
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).ticks(6))
      .selectAll('text')
      .style('text-anchor', 'middle');

    // .attr("x", function(d) { return x(d.Country); })
    // .attr("y", function(d) { return y(d.Value); })
    // .attr("width", x.bandwidth())
    // .attr("height", function(d) { return height - y(d.Value); })
    // .attr("fill", "#69b3a2")
  });
};

export default drawCountsBar;
