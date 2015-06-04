$(document).ready(function(){

 alpha_list = ["A", "B", "C", "D", "E", "F", "G", "H", "I","J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
 small_alpha_list = ["a", "b", "c", "d", "e", "f", "g", "h", "i","j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
 test = [];
 colour_list= ["red","orange", "yellow", "green", "pink", "coral"];
 alpha_test=0, clicked="null";
 game_counter = 0;
 clue_id = "null";
 allow_click = false;    
            
   $("#start").click(function(){ 
	  $("#start").hide();
	  $("#alpha_type").hide();
	  $("#alpha").show();
	  drawing_canvas();

	  alphabet_type = $('input:radio[name=letters]:checked').val();
	  if (alphabet_type == 1){
		change_drawn_canvas();
	  }
	  
	  for (l=0; l<alpha_list.length; l++){
				  alpha_id = "#" + alpha_list[l];
			  $(alpha_id).bind("click", click);
	  }
	  for (i=0; i <alpha_list.length ; i++){
				  test[i] = 0;   // to avoid same alphabet be tested
	  }
	  $("#clue").click(function(){
		clue(0);  
	  });
	  $("#speaker").click(function(){
		repeat();  
	  });
	  $("#clue").show();
	  setTimeout("testing()",2000);
   });   			     
});

function drawing_canvas()
{
   var canvasdiv, new_canvas, context, colour_no, alpha_no, alpha_id;
   var i=0;
   var alpha = [];

   for (i=0; i <alpha_list.length ; i++)
   {
        alpha[i] = 0;
   }

  for (i=0; i <alpha_list.length ; i++)
  { 
	 colour_no = Math.floor(Math.random()*colour_list.length); 
	 do
	 {
		 alpha_no = Math.floor(Math.random()*alpha_list.length);
	 }while(alpha[alpha_no]);  
	 
	 alpha[alpha_no]=1;   // to avoid same alphabet being displayed
     
      canvasdiv = document.getElementById("alpha");     
      new_canvas = document.createElement("canvas");
       
      var canvas_support=(new_canvas.getContext)? true : false;
      if (canvas_support == false)
      {
          alert("Your browser doesn't support HTML5, so please try the game in a different browser");
          $("#start").hide(); 
          return;
      }
      
      new_canvas.setAttribute("width", "80");
      new_canvas.setAttribute("height", "80");
      new_canvas.setAttribute("id",alpha_list[alpha_no]);
      canvasdiv.appendChild(new_canvas);
            
      context = new_canvas.getContext("2d");
      context.beginPath();      
      context.arc("40", "40", "38", 0, 2 * Math.PI, false);
      context.stroke();
      context.fillStyle = colour_list[colour_no];
      context.fill();
      context.lineWidth=3;
      context.strokeStyle = "black";
      context.stroke();  

      context.lineWidth = 5;   
      context.font = "40pt Calibri";
      context.textAlign = "center";
      context.strokeText(alpha_list[alpha_no], 40, 55);          
  }
}

function change_drawn_canvas()
{  
  var i = 0; 
  while(i <= 25)
  {
    canvas_id = alpha_list[i];
    alpha_canvas = document.getElementById(canvas_id);
    context = alpha_canvas.getContext("2d");
    context.width = context.width; // clearing to redraw

    colour_no = Math.floor(Math.random()*colour_list.length); 

    context.beginPath();      
    context.arc("40", "40", "38", 0, 2 * Math.PI, false);
    context.stroke();
    context.fillStyle = colour_list[colour_no];
    context.fill();
    context.lineWidth=3;
    context.strokeStyle = "black";
    context.stroke();  

    context.lineWidth = 3;   
    context.font = "40pt Calibri";
    context.textAlign = "center";
    context.strokeText(small_alpha_list[i], 40, 55);
    i++;
  }
}

function click()
{
      if(allow_click)
      {
	   	clicked = this.id;
   	 	if(alpha_list[alpha_test] == clicked)
    	 	{ 
    		 	ch();
    		}
    	}
}
   
function testing()
{ 
   var audio_id;
   do
   {
        alpha_test = Math.floor(Math.random()*alpha_list.length);
   }while(test[alpha_test]); 
   
   test[alpha_test] = 1;
   audio_id = "audio_" + alpha_list[alpha_test];
   $("#"+audio_id).trigger("play");
   $("#speaker").fadeIn().fadeOut().fadeIn();
   game_counter++;
   allow_click = true;
}

function ch()
{
   if(alpha_list[alpha_test] == clicked)
   {
      if(game_counter == alpha_list.length)
      {
          allow_click = false;
          $("#game-over-img").fadeIn("slow"); //game over
          $("#speaker").hide();	
          $("#clue").hide();	
      }
      else
      {
         allow_click = false;
      	$("#win-img").fadeIn(1500);  
  	   	$("#win-img").delay(1500). hide(1500, function(){
  	   				testing(); });
  	    }
   }
}

function repeat()
{
     var a;
     
     a= "audio_" + alpha_list[alpha_test];
     document.getElementById(a).play();
     $("#speaker").fadeIn().fadeOut().fadeIn();
}

function clue(value)
{
      
     clue_id = alpha_list[alpha_test];
     document.getElementById(clue_id).style.backgroundColor="rgba(196, 22, 63, 0.8)";
     if(value)
     {
		document.getElementById(clue_id).style.backgroundColor="rgba(199, 220, 218, 0.8)";
        clue_id = "null";
     }
     else
     {
     var t=setTimeout("clue(1)",500);
     }
}