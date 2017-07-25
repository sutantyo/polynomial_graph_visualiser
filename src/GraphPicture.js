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
    test();
    this.test();
    console.log(this.props.modulo);
    console.log(this.props.a);

    this.nodes = [
      {"id": "0", "name": "0"},
      {"id": "1", "name": "1"},
      {"id": "2", "name": "2"},
      {"id": "3", "name": "3"},
      {"id": "4", "name": "4"}
    ]
    this.links = [
      {"source": "0", "target": "1"},
      {"source": "0", "target": "2"},
      {"source": "0", "target": "3"},
      {"source": "4", "target": "1"}
    ];
  }

  test(){
    console.log("Another test");
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
    .force("link",d3.forceLink().id(function(d){ return d.id;}))
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
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
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
    .call(d3.drag);

// add the nodes
node.append("circle")
    .attr("r", 5)
    .style("fill","#ccc")
    .style("stroke","#fff")
    .style("stroke-width","1.5px")

// add the text
node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; })
    .style("fill","#000")
    .style("font","10px sans-serif")
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
        <h2> Graph picture goes here </h2>
        a is {this.props.a}
        mod is {this.props.modulo}
        <svg ref={graph => this.graph = graph} width={this.svg_width} height={this.svg_height}>
        </svg>
      </div>
    )
  }
}

let squares = [];
function test(){
  console.log("Tested");
}

export default GraphPicture;
