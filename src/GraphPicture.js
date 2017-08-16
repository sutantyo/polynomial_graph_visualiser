import React from 'react';
import * as d3 from 'd3';

//import { select } from 'd3-selection';
import CurvePicture from './CurvePicture';

class GraphPicture extends React.Component {
  constructor(){
    super();
    this.drawGraph = this.drawGraph.bind(this);
    this.svg_height = 800;
    this.svg_width = 960;
  }

  componentWillMount(){
    let graph = createGraph(this.props.parameters.m,
                            this.props.parameters.lambda,
                            this.props.parameters.a,
                            this.props.parameters.b,
                            this.props.parameters.modulo);
    this.nodes = graph.nodes;
    this.links = graph.links;
    this.points = graph.points;
  }

  componentDidMount(){
    this.drawGraph();
  }

  componentDidUpdate(){
    d3.select(this.graph).selectAll('*').remove();
    let graph = createGraph(this.props.parameters.m,
                            this.props.parameters.lambda,
                            this.props.parameters.a,
                            this.props.parameters.b,
                            this.props.parameters.modulo);
    this.nodes = graph.nodes;
    this.links = graph.links;
    this.points = graph.points;
    console.log(this.points);

    this.drawGraph();
  }

  drawGraph(){
    const graph = this.graph;

    var simulation = d3.forceSimulation()
    .force("link",d3.forceLink().id(function(d){ return d.id;}).distance(200).strength(0.01))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(this.svg_width/2,this.svg_height/2))
    .on("tick", ticked)

    simulation
    .nodes(d3.values(this.nodes))

    simulation
    .force("link")
    .links(this.links)
    //.size([width, height])
    //.charge(-300)

