import * as d3 from "d3";
const { select, range, scaleOrdinal } = d3;

const SVG = select("svg");
const WIDTH = +SVG.attr("width");
const HEIGHT = +SVG.attr("height");
const colorScale = scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#BD2D28", "#F2DA57"]);
const radiusScale = scaleOrdinal().domain(["apple", "lemon"]).range([50, 30]);
const render = (selection, { data }) => {
  const UPDATE_SELECTION = selection
    .selectAll("circle")
    .data(data, (d) => d.id);
  const ENTER_SELECTION = UPDATE_SELECTION.enter();
  const EXIT_SELECTION = UPDATE_SELECTION.exit();
  // make an enter selection
  ENTER_SELECTION
    .append("circle")
      .attr("cx", (d, i) => i * 120 + 60)
      .attr("cy", 50)
      .attr("r", 0)
    .merge(UPDATE_SELECTION)
      .attr("fill", (d) => colorScale(d.type))
    .transition().duration(1000)
      .attr("r", (d) => radiusScale(d.type))
      .attr("cx", (d, i) => i * 120 + 60)

  EXIT_SELECTION.transition().duration(1000).attr("r", 0).remove();

  // const UPDATE_TEXT = selection.selectAll("text").data(data, d => d.id);
  // const ENTER_TEXT = UPDATE_TEXT.enter();
  // const EXIT_TEXT = UPDATE_TEXT.exit();
  //   // make an enter selection
  //   ENTER_TEXT
  //     .append("text")
  //       .attr("x", (d, i) => i * 120 + 60)
  //       .attr("y", 50)
  //     .merge(UPDATE_TEXT)
  //     .transition().duration(1000)
  //       .attr("x", (d, i) => i * 120 + 60)
  //       .text(d => d.type)

  //   EXIT_TEXT
  //     .transition().duration(1000)
  //     .remove();
};
const makeFruit = (type) => ({ type, id: Math.random() });

let fruits = range(5).map(() => makeFruit("apple"));
render(SVG, { data: fruits });
setTimeout(() => {
  // remove on apple
  fruits.pop();
  render(SVG, { data: fruits });
}, 1000);

setTimeout(() => {
  // remove on apple
  fruits[2].type = "lemon";
  render(SVG, { data: fruits });
}, 2000);

setTimeout(() => {
  // remove on apple
  fruits = fruits.filter((d, i) => i !== 1);
  render(SVG, { data: fruits });
}, 3000);
