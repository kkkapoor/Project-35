//Create variables here
var dog, happyDog, database, foodStock;
var dog_img1, dog_img2;
var foodS;

function preload()
{
  //load images here
  dog_img1 = loadImage("images/dogImg.png");
  dog_img2 = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);


  dog = createSprite(250,300,10,10);
  dog.scale = 0.15;

  dog.addImage("d",dog_img1);
  dog.addImage("d1",dog_img2);
 
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.changeImage("d1",dog_img2);
}
  drawSprites();
  //add styles here
  textSize(20);
  fill("red");
  stroke("yellow");
  text("Note: Press UP_ARROW Key To Feed Drago Milk !!!",15,50);
  text("Food Remaining: "+ foodS,200,150)
}

//Function to read values from DB.
function readStock(data){
  foodS = data.val();
}

//Function to write values in DB.
function writeStock(x){

  if(x<=0){
    x = 0;
  } else{
    x = x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}



