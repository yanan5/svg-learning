import * as d3 from "d3";
const { select, range, scaleOrdinal } = d3;

const SVG = select("svg");
const WIDTH = +SVG.attr("width");
const HEIGHT = +SVG.attr("height");
const colorScale = scaleOrdinal()
  .domain(['apple', 'lemon'])
  .range(['#BD2D28', '#F2DA57'])
const radiusScale = scaleOrdinal()
  .domain(['apple', 'lemon'])
  .range([50, 30])
const render = (selection, { data }) => {
  const UPDATE_SELECTION = selection.selectAll("circle").data(data);
  const ENTER_SELECTION = UPDATE_SELECTION.enter();
  const EXIT_SELECTION = UPDATE_SELECTION.exit();
  // make an enter selection
  ENTER_SELECTION
    .append("circle")
      .attr("cx", (d, i) => i * 120 + 60)
      .attr("cy", 50)
    .merge(UPDATE_SELECTION)
      .attr("fill", d => colorScale(d.type))
      .attr("r", d => radiusScale(d.type));

  EXIT_SELECTION
    .remove();
};
const makeFruit = (type) => ({ type });

const fruits = range(5).map(() => makeFruit("apple"));
render(SVG, { data: fruits });
setTimeout(() => {
  // remove on apple
  fruits.pop();
  render(SVG, { data: fruits });
}, 1000);

setTimeout(() => {
  // remove on apple
  fruits[2].type = 'lemon';
  render(SVG, { data: fruits });
}, 2000);
