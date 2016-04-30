var n = 10;
var dataset = [];
for (var i = 0; i < n; i++) {
  dataset.push((Math.random() * 25) + 5);
}
var width = 500;
var height = 500;

var svg = d3.select('body').append('svg'); // svg refers to container
svg.attr('width', width).attr('height', height);

var circles = svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle');

circles.attr('cx', function(d, i) {
  return (i * 50) + 25;
})
  .attr('cy', height / 2)
  .attr('r', function(d) {
    return d;
  });

setInterval(function() { 
  circles.each(function() {
    d3.select(this).transition().attr('cx', Math.random() * 500)
    .attr('cy', Math.random() * 500)
    .duration(500);
  }); 
}, 500);

var movement = function() {

};


var ellipse = svg.append('ellipse')
                .attr('cx', 250)
                .attr('cy', 250)
                .attr('rx', 25)
                .attr('ry', 10)
                .attr('fill', 'red');

// creates a drag FUNCTION
var drag = d3.behavior.drag()
          .origin(function(d) {
            console.log(d);
            return d;
          })
          .on('drag', dragMove);

var dragMove = function (d) {
  d3.select(this)
    .attr("cx", d.x)
    .attr("cy", d.y);
};

// console.log(drag);

// drag.on('drag', function() {
//   ellipse.attr('rx', this.loc)
// })


// selection.on('dragstart', function () 

