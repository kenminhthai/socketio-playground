/**
 * The entry point
 */
import App from "./app";
const content = document.querySelector("body");
const app = new App(content);
app.render();

// window.addEventListener("load", () => {

//   // A very simple component setup

//   // Render the time every 1s
//   setInterval(() => {
//     app.render();
//   }, 1000);
// });

// if (module.hot) {
//   module.hot.dispose();
//   module.hot.accept("./app", () => {
//     let nextApp = App;
//     nextApp.render();
//     nextApp = app;
//   });
// }
