/* canvas variable */
var canvas;

var count;           // Number of data sets or entries asked
var circle;
var arr_all=[];
var i=0;
var asteroids = [];

                                                                                                                      //&limit=160
var  meteorsurl= "https://ssd-api.jpl.nasa.gov//fireball.api?date-min=1900-01-01&req-loc=true&req-alt=true&req-vel=true&limit=120";


/* setup - this executes once */
function setup()
{
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.style("display", "block");
	background(0);

	meteors= loadJSON(meteorsurl,datacollect);

	// Generates object for each circle according to the number of enteries asked(count).
	circlegen();
}
/* setup */


function draw()
{
	// For the fading effect
	fill(0,50);
	rect(0,0,width,height);

	for(var i = 0; i<count; i++ )
	{
			// var date = arr_all[i][0];                      // Not using it for now.
			var energy = float(arr_all[i][1]);             // Stroke COLOUR
			var impact = float(arr_all[i][2]);             // SIZE of the cirle
			var lat = float(arr_all[i][3]);                // South, north degree
			var lat_dir = arr_all[i][4];                   // South or North
			var log = float(arr_all[i][5]);                // East,West degree
			var log_dir = arr_all[i][6];                   // East or West
			var alt = float(arr_all[i][7]);                // DISTANCE from center.
			var vel = float(arr_all[i][8]);                // Controlls SPEED of the circle.

			noFill();
			stroke(200,energy*0.5,0);
			circlegen();

			// south
			if (lat_dir=="S" && log_dir=="E" ){
				if(lat<log){                 // E is greater then S    more towards E
					TweenLite.to(asteroids[i],vel,{x: (width/2) + ((alt)*4 ),y:  (height/2) + alt,r: impact*20});
				}
				else{                      //S is greater
					TweenLite.to(asteroids[i],vel,{x: (width/2) + ((alt)*2 ),y: (height/2) + alt*4,r: impact*20});
				}
			}

			if (lat_dir=="S" && log_dir=="W" ){
				if(lat<log){                 // W is greater then S    more towards W
					TweenLite.to(asteroids[i],vel,{x: (width/2) + ((alt) * -4),y: (height/2) + alt,r: impact*20});
				}
				else{                      //S is greater
					TweenLite.to(asteroids[i],vel,{x: (width/2) + ((alt) * -1),y: (height/2) + (alt*5),r: impact*20});
				}
			}

			// north
			if (lat_dir=="N" && log_dir=="E" ){
				if(lat<log){                 // E is greater then N    more towards E
					TweenLite.to(asteroids[i],vel,{x: (width/2) +(alt*5),y: (height/2) + (alt*-1),r: impact*20});
				}
				else{                      //N is greater E
					TweenLite.to(asteroids[i],vel,{x: (width/2) +(alt+5),y: (height/2) +(alt*-4),r: impact*20});
				}
			}

			if (lat_dir=="N" && log_dir=="W" ){
				if(lat<log){                 // W is greater then N    more towards W
			TweenLite.to(asteroids[i],vel,{x: (width/2) +(alt*-5),y:(height/2) + (alt*-0.9),r: impact*20});
				}
				else{                      //N is greater
					TweenLite.to(asteroids[i],vel,{x: (width/2) +(alt*-1),y: (height/2) +(alt*-3),r: impact*20});
				}
			}

			noFill();
			ellipse(asteroids[i].x, asteroids[i].y, asteroids[i].r);

			// To show the origin point
			fill(210,210,210);
			ellipse(windowWidth/2,windowHeight/2,3);
	}
}
/* draw */


function datacollect()
{
	//Number of entries.
	count = meteors["count"];

	//Saving individual array from the object in arr_all.
	for(var i = 0; i<count; i++ ){
		arr_all[i] = meteors["data"][i];
	}
}


function circlegen(){
	for (var i = 0;i < count;i++){
		var name = "circle"+i;             // Giving it a unique name

		name = {
    	x: width/2,
    	y: height/2,
    	r: 5
  	};

	ellipse(circle.x,circle.y,circle.r);
	append(asteroids,name);
	}
}

/* windowresized - when browser window resized resize canvas */
function windowResized()
{
	//resize canvas width and height to window width and height
	resizeCanvas(windowWidth, windowHeight);

	//set the background colour of the canvas (grey)
	background("#dddddd");
}
/* windowresized */
