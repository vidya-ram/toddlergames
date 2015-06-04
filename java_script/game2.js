$(document).ready(function(){
  
  var canvas = document.getElementById("square");
  var canvas_support=(canvas.getContext)? true : false;
  if (canvas_support == false){
	alert("Your browser doesn't support HTML5, so please try the game in a different browser");
	$("#start").hide(); 
	return;
  }
			
  img_location = "images/shapes/"
  moved = false;
  moved_item = "null", test_shape_id = "null";
  shapes = ["square", "rectangle", "triangle", "circle", "oval"];
  shapes_test = [0,0,0,0,0];
  game_count = 0;
  audio_id = "null";
  test_files = 3;   //for each shape
  canvas_width = parseInt($(".shapes canvas").css("width"));  
  xcoordinate = 0.05*canvas_width;
  ycoordinate = 0.05*canvas_width;
  box_width= 0.8*canvas_width;
  
  a_href = ["http://commons.wikimedia.org/wiki/File:3,5_DD_floppy_%28720_KB%29_back.jpeg", "http://commons.wikimedia.org/wiki/File:Tile_panel_flowers_Louvre_OA3919-2-297.jpg", "http://commons.wikimedia.org/wiki/File:Chess_Board.svg",
                 "http://commons.wikimedia.org/wiki/File:Black%28green%29board.jpg", "http://commons.wikimedia.org/wiki/File:Geneve_door_C.jpg", "http://commons.wikimedia.org/wiki/File:Hetzel_front_cover.jpg",     
                 "http://commons.wikimedia.org/wiki/File:Kulmaviivain.JPG", "http://commons.wikimedia.org/wiki/File:Terracotta_Forward_triangle.png",  "http://commons.wikimedia.org/wiki/File:Muu_vaara_189.svg", 
                 "http://commons.wikimedia.org/wiki/File%3AClocks_001.JPG", "http://commons.wikimedia.org/wiki/File:Golf_ball.svg", "http://commons.wikimedia.org/wiki/File%3A1941_HALF_RUPEE_INDIA%2C_SILVER.jpg", 
                 "http://commons.wikimedia.org/wiki/File:Coturnix_coturnix_eggs.jpg", "http://commons.wikimedia.org/wiki/File:Oval_sp%C3%A4nnbuckla_Fr%C3%B6jel.jpg", "http://commons.wikimedia.org/wiki/File:Rugbyball2.jpg"];
                 
  title = [ "public domain", "public domain", "public domain", 
              "public domain", "By Andrzej 22 (Own work) [CC0], via Wikimedia Commons", "By Wouter Hagens (Own work) [GFDL (www.gnu.org/copyleft/fdl.html) or CC-BY-SA-3.0-2.5-2.0-1.0 (www.creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons", 
              "By kallerna (Own work) [CC-BY-SA-3.0 (www.creativecommons.org/licenses/by-sa/3.0) or GFDL (www.gnu.org/copyleft/fdl.html)], via Wikimedia Commons", "By Oosoom at en.wikipedia (Transferred from en.wikipedia) [GFDL (www.gnu.org/copyleft/fdl.html) or CC-BY-SA-3.0 (www.creativecommons.org/licenses/by-sa/3.0)], from Wikimedia Commons", "public domain",
               "public domain", "By Booyabazooka [GFDL (www.gnu.org/copyleft/fdl.html) or CC-BY-SA-3.0-2.5-2.0-1.0 (www.creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons",  "public domain",
               "By Mnolf [GFDL (www.gnu.org/copyleft/fdl.html) or CC-BY-SA-3.0-2.5-2.0-1.0 (www.creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons", "By Mikael Lindmark (Own work) [CC-BY-SA-2.5 (www.creativecommons.org/licenses/by-sa/2.5)], via Wikimedia Commons", "public domain"];

  square(0);
  rectangle(0);
  triangle(0);
  circle(0);
  oval(0);
    
  for(var i = 0; i<shapes.length; i++)
  {
	var shape_id = shapes[i];
	shape_id = "#" + shape_id;
	$(shape_id).bind("click", click);   	
  }
  
  function click(){
	moved_item = this.id;
	if(moved_item == test_shape_id){
		check();
	}
  }
  
  $("#start").click(function(){ 
	$("#start").hide(); 	
	$("#test").show(); 
	$("#clue").show();
	$("#note").show();
	test();	
  });
		
  $("#clue").click(function(){ 
	document.getElementById(audio_id).play();
	$("#speaker").fadeIn().fadeOut();
  });
 });

