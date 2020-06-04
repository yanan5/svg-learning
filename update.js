import * as d3 from "d3";
const { select, range, scaleOrdinal } = d3;

const SVG = select("svg");
const WIDTH = +SVG.attr("width");
const makeFruit = (type) => ({ type, id: Math.random() });
const HEIGHT = +SVG.attr("height");
let selected = null;

let fruits = range(5).map(() => makeFruit("apple"));
const colorScale = scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#BD2D28", "#F2DA57"]);
const radiusScale = scaleOrdinal()
  .domain(["apple", "lemon"])
  .range([50, 30]);
const onClickHandler = d => {
  selected = d.id;
  render(SVG, {data: fruits})
}
const render = (selection, { data }) => {
  const BOWL = selection
    .selectAll('rect')
    .data([null])
    .enter()
      .append('rect')
        .attr('y', 0)
        .attr('width', data.length * 123)
        .attr('height', 145)
        .attr('rx', 145 / 2)

  const UPDATE_GROUP = selection.selectAll("g").data(data, (d) => d.id);
  const ENTER_GROUP = UPDATE_GROUP.enter();
  const EXIT_GROUP = UPDATE_GROUP.exit();

  const g = ENTER_GROUP.append("g")  
  .attr("transform", (d, i) => `translate(0,0)`)
   
  g.merge(UPDATE_GROUP)
    .transition().delay(100)
    .attr("transform", (d, i) => `translate(${i * 120 + 60}, 60)`)
  // make an enter selection
  g.append("circle")
    .merge(UPDATE_GROUP.select("circle"))    
    .on('click', onClickHandler)
    .style('cursor', 'pointer')
    .attr('stroke', d => d.id === selected ? '#000' : 'none')
    .attr('stroke-width', 5)
    .transition().delay(500)    
    .attr("fill", (d) => colorScale(d.type))
    
    .attr("r", (d) => radiusScale(d.type))

  // make an enter selection
  g.append("text")
    .merge(UPDATE_GROUP.select("text"))
    .transition().delay(550)
    .attr("y", 75)
    .text((d) => d.type);

  EXIT_GROUP.transition().remove();
};

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
