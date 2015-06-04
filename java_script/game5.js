$(document).ready(function()
{
  total_number = 20;
  allow_click = 0;
  file_location = "images/game4/";
  file_type = ".png";
  total_files = 25;
  test_no = 0;

  draw_number_canvas();
  $("#start").click(function(){ 
   	    $("#start").hide();
		
        for (l=1; l<total_number; l++)
     		{
     			number_id = "#" + l;
      			$(number_id).bind("click", click);
      	}
   	
   	    game_start();
     });

});

function draw_number_canvas()
{
	var number = 1;

	for (number=1 ; number<=total_number; number++)
    {
		canvasdiv = document.getElementById("number");     
    	new_canvas = document.createElement("canvas");

    	var canvas_support=(new_canvas.getContext)? true : false;
    	if (canvas_support == false)
      	{
          alert("Your browser doesn't support HTML5, so please try the game in a different browser");
          $("#start").hide(); 
          return;
      	}
      
        new_canvas.setAttribute("width", "60");
    	new_canvas.setAttribute("height", "60");
    	new_canvas.setAttribute("id",number);
    	canvasdiv.appendChild(new_canvas);
            
    	context = new_canvas.getContext("2d");
    	context.beginPath();      
    	context.arc("30", "30", "28", 0, 2 * Math.PI, false);
    	context.stroke();
    	context.fillStyle = "yellow";
    	context.fill();
    	context.lineWidth=3;
    	context.strokeStyle = "black";
    	context.stroke();  

    	context.lineWidth = 3;   
		context.font = "25pt Calibri";
		context.textAlign = "center";
		context.strokeText(number, 30, 40);  
    }
}

function game_start()
{
  test_no = Math.floor(Math.random()*total_number); 
  file_no = Math.floor(Math.random()*total_files);
  if(test_no == 0)
  {
    test_no = 1;
  }
  file = file_location + file_no + file_type;
	
  img_elems = $("#display img");
  for (i=1; i <=test_no ; i++)
  {
     $(img_elems[i]).show();
     $(img_elems[i]).attr("src",file);
  }
  allow_click = 1;
}

function click()
{
      if(allow_click)
      {
	   	  clicked = this.id;
	   	  if (test_no == clicked)
        {
            allow_click = false;
            win();
        }
	  }
}

function win()
{
        $("#win-img").fadeIn(1500);  
        $("#win-img").delay(1500). hide(1500, function(){
              clear_game();
              game_start(); });
}

function clear_game()
{
  for (i=1; i <=test_no ; i++)
  {
     $(img_elems[i]).hide();
  }
}