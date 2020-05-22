import * as d3 from "d3";
const arc = d3.arc();
const svg = d3.select("svg");
const width = parseFloat(svg.attr("width"));
const height = parseFloat(svg.attr("height"));
const eyeXOffset = 160;
const eyeYOffset = -70;
const eyeRadius = 30;
const eyeBrowWidth = 70;
const eyeBrowHeight = 15;
const eyeBrowYOffset = 60;

const g = svg
  .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

const circle = g
  .append("circle")
    .attr("r", height / 2)
    .attr("fill", "yellow")
    .attr("stroke", "#000");

const eyes = g
  .append("g")
    .attr("transform", `translate(0, ${eyeYOffset})`);

const leftEye = eyes
  .append("circle")
  .attr("r", eyeRadius)
  .attr("cx", -eyeXOffset);

const rightEye = eyes
  .append("circle")
    .attr("r", eyeRadius)
    .attr("cx", eyeXOffset);

const eyeBrow = eyes
  .append("g")
    .attr("transform", `translate(0, ${-eyeBrowYOffset})`);

eyeBrow
  .transition().duration(2000)
    .attr("transform", `translate(0, ${-eyeBrowYOffset - 35})`) 
  .transition().duration(2000)
    .attr("transform", `translate(0, ${-eyeBrowYOffset})`);

const leftEyeBrow = eyeBrow
  .append("rect")
    .attr("x", -eyeXOffset - eyeBrowWidth / 2)
    .attr("width", eyeBrowWidth)
    .attr("height", eyeBrowHeight);

const rightEyeBrow = eyeBrow
  .append("rect")
    .attr("x", eyeXOffset - eyeBrowWidth / 2)
    .attr("width", eyeBrowWidth)
    .attr("height", eyeBrowHeight)

const mouth = g
  .append("path")
    .attr("d",arc({
        innerRadius: 150,
        outerRadius: 170,
        startAngle: Math.PI / 2,
        endAngle: (Math.PI * 3) / 2,
      })
    );
