import node from "rollup-plugin-node-resolve";

export default {
  input: "index.js",
  output: {
    format: "iife",
    globals: "d3",
    file: "./d3.js",
  },
  plugins: [node({jsnext: true})],
};
