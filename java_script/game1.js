$(document).ready(function(){

    colour_list= ["maroon", "red","orange", "yellow", "green", 
                      "olive", "purple", "fuchsia", "white", "lime", 
                      "navy", "blue", "aqua", "teal", "black", 
                      "silver", "gray", "Goldenrod", "Chocolate", "Tan"]; //global array
                      
    game_color_array = new Array();
    user_filled_color_array = new Array();
    colour_chosen = colour_list.length; // Max colours is 17
    game_level = 2;
	max_game_levels = 5;
    is_highlighted = 0;
    clue_canvas_id = "null";
	
	colour_canvas_width = parseInt($(".colour-display canvas").css("width"));   
    xcoordinate = 0.1*colour_canvas_width;
    box_width= 0.8*colour_canvas_width;
	$(".colour-display canvas").remove();
    
    add_colour_canvas("canvasDiv", colour_list.length, "all");
   	for(k=0; k<colour_list.length; k++){
	  var id = "canvasDiv" + k;
	  var canvas_event = document.getElementById(id);
	  canvas_event.onclick = choose;
	}
   		 
   	$("#start").click(function(){ 
		$(".game-area").removeClass("no-show");
		$("#clue").show();  
		$("#note").show();
		$("#start").hide(); 
		add_colour_canvas("myCanvas", game_level, "test");  		 
		add_colour_canvas("test_canvas", game_level, "no");
		test_canvas_click();	
      });
     
     $("#clue").click(function(){ 
     	clue();
     });   
});

function add_colour_canvas(div_name, iteration, fill_colour)
{  
   var i,  canvasDiv, new_canvas, new_context, canvas_id;
   
   for (i=0; i <iteration; i++){	   	
		canvasDiv = document.getElementById(div_name);
	    new_canvas = document.createElement("canvas");
		new_canvas.setAttribute("width", colour_canvas_width);
		new_canvas.setAttribute("height", colour_canvas_width);
		canvas_id = div_name + i;
		new_canvas.setAttribute("id",canvas_id);
		canvasDiv.appendChild(new_canvas);
						
		new_context = new_canvas.getContext("2d");
    	new_context.beginPath();
    	new_context.rect(xcoordinate, xcoordinate, box_width, box_width);
			
		if(fill_colour == "all")
		{
    		new_context.fillStyle = colour_list[i];
			new_context.fill();
		}
		else
		{
			if(fill_colour == "test")
			{
				random_colour();
				new_context.fillStyle = game_color_array[i];
			    new_context.fill();
			}
		}
    	new_context.lineWidth=1;
    	new_context.strokeStyle = "black" //border
    	new_context.stroke();
   }
}

function random_colour()
{
   do
   {
     colour_no = Math.floor(Math.random()*colour_list.length); //return a random integer between 0 and 16 
     new_colour = colour_list[colour_no];
   }while(game_color_array.indexOf(new_colour) != -1) //check to see if colour is already chosen in the game array
   game_color_array.push(new_colour);
}

function test_canvas_click()
{
    for(k=0; k<game_level; k++)
    {
    	id="test_canvas"+k;
    	canvas_event = document.getElementById(id);
    	canvas_event.onclick = colour_selected;
    }
}

function choose()
{  
    var chosen_canvas, chosen_canvas_context, color_chosen_id;


    if(is_highlighted == 1)    // remove the red border
    { 
	    color_chosen_id = "canvasDiv"+colour_chosen;
    	chosen_canvas = document.getElementById(color_chosen_id);
    	$(chosen_canvas).css("border", "none");
    	$(chosen_canvas).css("cursor","pointer");
     }
 
    colour_chosen=this.id.split("canvasDiv")[1];
   
    chosen_canvas = document.getElementById(this.id);
    $(chosen_canvas).css("border", "2px solid red");
    $(chosen_canvas).css("cursor","progress");
    is_highlighted = 1; 
   
}

function colour_selected()
{  
    var string, string1, test_canvas, test_canvas_context, chosen_canvas, chosen_canvas_context;
    
    if(colour_chosen == colour_list.length)
    {
       return;
    }
    
    test_canvas = document.getElementById(this.id);   //filling the colour
    test_canvas_context = test_canvas.getContext("2d");
    test_canvas_context.fillStyle = colour_list[colour_chosen];
    test_canvas_context.fill();
    test_canvas_context.strokeStyle = "black"; //border
    test_canvas_context.stroke();
    string = this.id.split("test_canvas")[1];
    user_filled_color_array[string]=colour_list[colour_chosen];
    check();

}

function check()
{
   var  i, k , id, id_name, chosen_canvas, color_chosen_id;
   
   if(user_filled_color_array.length == game_level)
   {
		for(i=0; i<game_level ; i++)
		{
 			if (game_color_array[i] != user_filled_color_array[i])
 			{
 		   	     break;
 		 	}
 		}
 		
 		if (i == game_level)
 		{
			$("#myCanvas canvas").remove();
			$("#test_canvas canvas").remove();
    		
    		if( game_level < max_game_levels)
    		{
    			game_level ++;
    			$("#win-img").fadeIn();                                                               
  			    $("#win-img").delay(2500).hide("slow", function(){
					
				   /* ### reset old game ### */
  			       if(is_highlighted == 1)    // remove the red border
    				{
						color_chosen_id = "canvasDiv"+colour_chosen;
    					chosen_canvas = document.getElementById(color_chosen_id);
    					$(chosen_canvas).css("border", "none");
    					$(chosen_canvas).css("cursor","pointer");
     				}
				   game_color_array = [];
                   user_filled_color_array = [];
				   colour_chosen = colour_list.length; // Max colours is 17
				   
				   /* ### New game ### */
  				   add_colour_canvas("myCanvas", game_level, "test");  		 
				   add_colour_canvas("test_canvas", game_level, "no");
         		   test_canvas_click();	
			     });
         }
         else
         {
			/* ### Game over ### */
         	$("#game-over-img").show("slow"); 
         	 $("#note").hide();
         	$("#clue").hide();
			$("#myCanvas").addClass("off");
			$("#test_canvas").addClass("off");
         }
 	 	}
 	 }
}

function clue()
{ 
    var i, canvas_id;
     
	for(i=0; i<game_level ; i++)
	{
		if (game_color_array[i] != user_filled_color_array[i])
	   {
				for(j=0; j<colour_list.length; j++)
				{
					if(colour_list[j] == game_color_array[i])
					{
						canvas_id = "canvasDiv" + j;
						clue_canvas_id = document.getElementById(canvas_id);  //removing the rosybrown border   
						$(clue_canvas_id).css("border","2px solid blue");
						 var t=setTimeout("clue_remove()",1500);
					 return;
				}
			}
		 }
	 }
}

function clue_remove()
{
    $(clue_canvas_id).css("border","none");
}

