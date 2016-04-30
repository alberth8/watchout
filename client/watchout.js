var n = 1;
var collisions = 0;
var dataset = [];
for (var i = 0; i < n; i++) {
  dataset.push((Math.random() * 25) + 5);
}
var width = 750; // cx
var height = 500; // cy

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
  }).attr('id', 'asteroid');

var drag = d3.behavior.drag()
          .on('drag', function () {
            d3.select(this)
            .attr('cx', (d3.event.x > width) ? width : ( (d3.event.x < 0) ? 0 : (d3.event.x) )) //d3.event.x is the x-value of the mouse
            .attr('cy', (d3.event.y > height) ? height : ( (d3.event.y < 0) ? 0 : (d3.event.y) )); 
          });

var ellipse = svg.append('ellipse')
                .attr('cx', width / 2)
                .attr('cy', height / 2)
                .attr('rx', 25)
                .attr('ry', 10)
                .attr('fill', 'red')
                .call(drag);

setInterval(function() { 
  circles.each(function() { // moving each circles to random positions
    d3.select(this)
    .transition()
    .tween('circle', function (data, index) {
      console.log(data);
      // var curX = Math.floor(this.attr('cx'));
      // var curY = Math.floor(this.attr('cy'));

      // // only update if circle has moved at least a pixel in x and y
      // // directions
      // if (Math.abs(this.attr('cx') - ellipse.attr('cx')) < 25 && Math.abs(this.attr('cy') - ellipse.attr('cy')) < 25) {
      //   collisions ++;
      // }
    })
    .attr('cx', Math.random() * width)
    .attr('cy', Math.random() * height)
    .duration(500);
  });
}, 500);

var tween = function () {
  // var lastX = 0;
  // var lastY = 0;
   
  // This function returned by tracker is what will execute at each 'tick'
  // in the transition animation
  return function() {

  };
};


// // selecting all 'circle' svg elements and tracking x-y coordinates
// setInterval(function() {
//   d3.selectAll('circle').each(function(d, i) {
//     var thing = d3.select(this);
//     if (thing.attr('id') === 'asteroid') {
//     // console.log('asteroid y-coord', thing.attr('cy') );
//     // console.log('ellipse y-coord', ellipse.attr('cy'));
//       if (Math.abs(thing.attr('cx') - ellipse.attr('cx')) < 25 && Math.abs(thing.attr('cy') - ellipse.attr('cy')) < 25) {
//         collisions++;
//         console.log(collisions);
//       }
//     }
//   });
// }, 100);