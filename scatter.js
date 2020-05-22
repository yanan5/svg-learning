import * as d3 from "d3";

const {
  select,
  scaleLinear,
  max,
  extent,
  axisLeft,
  csv,
  axisBottom,
  format,
} = d3;

const svg = select("svg");

const TITLE = 'Cars'
const width = +svg.attr("width");
const height = +svg.attr("height");
const xValue = (d) => d.horsepower;
const xAxisLabel = 'Horsepower';
const yValue = (d) => d.weight;
const yAxisLabel = 'Weight';
const margin = { top: 30, right: 20, bottom: 70, left: 90 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const circleRadius = 10
const render = (data) => {
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice()

  const yAxis = axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);
    
  const xAxis = axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(15);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const yAxisG = g.append("g")
    .call(yAxis)
    
    yAxisG
      .select(".domain")
        .remove();
  
   yAxisG.append('text')
    .attr("transform", 'rotate(-90)')
    .text(yAxisLabel)    
    .attr('class', 'axis-label')
    .attr('fill','#000')
    .attr('text-anchor', 'middle')
    .attr('x', -innerHeight/2)
    .attr('y', -60)

  const xAxisG = g.append("g")
    .call(xAxis)
    .attr("transform", `translate(0, ${innerHeight})`)
    
    xAxisG.select(".domain")
      .remove()
  
    xAxisG.append('text')
      .text(xAxisLabel)
      .attr('class', 'axis-label')
      .attr('fill','#000')
      .attr('x', innerWidth/2)
      .attr('y', margin.bottom - 7)

  g.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("r", circleRadius);

  g.append('text')
    .text(TITLE)    
      .attr('class', 'title')
      .attr('y', -5);
};
csv("https://vizhub.com/curran/datasets/auto-mpg.csv").then((data) => {
  data.forEach(d => {
    d.acceleration = +d.acceleration;
    d.cylinders = +d.cylinders;
    d.displacement = +d.displacement;
    d.horsepower = +d.horsepower;
    d.mpg = +d.mpg;
    d.weight = +d.weight;
    d.year = +d.year;
  });
  render(data)
});

