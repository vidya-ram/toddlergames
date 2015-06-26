$(document).ready(function()
{
	audio_support = !!(document.createElement('audio').canPlayType);   //check if browser supports audio tag of HTML5
	var states = [
					{state : "Andhra Pradesh", capital:"Hyderabad", levelcompleted : false }, 
					{state : "Arunachal Pradesh", capital: "Itanagar", levelcompleted : false }, 
					{state : "Assam", capital: "Dispur", levelcompleted : false  }, 
					{state : "Bihar", capital: "Patna", levelcompleted : false },  
					{state : "Chhattisgarh", capital: "Raipur", levelcompleted : false }, 
					{state : "Goa", capital: "Panaji", levelcompleted : false }, 
					{state : "Gujarat", capital: "Gandhinagar", levelcompleted : false }, 
					{state : "Haryana", capital: "Chandigarh", levelcompleted : false },  
					{state : "Himachal Pradesh", capital: "Shimla", levelcompleted : false },  
					{state : "Jammu and Kashmir", capital: "Srinagar", levelcompleted : false },  
					{state : "Jharkhand", capital: "Ranchi", levelcompleted : false },  
					{state : "Karnataka", capital: "Bengaluru", levelcompleted : false },  
					{state : "Kerala", capital: "Thiruvananthapuram", levelcompleted : false },  
					{state : "Madhya Pradesh", capital: "Bhopal", levelcompleted : false },  
					{state : "Maharashtra", capital: "Mumbai", levelcompleted : false },  
					{state : "Manipur", capital: "Imphal", levelcompleted : false },  
					{state : "Meghalaya", capital: "Shillong", levelcompleted : false  }, 
					{state : "Mizoram", capital: "Aizawl", levelcompleted : false },  
					{state : "Nagaland", capital: "Kohima", levelcompleted : false },  
					{state : "Odisha", capital: "Bhubaneswar", levelcompleted : false },  
					{state : "Punjab", capital: "Chandigarh", levelcompleted : false },  
					{state : "Rajasthan", capital: "Jaipur", levelcompleted : false },  
					{state : "Sikkim", capital: "Gangtok", levelcompleted : false },  
					{state : "Tamil Nadu", capital: "Chennai", levelcompleted : false },  
					{state : "Telangana", capital: "Hyderabad", levelcompleted : false },  
					{state : "Tripura", capital: "Agartala", levelcompleted : false },  
					{state : "Uttar Pradesh", capital: "Lucknow", levelcompleted : false },  
					{state : "Uttarakhand", capital: "Dehradun", levelcompleted : false },  
					{state : "West Bengal", capital: "Kolkata", levelcompleted : false } 
					];
	var wait_time = 2500;
	var testState = -1;
	var counter = 0;
	var timer = false;

	$("#india").rwdImageMaps();

	$(window).load(function() {
		$("#loadingtxt").hide();
		$("#start").show();
	});

	$(window).resize(function() {
  		initCanvas();
  		var context = document.getElementById("hovercanvas").getContext('2d');
  		context.font = $("#hovercanvas").css("font-size") + " Verdana";
	});

	$("#start").click(function() { 
		$("#start").hide();
		$("#speaker").show();
		gameStart();
		$(".blackboard").show();
		initCanvas();
	});

	$("map[name=indiamap] area").click(function (event) {
		event.preventDefault();
		if(testState !== -1) {
			var center = getCenterPolygon($(this).attr("coords"))
			if ($(this).attr("id") == states[testState]["state"]) {
				var state = testState;
				testState = -1;
				var context = document.getElementById("hovercanvas").getContext('2d');
				context.fillStyle = "#000";
    			context.fillText(states[state]["state"], center.x, center.y); 
    			context.fillText(states[state]["capital"], center.x, center.y + parseInt($("#hovercanvas").css("font-size"), 10));
    			context.fillStyle = "#eef";
    			timer = setTimeout(function() {
    				var canvas = document.getElementById("hovercanvas");
    				var hoverCanvasContext = canvas.getContext('2d');
    				hoverCanvasContext.clearRect(0, 0, canvas.width, canvas.height);
    				timer = false;
    				gameStart();
				},wait_time);
			}
			else {
				var context = document.getElementById("hovercanvas").getContext('2d');
				context.fillStyle = "#000";
				context.fillText("Oops", center.x, center.y); 
				context.fillStyle = "#eef";
			}
		}

	});

	$("map[name=indiamap] area").mouseover(function () {
		if(testState !== -1) {
		  	var coords = $(this).attr("coords");
	    	drawCanvasOnHoverArea(coords);
    	}
	});

	$("map[name=indiamap] area").mouseout(function () {
		if(!timer) {
		  	var canvas = document.getElementById("hovercanvas");
	    	var hoverCanvasContext = canvas.getContext('2d');
	    	hoverCanvasContext.clearRect(0, 0, canvas.width, canvas.height);
		}
	});

	$("#speaker").click(function () {
		audio_play(states[testState]["state"]);
	});

	var gameStart =  function() {
		if (counter === states.length) {
			$("#speaker").hide();
			$(".blackboard").hide();
			testState = -1;
			$("#game-over-img").show(wait_time).delay(wait_time).hide(wait_time, function() {
				$(".blackboard").html('Restart');
				$(".blackboard").wrap('<a href="game11.html"></a>').show();
			});
		}
		else {
			do {
				testState = Math.floor(Math.random() * states.length);
			} while(states[testState]["levelcompleted"]);
			states[testState]["levelcompleted"] = true;
			counter++;
			$(".blackboard p").html(states[testState]["state"]);
			audio_play(states[testState]["state"]);
		}
	}

});

