class Route extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("RouteTemp");
    const templateContent = template.content;

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(templateContent.cloneNode(true));

    this.routeNodes;
  }
  // function to set the background image
  setBack = function (imgSource) {
    this.shadowRoot.getElementById("back_img").src = imgSource;
  };
  // function to set the route
  setRoute = function (routeNodes) {
    this.routeNodes = routeNodes;
    this.drawRoute();
  };
  // function to draw the nodes of the route
  drawRoute = function () {
    // loop through all the nodes
    for (let i = 0; i < this.routeNodes.length; i++) {
      // create a new element for each node
      let routePoint = document.createElement("div");
      // add the class
      routePoint.classList.add("route_point");
      // set a title
      routePoint.title = this.routeNodes[i].title;
      // set an index in the dataset
      routePoint.dataset.index = i;
      // set the position
      routePoint.style.left = `${this.routeNodes[i].position.x}%`;
      routePoint.style.top = `${this.routeNodes[i].position.y}%`;
      // create a drawevent
      let drawEvent = (event) =>
        this.showData(event, this.routeNodes[i], this.routeNodes.length, i);
      // call the drawevent every time a node is clicked
      routePoint.addEventListener("click", drawEvent);
      // append the node to the route overlay
      this.shadowRoot.getElementById("nodes_overlay").appendChild(routePoint);
    }
  };
  // function to show the overlay and the data of the specified node
  showData = function (e, path, pathLength, index) {
    // define the overlay
    let overlay = this.shadowRoot.getElementById("overlay");
    // set the title of the overlay
    overlay.querySelector("#img_title").textContent = path.title;
    overlay.querySelector("#node_img").src = path.image;
    overlay.classList.add("open");

    // onclick events
    overlay.querySelector("button.arrow_prev").onclick = () =>
      this.change(Number(index) - 1);
    overlay.querySelector("button.arrow_next").onclick = () =>
      this.change(Number(index) + 1);
    overlay.querySelector("#close").onclick = () =>
      overlay.classList.remove("open");

    // check for the index
    overlay.querySelector(".arrow_prev").removeAttribute("hidden");
    overlay.querySelector(".arrow_next").removeAttribute("hidden");
    if (index == 0) {
      overlay.querySelector(".arrow_prev").setAttribute("hidden", "true");
    }
    if (index >= pathLength - 1) {
      overlay.querySelector(".arrow_next").setAttribute("hidden", "true");
    }
  };
  // function to change from node while the overlay is open
  change = function (newIndex) {
    this.shadowRoot
      .querySelectorAll("#nodes_overlay .route_point")
      [newIndex].click();
  };
}

window.customElements.define("route-element", Route);
