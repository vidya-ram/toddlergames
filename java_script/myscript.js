$(document).ready(function(){

width = 0;
width_text = 0;
progressbar_width=parseInt($(".container").css("width"))*0.5; //progressbar is 50% of container
tim = 0;
i = 0;
j = 0;
games = ["images/game2.jpg","images/game3.jpg","images/game4.jpg","images/game1.jpg"];
learn = ["images/learning2.jpg","images/learning3.jpg","images/learning4.jpg","images/learning5.jpg","images/learning6.jpg","images/learning1.jpg"];

        $(".loading").fadeIn(1000);
        progress_show();
        tim = setTimeout("display()",5000); //slides change every 5 secs
     
});
                           
                           
function progress_show()
{
    if(width < progressbar_width) // to slowly increase width of p
    {
		$("#progressbar p").css("width",width);
		$("#progressbar p").text(width_text+"%");
         width_text = width_text + 10;
         width += progressbar_width*0.1;		 
   		 tim=setTimeout("progress_show()",200); //increase loading in 5 millisecs steps
    }
    else
    {
        $(".loading").hide();
        $("#content").removeClass("no-show");
  opacity: 0;;
    }
}                           

function display() //changing images in games & learning boxes
{
       $("#game").attr("src",games[i]);
       $("#learning").attr("src",learn[j]);
       if(i<games.length)
       {
          i++;
       }
       else
       {
          i =0;
       }
      
       if(j<learn.length)
       {
          j++;
       }
       else
       {
         j =0;
       }
       
      tim = setTimeout("display()",5000);
}










