$(window).load(function() {
  game.init();
  player.init();
});

var settings = {
  width: 750,
  height: 500,
  numEnemies: 20,
  score: 0,
  highScore: 0,
  collisions: 0,
  isHit: false,
  delay: 1000,
  svg: d3.select('#background').append('svg'), // svg refers to container
  size: 25
};

var game = {
  init: function() {
    game.createCircles();
    game.cycles();
  },

  createCircles: function() {
    var dataset = [];
    settings.svg.attr('width', settings.width).attr('height', settings.height);
    for (var i = 0; i < settings.numEnemies; i++) {
      dataset.push(settings.size);//(Math.random() * 1) + 5);
    }
    // creating enemies
    var circles = settings.svg.selectAll('image')
      .data(dataset)
      .enter() // select placehol ders that have a value but no key (yet)
      .append('svg:image'); // sets key 
    circles.attr('x', function(d, i) { // setting attributes for enemies
      return 25;//(i * 50) + 25;
    })
      .attr('y', settings.height / 2)
      // .attr('r', function(d) {
      //   return d;
      // })
      .attr('xlink:href', 'tony.png')
      .attr({'width': '75px', 'height': '75px'}); 
  },

  // update / tracking functions
  cycles: function() { 
    // moving enemies
    setInterval(function() { 
      // movement
      d3.selectAll('image').each(function() { // moving each circles to random positions
        d3.select(this)
        .transition() 
        .tween('image', function() { // tween calls during every point of transition (pixel), *not* every second
          return function() {
            // checks if in 25x25 square buffer of center
            if ((Math.abs(this.getAttribute('x') - player.getX()) < 25) && (Math.abs(this.getAttribute('y') - player.getY()) < 10 )) {
              // changes collision state to true
              game.hitCheck(); 
              console.log('test!');
            }
          };
        })
        .attr('x', (Math.random() * (settings.width + 200)) - 100)
        .attr('y', (Math.random() * (settings.height + 200)) - 100)
        .duration(2500); // time lapse from point A to point B
      });
    }, 2000); // idle time (between movements)

    // scoring - updating score box
    // originally, collision checker repeated too quickly in tweens, and no way to slow down,
    // so moved to separate setInterval().
    setInterval(function() { // 
      game.scoring();
      d3.select('.highscore').text('Highscore: ' + settings.highScore);
      d3.select('.score').text('Score: ' + settings.score);
      d3.select('.collisions').text('Collisions: ' + settings.collisions);
      game.collision();
    }, 100);
  },
  updater: function(data) {
    //Refactor setInterval into updater function;
  },
  hitCheck: function() {
    settings.isHit = true;
  },
  collision: function() {
    if (settings.isHit) {
      console.log('test2');
      settings.collisions++;
      if (settings.score > settings.highScore) {
        settings.highScore = settings.score;
      }
      settings.score = 0;
      settings.isHit = false;
    }
  },

  scoring: function() {
    settings.score++;
  }
};

var player = {
  // x, y coordinate of player
  posX: settings.width / 2,
  posY: settings.height / 2,
  init: function() {
    player.createPlayer();
  },

  createPlayer: function() {
    var drag = d3.behavior.drag()
      .on('drag', function () {
        player.setX((d3.event.x > settings.width) ? settings.width : ( (d3.event.x < 0) ? 0 : (d3.event.x)));
        player.setY((d3.event.y > settings.height) ? settings.height : ( (d3.event.y < 0) ? 0 : (d3.event.y)));
        d3.select(this)
        .attr('cx', player.getX()) //d3.event.x is the x-value of the mouse
        .attr('cy', player.getY());
      });

    var ellipse = settings.svg.append('circle')
      .attr('cx', settings.width / 2)
      .attr('cy', settings.height / 2)
      .attr('r', 20)
      .attr('fill', 'blue')
      .call(drag);
      // .attr('x', settings.width / 2) // x is top left hand corner
      // .attr('y', settings.height / 2)
      // .attr('xlink:href', 'tony.png')
      // .attr({'width': '35px', 'height': '35px'})
      // .call(drag);
  },
  // setter functions - used to set `posX`
  setX: function(value) {
    player.posX = value;
  },
  setY: function(value) {
    player.posY = value;
  },
  // getter functions - retrieve value
  getX: function() {
    return player.posX; //= player.ellipse.attr('cx') || 0;
  },
  getY: function() {
    return player.posY; //= player.ellipse.attr('cy') || 0;
  }

};