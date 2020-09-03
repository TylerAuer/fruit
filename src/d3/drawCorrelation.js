import * as d3 from 'd3';

const drawCorrelation = (data, dimension) => {
  // set the dimensions and margins of the graph
  const margin = 30;
  const width = 760 - 3 * margin; // margin is twice as large on left side
  const height = 760 - 3 * margin; // margin is twice as large on left side

  // append the svg object to the body of the page
  const svg = d3
    .select(`#${dimension}-cor-d3`)
    .append('svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', `0 0 760 760`)
    .append('g')
    .attr('transform', 'translate(' + 2 * margin + ',' + 2 * margin + ')');

  // Generate Scales
  const xScale = d3.scaleBand().domain(Object.keys(data)).range([0, width]);
  const yScale = d3.scaleBand().domain(Object.keys(data)).range([0, height]);
  const colorScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range(['rgb(255, 255, 255)', 'rgb(255, 0, 183)'])
    .interpolate(d3.interpolateRgb);

  // Add icons to left and top of chart
  svg
    .selectAll('svgs')
    .data(Object.keys(data))
    .enter()
    .append('svg:image')
    .attr('xlink:href', (d) => require(`../img/${d}.min.svg`))
    .attr('width', xScale.bandwidth() * 0.8) // icons are 80% of square size
    .attr('height', xScale.bandwidth() * 0.8)
    .attr('y', -1 * xScale.bandwidth()) // Move one square's height above grid
    .attr('x', (d) => xScale(d) + xScale.bandwidth() * 0.1); // center icon
  svg
    .selectAll('svgs')
    .data(Object.keys(data))
    .enter()
    .append('svg:image')
    .attr('xlink:href', (d) => require(`../img/${d}.min.svg`))
    .attr('width', yScale.bandwidth() * 0.8) // icons are 80% of square size
    .attr('height', yScale.bandwidth() * 0.8)
    .attr('x', -1 * yScale.bandwidth()) // Move one square's height above grid
    .attr('y', (d) => yScale(d) + yScale.bandwidth() * 0.1); // center icon

  // Add squares and labels to chart (one row at a time)
  for (let fruitRow in data) {
    // Add squares
    const rowData = d3.entries(data[fruitRow][dimension]);
    svg
      .selectAll(`${fruitRow}Row`)
      .data(rowData)
      .enter()
      .append('rect')
      .attr('stroke', '#000')
      .attr('stroke-opacity', 1)
      .attr('stroke-width', 1.5)
      .attr('fill', (d) => colorScale(Math.abs(d.value)))
      .attr('x', (d) => xScale(d.key))
      .attr('y', yScale(fruitRow))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth());

    // Add text
    svg
      .selectAll(`${fruitRow}Row`)
      .data(rowData)
      .enter()
      .append('text')
      .attr('color', 'black')
      .attr('x', (d) => xScale(d.key))
      .attr('y', yScale(fruitRow))
      .attr('dx', xScale.bandwidth() / 2)
      .attr('dy', yScale.bandwidth() / 2)
      .attr('font-size', '14px')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => Math.round(d.value * 100) / 100);
  }
};

export default drawCorrelation;
