import React from 'react';
import * as d3 from 'd3';
//import { select } from 'd3-selection';

class GraphPicture extends React.Component {
  constructor(){
    super();
    this.drawGraph = this.drawGraph.bind(this);
    this.svg_height = 480;
    this.svg_width = 960;
  }

  componentWillMount(){
    let graph = createGraph(1,2,3,0,1,7);

    this.nodes = graph.nodes;
    this.links = graph.links;
  }

  componentDidMount(){
    this.drawGraph();
  }

  componentDidUpdate(){
    this.drawGraph();
  }

  drawGraph(){
    const graph = this.graph;

    var simulation = d3.forceSimulation()
    .force("link",d3.forceLink().id(function(d){ return d.id;}).distance(100))
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
    .attr("refY", -2.5)
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
      path.attr("d", function(d) {
          var dx = d.target.x - d.source.x,
              dy = d.target.y - d.source.y,
              dr = Math.sqrt(dx * dx + dy * dy);
            return "M" +
                d.source.x + "," +
                d.source.y + "A" +
                dr + "," + dr + " 0 0,1 " +
                d.target.x + "," +
                d.target.y;
            });

      node
          .attr("transform", function(d) {
    	    return "translate(" + d.x + "," + d.y + ")"; });
      }

 }


  render(){
    return (
      <div>
        <h2> Graph visualiser</h2>
        a is {this.props.a}
        mod is {this.props.modulo}
        <svg ref={graph => this.graph = graph} width={this.svg_width} height={this.svg_height}>
        </svg>
      </div>
    )
  }
}

let square_of = [];
let root_of = [];

// The following function creates the graph for the equation
//  y^m = x^n + b*x + a           (mod p)
//  y^m = lambda * x^n + b*x + a  (mod p)
// where lambda is a quadratic nonresidue
// Thus the parameters for this function are m, n, lambda, b, a, and the modulus p

function createGraph(m,n,lambda,b,a,p){

  // compute the square_of table
  for (let i = 0; i <= (p-1)/2; i++){
    square_of[i] = (i * i) % p;
    square_of[p-i] = square_of[i];
  }

  // compute the root_of table (set root to be -1 for quadratic nonresidues)
  for (let i = 0; i < p; i++){
    root_of[i] = -1;
  }
  for (let i = 0; i <= (p-1)/2; i++){
    root_of[square_of[i]] = i;
  }

  // these are the nodes for the graph (simply 0 to p-1)
  let nodes = [];
  for (let x = 0; x < p; x++){
    nodes.push({id:x});
  }


  // these are the links between the nodes
  let links = [];
  for (let x = 0; x < p; x++){

    // compute rhs = x^n + bx + a mod p
    let rhs = 1;
    for (let exp = 0; exp < n; exp++){
      rhs = (rhs * x) % p;
    }
    rhs = (rhs + b*x + a) % p

    // if rhs is not a quadratic residue, multiply by lambda
    if (root_of[rhs] === -1){
      rhs = (rhs * lambda) % p;
      let y1 = root_of[rhs];
      let y2 = (p - y1) % p;
      //console.log("red " + rhs +  " " + y1 + " " + y2);
      links.push({source:x,target:y1,colour:"red"})
      links.push({source:x,target:y2,colour:"red"})
    }
    else{
      let y1 = root_of[rhs];
      let y2 = (p - y1) % p;
      //console.log("black " + rhs + " " + y1 + " " + y2);
      links.push({source:x,target:y1,colour:"black"})
      links.push({source:x,target:y2,colour:"black"})
    }
  }

  /*
  links = [
    {source: 0, target: 1},
    {source: 0, target: 2},
    {source: 0, target: 3},
    {source: 4, target: 1}
  ];
  */
  console.log(links);
  return {nodes: nodes, links: links};
}

export default GraphPicture;
