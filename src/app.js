import * as css from "./index.css";
import renderButtons from "./module1";
import Socket from "./socketBuilder";

export default class App {
  constructor(elem) {
    if (!elem) return;
    this.elem = elem;
    this.socket = new Socket("http://localhost:3001", {
      options: {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity
      }
    });
    this.loadModule = this.loadModule.bind(this);
    this.components = null;
  }

  loadModule(item) {
    return item;
  }

  render() {
    this.socket.on("connect", () => {
      console.log("Just connected to main server from client");
    });
    this.socket.on("sync", data => console.log(data));
    if (this.elem)
      this.elem.innerHTML = `
        <section data-component="app">
          <h1>Portal Component</h1>
          ${renderButtons()}
        </section>
        `;
  }
}
