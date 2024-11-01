module.exports = require("openmrs/default-webpack-config");
// const config = require("openmrs/default-webpack-config");
//
// config.scriptRuleConfig.exclude = /node_modules(?![\/\\]@openmrs)/;
//
// config.rules = [
//   {
//     test: /\.m?js$/,
//     exclude: /(node_modules)/,
//     use: {
//       loader: "swc-loader",
//       options: {
//         parseMap: true,
//       },
//     },
//   },
//   {
//     test: /\.css$/,
//     use: ["style-loader", "css-loader"],
//   },
// ];
//
// // config.cssRuleConfig.rules = [
// //   {
// //     test: /\.css$/,
// //     use: ["style-loader", "css-loader"],
// //   },
// // ];
// // this is a CommonJS module
// module.exports = config;
