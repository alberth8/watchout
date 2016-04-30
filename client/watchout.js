$(window).load(function() {
  game.init();
  player.init();
});

var settings = {
  width: 750,
  height: 500,
  n: 50,
  score: 0,
  highScore: 0,
  collisions: 0,
  isHit: 0,
  delay: 1000,
  svg: d3.select('body').append('svg') // svg refers to container
}

var game = {
  init: function() {
    game.createCircles();
    game.cycles();
  },

  createCircles: function() {
    var dataset = [];
    settings.svg.attr('width', settings.width).attr('height', settings.height);
    for (var i = 0; i < settings.n; i++) {
     dataset.push(25);//(Math.random() * 1) + 5);
    }
    var circles = settings.svg.selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle');
    circles.attr('cx', function(d, i) {
      return 25;//(i * 50) + 25;
      })
      .attr('cy', settings.height / 2)
      .attr('r', function(d) {
        return d;
      }).classed({'asteroid': true})
      .style('image', 'url(asteroid.png)');
      //.attr('image', 'url(asteroid.png)');
    //d3.selectAll('circle').attr('image', 'url(asteroid.png)');
  },

  cycles: function() {
    setInterval(function() { 
      // var randx = Math.random() * settings.width;
      // var randy = Math.random() * settings.width;
      d3.selectAll('circle').each(function() { // moving each circles to random positions
        d3.select(this)
        .transition()
        .tween('circle', function(d, i, a) {
          return function() {

            if((Math.abs(this.getAttribute('cx') -  player.getX()) < 25) && (Math.abs(this.getAttribute('cy') - player.getY()) < 10 )) {
              game.hitCheck();
              console.log('test!');
            }
          }
        })
        .attr('cx', Math.random() * settings.width)
        .attr('cy', Math.random() * settings.height)
        .duration(1500);
      });
    }, 1000);
    setInterval(function() {
      game.scoring();
      d3.select('.highscore').text("Highscore: " + settings.highScore);
      d3.select('.score').text("Score: " + settings.score);
      d3.select('.collisions').text("Collisions: " + settings.collisions);
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
    if(settings.isHit) {
      console.log('test2');
      settings.collisions++;
      if(settings.score > settings.highScore) {
        settings.highScore = settings.score;
      }
      settings.score = 0;
      settings.isHit = false;
    }
  },

  scoring: function() {
    settings.score++;
  }
}

var player = {
  plX: settings.width / 2,
  plY: settings.height / 2,
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

    var ellipse = settings.svg.append('ellipse')
      .attr('cx', settings.width / 2)
      .attr('cy', settings.height / 2)
      .attr('rx', 25)
      .attr('ry', 10)
      .attr('fill', 'red')
      .call(drag);
  },
  setX: function(value) {
    player.plX = value;
  },
  setY: function(value) {
    player.plY = value;
  },
  getX: function() {
    return player.plX //= player.ellipse.attr('cx') || 0;
  },
  getY: function() {
    return player.plY //= player.ellipse.attr('cy') || 0;
  }

}