$(document).ready(function(){

file_location = "images/game4/";
file_type = ".png";
total_files = 25;
level = 3;
game = new Array();
tim1=0 ,tim2=0 ,tim3=0 ,tim4 = 0;
testing = [];
card_being_shown = 0;
no_card = file_location + "close" + file_type;
max_level = 9;
close_time = 10000;
wait_time = 1000;
wrong_close_time = 300;
playing = false;
done = [];
 

   elems = $("#display img")
   for (i=0; i <elems.length ; i++)
   {
	 $("#display img:eq("+i+")").bind("click",card);
   }

   $("#start").click(function(){
         $("#start").hide();
          card_array();
    });

});

function card_array()
{
  var i, j, file_no,file, no_match=0;
  
  for (i=0; i <level ; i++)
  {
    do
    {
      file_no = Math.floor(Math.random()*total_files);  //return a random integer in the range of total_files
      file = file_location + file_no + file_type;
    }while(game.indexOf(file) != -1) // to check if card has not be chosen before
    
    game[i] = file_location + file_no + file_type;
    done[i] = 0;
  }
  show();
  tim1 = setTimeout("close()",close_time);
  test_array();
  tim2 = setTimeout("test_show()",close_time);
}

function show()
{     
   var i;
   for (i=0; i <level ; i++)
   {
     $("#display img:eq("+i+")").show();
     $("#display img:eq("+i+")").attr("src",game[i]);
   }
}

function close()
{
   var i;
   
   for (i=0; i <level ; i++)
   {
     $("#display img:eq("+i+")").attr("src",no_card);
   }   
}

function test_array()
{
    var i, j, card_no, no_match=0;
    for(i=0; i<level; i++)
    {
      do
      {
        card_no = Math.floor(Math.random()*level);
      }while(testing.indexOf(game[card_no]) != -1);   // to check to be sure no second occurence in the test array
      testing[i]=game[card_no];
    }
}

function test_show()
{
       playing = true;
       $("#test").show().attr("src",testing[card_being_shown]);
}

function card()
{   
    if(playing)
    {
    	clicked_card = this.id;
		$("#display img:eq("+clicked_card+")").attr("src",game[clicked_card]);

   		if(game[clicked_card] == testing[card_being_shown])
		{
		  done[clicked_card] = 1;
		  correct();
		}
		else
		{
		  tim3 = setTimeout("wrong()",wrong_close_time);
		}
    }
    
}

function correct()
{
      if(card_being_shown < (level-1))
      {
        card_being_shown++;
        tim4 = setTimeout("test_show()",wait_time);    
      }
      else
      {  
          if(level < max_level)
          {
          	level++;
          	card_being_shown = 0;
          	$("#test").hide();
          	$("#win-img").fadeIn(wait_time).hide(wait_time, function(){
          			close();
            		playing=false;
            		tim4 = setTimeout("card_array()",wait_time);  
                  });          			
           }
           else
           {
              $("#test").hide();
          	  $("#game-over-img").show("slow");  //game over
           } 
      }
}

function wrong()
{
	if( !(done[clicked_card]) ) 
	{
	   $("#display img:eq("+clicked_card+")").attr("src",no_card);
	}
}



