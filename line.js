import * as d3 from "d3";
import { curveBasis } from "d3";

const {
  select,
  scaleLinear,
  scaleTime,
  extent,
  axisLeft,
  csv,
  axisBottom,
  line,
  curveBasis
} = d3;

const svg = select("svg");

const TITLE = 'A Week in San Francisco'
const width = +svg.attr("width");
const height = +svg.attr("height");
const xValue = (d) => d.timestamp;
const xAxisLabel = 'Time';
const yValue = (d) => d.temperature;
const yAxisLabel = 'Temperature';
const margin = { top: 30, right: 20, bottom: 70, left: 90 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const circleRadius = 5
const render = (data) => {
  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight,0])
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

    const lineGenerator = line()
      .x((d) => xScale(xValue(d)))
      .y((d) => yScale(yValue(d)))
      .curve(curveBasis)
    
    g.append('path')
      .attr('class', 'line-path')
      .attr('d', lineGenerator(data))
    
    // g.selectAll("circle")
    //   .data(data)
    //   .enter()
    //   .append("circle")
    //   .attr("cy", (d) => yScale(yValue(d)))
    //   .attr("cx", (d) => xScale(xValue(d)))
    //   .attr("r", circleRadius);

  g.append('text')
    .text(TITLE)    
      .attr('class', 'title')
      .attr('y', -5);
};
csv("./data/temperature-in-san-francisco.csv").then((data) => {
  data.forEach(d => {
    d.temperature = +d.temperature;
    d.timestamp = new Date(d.timestamp)
  });
  render(data)
});

// https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv