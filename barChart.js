import * as d3 from 'd3';

const {select, scaleLinear, max, scaleBand, axisLeft, csv, axisBottom} = d3

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
  const xValue = d => d.population;
  const yValue = d => d.country;
  const margin = { top: 20, right: 20, bottom: 20, left: 70}
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth])
  
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1)

  const yAxis = axisLeft(yScale);
  const xAxis = axisBottom(xScale);
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  g.append('g').call(yAxis)
  g.append('g').call(xAxis)    
  .attr('transform', `translate(0, ${innerHeight})`);

  g.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth())
}
csv('./data/population.csv').then(data => {
  data.forEach(d => d.population = d.population * 1000)
  console.log(data);
  render(data)
})