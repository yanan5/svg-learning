import * as d3 from "d3";

const {
  select,
  scaleLinear,
  max,
  scalePoint,
  axisLeft,
  csv,
  axisBottom,
  format,
} = d3;

const svg = select("svg");

const width = +svg.attr("width");
const height = +svg.attr("height");

const render = (data) => {
  const xValue = (d) => d.population;
  const yValue = (d) => d.country;
  const margin = { top: 30, right: 20, bottom: 50, left: 130 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth])
    .nice();

  const yScale = scalePoint()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.7);

  const xAxisTickFormat = (number) => format(".3s")(number).replace("G", "B");

  const yAxis = axisLeft(yScale)
    .tickSize(-innerWidth);
  const xAxis = axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .call(yAxis)
    .select(".domain")
    .remove();

  const xAxisG = g.append("g")
    .call(xAxis)
    .attr("transform", `translate(0, ${innerHeight})`)
    
    xAxisG.select(".domain")
      .remove()
  
    xAxisG.append('text')
      .text('Population')
      .attr('class', 'axis-label')
      .attr('fill','#000')
      .attr('x', innerWidth/2)
      .attr('y', margin.bottom - 5)

  g.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("r", 15);

  g.append('text')
    .text('Top 10 most populous countries')    
      .attr('class', 'title')
      .attr('y', -5);
};
csv("./data/population.csv").then((data) => {
  data.forEach((d) => (d.population = d.population * 1000));
  render(data);
});