      d3.select(graph).call(d3.drag().container(graph)
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

      function dragsubject() {
        return simulation.find(d3.event.x, d3.event.y);
      }

      function dragstarted() {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d3.event.subject.fx = d3.event.subject.x;
        d3.event.subject.fy = d3.event.subject.y;
      }

      function dragged() {
        d3.event.subject.fx = d3.event.x;
        d3.event.subject.fy = d3.event.y;
      }

      function dragended() {
        if (!d3.event.active) simulation.alphaTarget(0);
        d3.event.subject.fx = null;
        d3.event.subject.fy = null;
      }


// build the arrow.
  d3.select(graph).append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
  .enter().append("marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 30)
    .attr("refY", 1)
    .attr("markerWidth", 5)
    .attr("markerHeight", 5)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

// add the links and the arrows
var path = d3.select(graph).append("svg:g").selectAll("path")
    .data(this.links)
  .enter().append("svg:path")
//    .attr("class", function(d) { return "link " + d.type; })

    path.attr("class", "link")
        .attr("marker-end", "url(#end)")
        .style("fill","none")
        .style("stroke","#666")
        .style("stroke-width","1.5px")


    // define the nodes
    var node = d3.select(graph).selectAll(".node")
      .data(this.nodes)
      .enter().append("g")
      .attr("class", "node")

    // add the nodes
    node.append("circle")
        .attr("r", 14)
        .style("fill","#ccc")
        .style("stroke","#fff")
        .style("stroke-width","1.5px")

    // add the label
    node.append("text")
        .attr("x", 0)
        .attr("y", 5)
        .attr("text-anchor","middle")
        .text(function(d) { return d.id; })
        .style("fill","#000")
        .style("font","14px sans-serif")
        .style("pointer-events: none")

// add the curvy lines
    function ticked() {
      path
        .attr("d", function(d) {
          let x1 = d.source.x,
              y1 = d.source.y,
              x2 = d.target.x,
              y2 = d.target.y,
              dx = x2 - x1,
              dy = y2 - y1,
              dr = Math.sqrt(dx * dx + dy * dy),

              drx = 2*dr,
              dry = 2*dr,
              xRotation = 0,
              largeArc = 0,
              sweep = 0;

          if (d.source.x === d.target.x && d.source.y === d.target.y){
              xRotation = 40;
              largeArc = 1;
              drx = 18;
              dry = 18;
              sweep = 0;
              x2 = x2-5;
              y2 = y2-1;
          }
          return "M" + x1 + "," + y1 +
            "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " +
            x2 + "," + y2;
      })
        .style("stroke",function(d){ return d.colour});

      node
          .attr("transform", function(d) {
    	    return "translate(" + d.x + "," + d.y + ")"; });
      }

 }

  render(){
    let mx = "";
    if (this.props.parameters.m > 0)
      mx = mx + "x<sup>" + this.props.parameters.m + "</sup>";

    let lx = this.props.parameters.lambda;

    let ax = "";
    if (this.props.parameters.a === 1)
      ax = " + x";
    if (this.props.parameters.a > 1)
      ax = " + " + this.props.parameters.a+ "x";

    let bx = "";
    if (this.props.parameters.b > 0)
      bx = " + " + this.props.parameters.b;

    let mod = " modulo " + this.props.parameters.modulo;


    return (
      <div>
        <h2> Graph Visualiser </h2>
        <div> y<sup>2</sup> = <span dangerouslySetInnerHTML={{__html:mx}}></span>{ax}{bx}{mod}
        </div>
        <br />
        <div> {lx}y<sup>2</sup> = <span dangerouslySetInnerHTML={{__html:mx}}></span>{ax}{bx}{mod}
        </div>
        <svg ref={graph => this.graph = graph} width={this.svg_width} height={this.svg_height}>
        </svg>
        <CurvePicture points={this.points} parameters={this.props.parameters}>
        </CurvePicture>
      </div>
    )
  }
}

let square_of = [];
let square_root_of = [];
let inverse_of = [];

// The following function creates the graph for the equation
//          y^2 = x^3 + b*x + a           (mod p)
//  \lambda y^2 = x^3 + b*x + a  (mod p)
// where lambda is a quadratic nonresidue
// Thus the parameters for this function are m, n, lambda, b, a, and the modulus p
function createGraph(m,lambda,a,b,p){

  // compute the square_of table
   for (let i = 0; i <= (p-1)/2; i++){
     square_of[i] = (i * i) % p;
     square_of[p-i] = square_of[i];
   }

   // compute the root_of table (set square root of quadratic nonresidues to -1)
   for (let i = 0; i < p; i++){
     square_root_of[i] = -1;
   }
   for (let i = 0; i <= (p-1)/2; i++){
     square_root_of[square_of[i]] = i;
   }

   // finding inverses (for lambda) ... in a stupid way
   inverse_of[0] = 0;
   for (let i = 1; i < p; i++){
     for (let j = 1; j < p; j++){
       if ((i * j) % p === 1){
         inverse_of[i] = j;
         break;
       }
     }
   }

  // create the nodes for the graph (i.e. 0 to p-1)
  let nodes = [];
  for (let x = 0; x < p; x++){
    nodes.push({id:x});
  }
  // create the links between the nodes
  let links = [];
  let points = new Set();
  for (let x = 0; x < p; x++){
    // compute rhs = x^m + ax + b
    let rhs = 1;
    for (let exp = 0; exp < m; exp++){
        rhs = (rhs * x) % p;
    }
    rhs = (rhs + a*x + b)%p;
    // if rhs is a quadratic nonresidue, multiply by inverse of lambda
    let edge_colour = "gray";
    if (square_root_of[rhs] === -1){
        rhs = (inverse_of[lambda] * rhs)%p;
        edge_colour = "orange";
    }

    //console.log("rhs is " + rhs);
    let y1 = square_root_of[rhs];
    //console.log("added x: " + x + ", y1: " + y1);
    links.push({source:x,target:y1,colour:edge_colour});
    // compute y1 = lambda * x^n + bx + a mod p
    let y2 = (p - y1) % p;
    //console.log("added x: " + x + ", y2: " + y2);
    links.push({source:x,target:y2,colour:edge_colour});

    points.add([x,y1]);
    points.add([x,y2]);
  }
  /*
  console.log("m: " + m + ", lambda: " + lambda + ", a: " + a + ", b: " + b + ",p: " + p);
  console.log("inverse of lambda: " + inverse_of[lambda]);
    console.log(links);
    */
  return {nodes: nodes, links: links, points: points};
}
/* Deactivated code
// The following function creates the graph for the equation
//  y^m = x^n + b*x + a           (mod p)
//  y^m = lambda * x^n + b*x + a  (mod p)
// where lambda is a quadratic nonresidue
// Thus the parameters for this function are m, n, lambda, b, a, and the modulus p
function createGraph(m,lambda,b,a,p){
  //console.log("m: " + m + ", lambda: " + lambda + ", b: " + b + ", a: " + a + ",p: " + p);
  // create the nodes for the graph (i.e. 0 to p-1)
  let nodes = [];
  for (let x = 0; x < p; x++){
    nodes.push({id:x});
  }
  // create the links between the nodes
  let links = [];
  for (let x = 0; x < p; x++){
    // compute rhs = x^n
    let rhs = 1;
    for (let exp = 0; exp < m; exp++){
      rhs = (rhs * x) % p;
    }
    // compute y1 = x^n + bx + a mod p
    let y1 = (rhs + b*x + a) % p;
    links.push({source:x,target:y1,colour:"gray"})
    // compute y1 = lambda * x^n + bx + a mod p
    let y2 = (lambda * rhs + b*x + a) % p;
    links.push({source:x,target:y2,colour:"orange"})
  }
  return {nodes: nodes, links: links};
}
*/

export default GraphPicture;
