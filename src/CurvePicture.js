import React from 'react';
import * as d3 from 'd3';
//import { select } from 'd3-selection';

class CurvePicture extends React.Component {
  constructor(){
    super();
    this.drawCurve = this.drawCurve.bind(this);
    this.svg_height = 700;
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
    d3.select(this.curve).selectAll('*').remove();
    /*
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

    let points = this.props.points;
    let edges = [];
    for (let point of points){
      let x1 = parseInt(point.split(',')[0]);
      let y1 = parseInt(point.split(',')[1]);
      for (let pt of points){
        let x2 = parseInt(pt.split(',')[0]);
        let y2 = parseInt(pt.split(',')[1]);
        if (y1 == x2){
          edges.push([x1,y1,x2,y2]);
        }
      }
    }
    console.log(edges);

    let modulo = this.props.parameters.modulo;
    const curve = this.curve;
    let xScale = d3.scaleLinear().domain([0,modulo-1]).range([0, 3/4*this.svg_width]);
    let xAxis = d3.axisBottom(xScale).ticks(modulo-1);

    let yScale = d3.scaleLinear().domain([modulo-1,0]).range([0, 3/4*this.svg_height]);
    let yAxis = d3.axisLeft(yScale).ticks(modulo-1);

    d3.select(curve).append('g')
        .attr('class','x axis')
        .attr("transform", "translate(40," + (3/4*this.svg_height+20) + ")")
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
        .attr("transform", "translate(40,20)")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Protein (g)");


  d3.select(curve).append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
    .enter().append("marker")    // This section adds in the arrows
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 5)
        .attr("refY", 0)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("orient", "auto")
        .attr("stroke-width",1)
      .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("class","arrowhead");

        /*
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
            */

    d3.select(curve).append('svg:g').attr('class','edges')
      .selectAll('path')
      .data(edges)
      .enter()
      .append('path')
      /*
      .attr("x1",function(d){return xScale(d[0])+40})
      .attr("y1",function(d){return yScale(d[1])+20})
      .attr("x2",function(d){return 40 + xScale(d[2]) - 10*posVal(d[2],d[0]) })
      .attr("y2",function(d){return 20 + yScale(d[3]) + 4*posVal(d[3],d[1]) })
      */
      .attr("d", function(d){
        let x1 = xScale(d[0])+40;
        let y1 = yScale(d[1])+20;
        let x2 = (40 + xScale(d[2]) - 10*posVal(d[2],d[0]));
        let y2 = (20 + yScale(d[3]) +  4*posVal(d[3],d[1]));
        let dx = x2 - x1;
        let dy = y2 - y1;
        let dr = Math.sqrt(dx * dx + dy * dy);

        let drx = 2*dr;
        let dry = 2*dr;

        let ln =  "M" + x1 + "," + y1 +
            "A" + drx + "," + dry + " " + 0 + "," + 0 + "," + 0 + " " +
            x2 + "," + y2;
        console.log(ln);
        return ln;
      })

      .attr("marker-end","url(#arrow)")
      .attr("stroke-width",1)
      .attr("stroke","gray")
      .attr("fill","none")
      /*
      .attr({
        'x1': function(d){ return xScale(d[0])},
        'y1': function(d){ return yScale(d[1])},
        'x2': function(d){ return xScale(d[2])},
        'y2': function(d){ return yScale(d[3])}
      });
      */


    console.log(this.props.points);
    d3.select(curve).append("svg:g").attr("class","points")
      .selectAll("circle")
      .data(Array.from(this.props.points))
      .enter()
      .append("circle")
      .attr("cx",function(d){
            return(xScale(parseInt(d.split(',')[0]))+40)
          })
      .attr("cy",function(d){
            return(yScale(parseInt(d.split(',')[1]))+20)
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
        <svg ref={curve => this.curve = curve} width={this.svg_width} height={this.svg_height}>
      </svg>
    )
  }

}

function posVal(a, b){
  if (a - b > 0)
    return 1;
  else if (a - b < 0)
    return -1;
  else
    return 0;
}

export default CurvePicture;
