// Made with Crafty

alert("In order to play this game with the best user experience, you might want to crop your window to the game's size (700x700). But don't worry ! This bug will be fixed soon !")

Crafty.init(700, 700, document.getElementById("game"));

// Random for falling sprites (MDN)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

var points = 0;

var title = Crafty.e('DOM, 2D, Color, Text')
                .attr({x: 600, y: 10, w: 100, h: 25})
                .color('rgb(255, 255, 255)')
                .text("Fallgame")
                .textFont({
                    size: '22px'
                })

var pdl = Crafty.e('Paddle, 2D, DOM, Color, Multiway, Collision').attr({x: 325, y: 650, w: 100, h:50}).color('#9FE36B').multiway(200, { RIGHT_ARROW: 0, LEFT_ARROW: 180 })
    .bind('UpdateFrame', function () {
        //hit left or right side
        // if (this.x <= 0 || this.y >=700) {
        //    this.multiway(0);
        //    this.multiway(200);
        //}
    });

var speed = 7
function fall() {
    var xsprite = getRandomInt(650);
    var ysprite = 0;
    var sprite = Crafty.e('2D, DOM, Color, Collision').attr({x: xsprite, y: ysprite, w: 50, h: 50, dX: 0, dY: -1}).color('#7623DB').bind('UpdateFrame', function () {
            this.y += speed;
            if (this.y > 700) {
                this.destroy();
                speed = speed*1.05;
                points = points+1;
                Crafty.e('Points, DOM, 2D, Color, Text')
                    .attr({x: 0, y: 10, w: 100, h: 20, points: 0})
                    .color('rgb(255, 255, 255)')
                    .text(points+" Points")
                    .textFont({
                        size: '20px',
                        weight: 'bold'
                    });
                fall()
                
            }  
        })
        .onHit('Paddle', function () {
            points = points-1;
            console.log('Sprite hit paddle')
            if (points > 1) {
                Crafty.e('DOM, 2D, Color, Text')
                    .attr({x: 200, y: 300, w: 300, h: 50})
                    .color('rgb(255, 255, 255)')
                    .text("Game Over !")
                    .textFont({
                        size: '50px'//,
                        // weight: 'bold'
                    });
                Crafty.e('DOM, 2D, Color, Text')
                    .attr({x: 175, y: 350, w: 350, h: 30})
                    .color('rgb(255, 255, 255)')
                    .text("You've earned "+points+" points")
                    .textFont({
                        size: '30px'
                    })
                pdl.destroy();
            }
        });
}

fall()


