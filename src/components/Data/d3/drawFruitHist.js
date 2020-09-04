import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';

const drawFruitHist = (fruit, data) => {
  data = data[fruit].ratings; // isolate the ratings just for a single fruit
  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };
  const height = 760;
  const width = 760;

  const x = d3
    .scaleLinear()
    .domain([0, 100])
    .rangeRound([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .rangeRound([height - margin.bottom, margin.top]);

  // Generate hexbin data
  const hex = hexbin()
    .x((d) => x(d.x))
    .y((d) => y(d.y))
    .radius((30 * width) / 954)
    .extent([
      [margin.left, margin.top],
      [width - margin.right, height - margin.bottom],
    ]);

  const bins = hex(data);

  // creates color scale
  const color = d3
    .scaleLinear()
    .domain([0, d3.max(bins, (d) => d.length)])
    .range(['transparent', 'rgb(255, 0, 183)']);

  // Create SVG and attach to selected data
  const svg = d3
    .select(`#${fruit}-hist-d3`)
    .append('svg')
    .attr('viewBox', [0, 0, width, height]);

  svg
    .append('g')
    .attr('stroke', '#000')
    .attr('stroke-opacity', 1)
    .attr('stroke-width', 1.5)
    .selectAll('path')
    .data(bins)
    .join('path')
    .attr('d', hex.hexagon())
    .attr('transform', (d) => `translate(${d.x},${d.y})`)
    .attr('fill', (d) => color(d.length));
};

export default drawFruitHist;
