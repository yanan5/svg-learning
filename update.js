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
  const UPDATE_GROUP = selection.selectAll("g").data(data, (d) => d.id);
  const ENTER_GROUP = UPDATE_GROUP.enter();
  const EXIT_GROUP = UPDATE_GROUP.exit();

  const g = ENTER_GROUP.append("g")  
  .attr("transform", (d, i) => `translate(0,0)`)
   
  g.merge(UPDATE_GROUP)
    .transition().delay(100)
    .attr("transform", (d, i) => `translate(${i * 120 + 60}, 50)`)
  // make an enter selection
  g.append("circle")
    .merge(UPDATE_GROUP.select("circle"))
    .transition().delay(500)
    .attr("fill", (d) => colorScale(d.type))
    .attr("r", (d) => radiusScale(d.type));

  // make an enter selection
  g.append("text")
    .merge(UPDATE_GROUP.select("text"))
    .transition().delay(500)
    .attr("y", 75)
    .text((d) => d.type);

  EXIT_GROUP.transition().remove();
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
