import * as d3 from "d3";
import * as topojson from "topojson-client";

const {feature} = topojson;
const { select, json, geoPath, zoom, tsv, geoNaturalEarth1 } = d3;

const svg = select('svg');
const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection)
svg.append('path')
  .attr('class', 'sphere')
  .attr('d', pathGenerator({
    type: "Sphere"
  }))

svg.call(zoom().on('zoom', () => {
  console.log('zoom')
}))

Promise.all([
  tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
  json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
])
.then(([tsvData, topoJSONData]) => {  
  const countryName = {};
  tsvData.forEach(d => {
    countryName[d.iso_n3] = d.name
  });
  renderMap(topoJSONData,countryName)
})

const renderMap = (data, countryLookUp) => {
    const countries = feature(data, data.objects.countries)

    const pathsUpdateSelection = svg
      .selectAll('path')
      .data(countries.features)

    const pathsEnterSelection = pathsUpdateSelection.enter()

    pathsEnterSelection
      .append('path')
        .attr('class', 'country')
        .attr('d', pathGenerator)
      .append('title')
        .text(d => countryLookUp[d.id])
  }