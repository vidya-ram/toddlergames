$(document).ready(function(){

	audio_support = !!(document.createElement('audio').canPlayType);   //check if browser supports audio tag of HTML5
	playing = false;
	timer=0;
	autoplay_time=10000;	
	animate_time = 6000;
	number_of_slides = $("#leftside-display div").length;
	last_slide = number_of_slides - 1;
	screen_width=$(".container").css("width");
	screen_width = parseInt(screen_width.replace("px",""));

	for(i=0; i<number_of_slides; i++){
	   $("#slide-indicator p:eq("+i+")").bind("click",select);
	}
		
	$("#prev").click(function() {	
	  if(playing)
	  {
		  clearTimeout(timer);
		  playing = false;
	  }		
	  var active_slide = $(".active").index("#leftside-display div");
	  if (active_slide == 0)
	  {
		  $("#leftside-display div:eq("+ last_slide +")").addClass("active");   //display the last slide if present slide is 0th element.
		  $("#slide-indicator p:eq("+ last_slide +")").addClass("active"); 
	  }
	  else{
		  $(".active").prev().addClass("active");
	  }
	  $("#leftside-display div:eq("+ active_slide +")").removeClass("active");
	  $("#slide-indicator p:eq("+ active_slide +")").removeClass("active"); 	
	  animate();
	  audio_play();
	  playing = true;
	  timer=setTimeout("play()",autoplay_time);  				
	});
	
	$("#next").click(function() {	
	  if(playing)
	  {
		clearTimeout(timer);
		playing = false;
	  }		
	  show_next();
	  playing = true;	
	  timer=setTimeout("play()",autoplay_time);		
	});
	
	$(window).load(function(){
	  audio_play(); //first time playing
	  playing = true;
	  animate();
	  timer=setTimeout("play()",autoplay_time);
	});   				           		
});  

function select(){
	  if(playing){
		  clearTimeout(timer);
		  playing = false;
	  }
	  var click_slide = $(this).index("#slide-indicator p");	   
	  var active_slide = $(".active").index("#leftside-display div");
	  	  
	  $("#leftside-display div:eq("+ active_slide +")").removeClass("active");
	  $("#slide-indicator p:eq("+ active_slide +")").removeClass("active"); 
	  
	  $("#leftside-display div:eq("+ click_slide +")").addClass("active");
	  $("#slide-indicator p:eq("+ click_slide +")").addClass("active"); 
	  animate();
	  audio_play();
	  playing = true;
	  timer=setTimeout("play()",autoplay_time);						
}	

function show_next(){
	  var active_slide = $(".active").index("#leftside-display div");
	  if (active_slide == last_slide){
		  $("#leftside-display div:eq(0)").addClass("active");   //display the last slide if present slide is 0th element.
		  $("#slide-indicator p:eq(0)").addClass("active"); 
	  }
	  else{		  
	      $(".active").next().addClass("active");
	  }
	  $("#leftside-display div:eq("+ active_slide +")").removeClass("active");
	  $("#slide-indicator p:eq("+ active_slide +")").removeClass("active"); 
	  animate();
	  audio_play();	
}

					
function play()
{  
   show_next();
   timer=setTimeout("play()",autoplay_time);
}

function animate()
{
	if(screen_width > 479){
		$("#leftside-display").animate({marginLeft: "40%"}, animate_time).animate({marginLeft: "0"}, 1);
	}
}


function audio_play()
{
    if(audio_support){
		$("#leftside-display div.active").find("audio").trigger("play");
      	$("#speaker").fadeOut().fadeIn();
     }
}