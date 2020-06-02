import * as d3 from "d3";

const {
  select,
  scaleLinear,
  scaleTime,
  extent,
  axisLeft,
  csv,
  axisBottom,
  area,
  curveBasis,
  format,
  max
} = d3;

const svg = select("svg");

const TITLE = 'World Population Area Chart'
const width = +svg.attr("width");
const height = +svg.attr("height");
const xValue = (d) => d.year;
const xAxisLabel = 'Year';
const yValue = (d) => d.population;
const yAxisLabel = 'Population';
const margin = { top: 30, right: 20, bottom: 70, left: 90 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const circleRadius = 5
const render = (data) => {
  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain([0 ,max(data, yValue)])
    .range([innerHeight,0])
    .nice()
  
  const yAxisTickFormat = number => format(".1s")(number).replace("G", 'B')

  const yAxis = axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10)    
    .tickFormat(yAxisTickFormat)
  

  const xAxis = axisBottom(xScale)
    .ticks(6)
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

    const areaGenerator = area()
     .x((d) => xScale(xValue(d)))
     .y0(innerHeight)
     .y1(d => yScale(yValue(d)))
     .curve(curveBasis)
    
    g.append('path')
      .attr('class', 'line-path')
      .attr('d', areaGenerator(data))
    
  svg.append('text')
    .text(TITLE)    
      .attr('class', 'title')
      .attr('x', width/2)
      .attr('y', 25);
};
csv("./data/world-population-by-year-2015.csv").then((data) => {
  data.forEach(d => {
    d.population = +d.population;
    d.year = new Date(d.year)
  });
  render(data)
});

// https://vizhub.com/curran/datasets/world-population-by-year-2015.csv