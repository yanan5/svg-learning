import * as d3 from "d3";
import * as topojson from "topojson-client";

const {feature} = topojson;
const { select, json, geoPath, geoMercator, geoOrthographic,  } = d3;

const svg = select('svg');
const projection = geoOrthographic();
const pathGenerator = geoPath().projection(projection)
svg.append('path')
  .attr('class', 'sphere')
  .attr('d', pathGenerator({
    type: "Sphere"
  }))
json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
  .then(data => {
    const countries = feature(data, data.objects.countries)

    const pathsUpdateSelection = svg
      .selectAll('path')
      .data(countries.features)

    const pathsEnterSelection = pathsUpdateSelection.enter()

    pathsEnterSelection
      .append('path')
      .attr('class', 'countries')
      .attr('d', pathGenerator)
  })