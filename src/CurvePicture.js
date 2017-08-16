import React from 'react';
import * as d3 from 'd3';
//import { select } from 'd3-selection';

class CurvePicture extends React.Component {
  constructor(){
    super();
    this.drawCurve = this.drawCurve.bind(this);
    this.svg_height = 800;
    this.svg_width = 960;
  }

  componentWillMount(){
    /*
    let graph = createGraph(this.props.parameters.m,
                            this.props.parameters.lambda,
                            this.props.parameters.a,
                            this.props.parameters.b,
                            this.props.parameters.modulo);
    this.nodes = graph.nodes;
    this.links = graph.links;
    */
  }

  componentDidMount(){
    this.drawCurve();
  }

  componentDidUpdate(){
    /*
    d3.select(this.curve).selectAll('*').remove();
    let graph = createGraph(this.props.parameters.m,
                            this.props.parameters.lambda,
                            this.props.parameters.a,
                            this.props.parameters.b,
                            this.props.parameters.modulo);
    this.nodes = graph.nodes;
    this.links = graph.links;
    */
    this.drawCurve();
  }

  drawCurve(){
    console.log(this.props.points);
    let modulo = this.props.parameters.modulo;
    const curve = this.curve;
    let xScale = d3.scaleLinear().domain([0,modulo-1]).range([0, this.svg_width/2]);
    let xAxis = d3.axisBottom(xScale);

    let yScale = d3.scaleLinear().domain([0,modulo-1]).range([0, this.svg_height/2]);
    let yAxis = d3.axisLeft(yScale).ticks(modulo-1);

    d3.select(curve).append('g')
        .attr('class','x axis')
        .attr("transform", "translate(0," + this.svg_height/2 + ")")
        .call(xAxis)
        /*
      .append("text")
        .attr("class", "label")
        .attr("x", this.svg_height)
        .attr("y", -20)
        .style("text-anchor", "end")
        */

    d3.select(curve).append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Protein (g)");

    console.log(this.props.points);
    let curvePoints = d3.select(curve).append("svg:g").attr("class","points")
      .selectAll("circle")
      .data(Array.from(this.props.points))
      .enter()
      .append("circle")
      .attr("cx",function(d){
            return(xScale(d[0]))
          })
      .attr("cy",function(d){
            return(yScale(d[1]))
          })
      .attr("r",5)


    /*
    //curvePoints.selectAll("circle")
    d3.select(curve)
      .append("circle")
      .attr("cx",function(d){
            console.log(d);
            return 30;
          })
      .attr("cy",500)
      .attr("r",30)
      */

  }

  render(){
    return(
      <div>
        <svg ref={curve => this.curve = curve} width={this.svg_width} height={this.svg_height}>
      </svg>
    </div>
    )
  }

}

export default CurvePicture;
