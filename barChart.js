import * as d3 from "d3";

const {
  select,
  scaleLinear,
  max,
  scaleBand,
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
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);

  const xAxisTickFormat = (number) => format(".3s")(number).replace("G", "B");

  const yAxis = axisLeft(yScale);
  const xAxis = axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .call(yAxis)
    .selectAll(".domain, .tick line")
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

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(yValue(d)))
    .attr("width", (d) => xScale(xValue(d)))
    .attr("height", yScale.bandwidth());

  g.append('text')
    .text('Top 10 most populous countries')    
      .attr('class', 'title')
      .attr('y', -5);
};
csv("./data/population.csv").then((data) => {
  data.forEach((d) => (d.population = d.population * 1000));
  console.log(data);
  render(data);
});
