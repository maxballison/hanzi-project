//'星' by Max Allison






//set up variables/colors and things
let stars = [];
let colors = [ '#ADE0FF', '#FFFABE', '#FFFFFF'];
let speed1;
let chubby
let mode = 0;
let count = 1;
let starcount = 1000;





//runs once at beginning
function setup() {
	createCanvas(windowWidth, windowHeight);
  background(0);
	
	//create starcount number of stars (1000 works well for this case)
  for (let i = 0; i < starcount; i++) {
    stars[i] = new Star();
  }
}


//runs every frame
function draw() {
	// runs through the animation
	updateModes();
	
	//makes a trail
	fill(0,60);
	noStroke();
  rect(0, 0, width, height);
 
	
	// update all da stars
  translate(width/2, height/2);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
	
	
	//update our own frame variable
	count++;
	
}


//object defining each star on the screen
class Star {
	
	constructor() {
		//place it randomly on screen and give it color
		this.x = random(-width/2, width/2);
    this.y = random(-height/2, height/2);
    this.z = random(width/2);
    this.pz = this.z;
		this.color = color(random(colors));
	}

	//updates positions and things every frame
  update() {

    this.z = this.z - speed1;

    if (this.z < 1) {
      this.z = width/2;
      this.x = random(-width/2, width/2);
      this.y = random(-height/2, height/2);
      this.pz = this.z;
    }
  }

	//updates where it draws on screen every frame
  show() {
    noStroke();

    
  	let sx = map(this.x / this.z, 0, 1, 0, width/2);
    let sy = map(this.y / this.z, 0, 1, 0, height/2);;
    let r = map(this.z, 0, width/2, 16, 0);
		push();
		translate(sx,sy);
    fill(this.color);
		if (r > 0) {
			scale(r/5);
			text('星',0,0);
			
		}

		pop();


    let px = map(this.x / this.pz, 0, 1, 0, width/2);
    let py = map(this.y / this.pz, 0, 1, 0, height/2);

    this.pz = this.z;

    stroke(255);

  }
}



//does the animation
//when framecount reaches certain numbers, will switch speed of travel
function updateModes() {
	
	//switches to first mode on loop
	if (mode >= 4) {
		mode = 0;
	}
	
	//moves at casual speed for 7 sec
	if (mode == 0) {
		speed1 = 3.3
		if (count % 420 == 0) {
			mode++;
			count = 1;
		}
	}	
	
	//moves backwards
	if (mode == 1) {
		speed1 -= .01;
		if (speed1 < -3) {
			speed1 = -3;
		}
		
		if (count % 850 == 0) {
			mode++;
			count = 1;
		}
	}
	
	//explodes forward
	if (mode == 2) {
		speed1 = 15;
		if (count % 180 == 0){
			mode++;
			count = 1;
		}
	}
	
	//moves back to normal speed
	if (mode == 3) {
		if (speed1 > 3.3) {
			speed1 -= .03;
		}
		else {
			speed1 = 3.3;
		}
		
		if (count % 850 == 0) {
			mode ++;
			count = 1;
		}
		
	}
}