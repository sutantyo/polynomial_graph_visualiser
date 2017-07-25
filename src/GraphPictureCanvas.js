import React from 'react';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

class GraphPicture extends React.Component {
  constructor(){
    super();
    this.createGraph = this.createGraph.bind(this);
    this.state = {

    }
  }

  componentDidMount(){
    this.createGraph();
  }

  componentDidUpdate(){
    this.createGraph();
  }

  createGraph(){
    const graph = this.graph;
    const nodes = [
      {"id": "0"},
      {"id": "1"}
    ]
    const links = [
      {"source": "0", "target": "1"}
    ];
    let context = graph.getContext("2d")
    let width = graph.width;
    let height = graph.height;

    let simulation = d3.forceSimulation()
      .force("link",d3.forceLink().id(function(d){ return d.id;}))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width/2,height/2));


    simulation
      .nodes(nodes)
      .on("tick",ticked)

    simulation.force("link")
      .links(links)

      d3.select(graph)
    .call(d3.drag()
        .container(graph)
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    function ticked() {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);

      context.beginPath();
      links.forEach(drawLink);
      context.strokeStyle = "#aaa";
      context.stroke();

      context.beginPath();
      nodes.forEach(drawNode);
      context.fill();
      context.strokeStyle = "#fff";
      context.stroke();

      context.restore();
    }

    function dragsubject() {
      return simulation.find(d3.event.x, d3.event.y);
    }

    function drawLink(d) {
      context.moveTo(d.source.x, d.source.y);
      context.lineTo(d.target.x, d.target.y);
    }

    function drawNode(d) {
      context.moveTo(d.x + 3, d.y);
      context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
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

    /*
    select(graph)
      .selectAll()

     select(node)
        .selectAll('rect')
        .data(this.props.data)
        .style('fill', '#fe9922')
        .attr('x', (d,i) => i * 25)
        .attr('y', d => this.props.size[1] - yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', 25)
        */

 }



  render(){
    return (
      <div>
        <h2> Graph picture goes here </h2>
        a is {this.props.a}
        mod is {this.props.modulo}
        <canvas ref={graph => this.graph = graph} width={500} height={500}>
        </canvas>
      </div>
    )
  }
}

export default GraphPicture;