function audio_play(id)
{
	var id = "audio_" + id.toLowerCase().replace(/ /g,"");
    if(audio_support){
		$("#"+id).trigger("play");
      	$("#speaker").fadeOut().fadeIn();
     }
}

function getCenterPolygon(coords) {
    var coordsArray = coords.split(',');
    var x = 0;
    var y = 0;
    var center = { x: 0, y: 0};
    var left = $("#hovercanvas").offset().left;
    var canvasLeft = left + 100;
    var canvasRight = left + $("#hovercanvas").width() - 100;
    var pointLeft;

    for (var i = 2; i < coordsArray.length-1; i += 2) {
    	x += parseInt(coordsArray[i],10);
    	y += parseInt(coordsArray[i+1], 10);
    }
    center.x = x/(coordsArray.length/2);
    center.y = y/(coordsArray.length/2);
    pointLeft = left + center.x

    //To avoid text being cut by canvas corners.
    if(pointLeft < canvasLeft) {
    	center.x += 50;
    } 
    else if (pointLeft > canvasRight) {
    	center.x -= 50;
	}	
	return center;
}

function drawCanvasOnHoverArea(coords) {
    var coordsArray = coords.split(',');
    var canvasContext = document.getElementById("hovercanvas").getContext('2d');

    canvasContext.beginPath();
    canvasContext.moveTo(coordsArray[0], coordsArray[1]);
    for (var i = 2; i < coordsArray.length-1; i += 2) {
        canvasContext.lineTo(coordsArray[i], coordsArray[i+1]);
    }
    canvasContext.lineTo(coordsArray[0], coordsArray[1]);
    canvasContext.fill();
    canvasContext.stroke();
}

function initCanvas() {
	var mousePos= { x: 760, y: 760};
    var mapImg = $("#india");
    var canvas = $("#hovercanvas");
    var x,y, w,h;

    xpos = mapImg.offset().left;
    ypos = mapImg.offset().top;
		w = mapImg.width(),
		h = mapImg.height();

    canvas.css("z-index", 2);
    canvas.offset({ top: ypos, left: xpos });
    canvas.attr('width', w);
    canvas.attr('height', h);

    var context = document.getElementById("hovercanvas").getContext('2d');
    context.strokeStyle = "#bbb";
    context.fillStyle = "#eef";
    context.lineWidth = 2;
    context.font = $("#hovercanvas").css("font-size") + " Verdana";
	context.textAlign = "center";
}