function square(value)
{
  var context, id;
	  
  id = document.getElementById("square");
  context = id.getContext("2d");
  context.beginPath();
  context.rect( (xcoordinate+box_width/2), ycoordinate, 0.9*box_width, 0.9*box_width);
  context.fillStyle = "orange";
  context.fill();
  context.lineWidth=3;
  context.strokeStyle = "black";
  context.stroke();
}

function rectangle(value)
{       
  var context, id;
		  
  id = document.getElementById("rectangle");
  context = id.getContext("2d");
  context.beginPath();
  context.rect((xcoordinate+box_width/2), ycoordinate, box_width, box_width*0.7);
  context.fillStyle ="orange";
  context.fill();
  context.lineWidth=3;
  context.strokeStyle = "black";
  context.stroke();
}

function triangle(value)
{
  var context, id;
  
  id = document.getElementById("triangle");
  context = id.getContext("2d");
  context.beginPath();
  context.moveTo((xcoordinate+box_width/4), box_width-10);
  context.lineTo(ycoordinate+box_width, ycoordinate);
  context.lineTo((xcoordinate+2*box_width-20), box_width-10);
  context.lineTo((xcoordinate+box_width/4), box_width-10);
  context.stroke();
  context.fillStyle ="orange";
  context.fill();
  context.lineWidth=3;
  context.strokeStyle = "black";
  context.stroke(); 
}

function circle(value)
{       
  var context, id;
  
  id =document.getElementById("circle");
  context = id.getContext("2d");
  context.beginPath();        
  context.arc(xcoordinate+box_width, (box_width/2), (0.9*box_width/2), 0, 2 * Math.PI, false);
  context.stroke();
  context.fillStyle ="orange";
  context.fill();
  context.lineWidth=3;
  context.strokeStyle = "black";
  context.stroke();  
}

function oval(value)
{       
  var context, id;
  
  id = document.getElementById("oval");
  context = id.getContext("2d");  
  context.beginPath();      
  context.moveTo(xcoordinate+(box_width/4), (ycoordinate+(box_width/2)) );
  context.bezierCurveTo( xcoordinate+(box_width/4), ycoordinate+(box_width/4), 
						(xcoordinate+(box_width/4)+box_width),  ycoordinate+(box_width/4), 
						(xcoordinate+(box_width/4)+box_width), (ycoordinate+(box_width/2)) );
  context.bezierCurveTo((xcoordinate+(box_width/4)+box_width), (ycoordinate+(box_width/4)+(box_width/2)), 
						xcoordinate+(box_width/4), (ycoordinate+(box_width/4)+(box_width/2)) ,
						xcoordinate+(box_width/4), (ycoordinate+(box_width/2))  );
  context.stroke();
  context.fillStyle ="orange";
  context.fill();
  context.lineWidth=3;
  context.strokeStyle = "black";
  context.stroke(); 		        
}

function test()
{
  var img_elem, img_id, href_no;
  var test_shape;
  
  do
  {
	test_shape = Math.floor(Math.random()*5);
  }while(shapes_test[test_shape] == test_files);
	
  img_id = img_location +  shapes[test_shape] + shapes_test[test_shape] + ".png";
  $("#test img").attr("src",img_id);
  
  href_no = (test_shape*3) + shapes_test[test_shape];
  $("#test a").attr("href", a_href[href_no]);
  $("#test a").attr("title", title[href_no]);
  
  test_shape_id = shapes[test_shape];
  shapes_test[test_shape]++;
  audio_id = "audio_" + shapes[test_shape];
  game_count ++;
  $("#test").show();
}

function check()
{
  var img_id;
  if(moved_item == test_shape_id){
	img_id ="";
	$("#test img").attr("src",img_id);
	$("#test").hide();
   
   if(game_count > ((shapes.length*test_files)-1)){
	 if( (shapes_test[0] == test_files) && (shapes_test[1] == test_files) && (shapes_test[2] == test_files) && 
	 ( shapes_test[3] == test_files) && (shapes_test[4] == test_files) ){
		$("#game-over-img").show("slow");   //game over
		$("#clue").hide();
		$("#note").hide();
	 }	 
	 else{      
	  $("#win-img").fadeIn();                                              
	  $("#win-img").delay(1000).hide("slow", function(){
						test(); });
	 }       
  }
  else{      
	$("#win-img").fadeIn();                                              
	$("#win-img").delay(1000).hide("slow", function(){
					  test(); });
  }
  }
}


