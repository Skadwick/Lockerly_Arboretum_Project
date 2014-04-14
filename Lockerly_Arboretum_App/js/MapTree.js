
//Map variables
var map;		//hold map
var genMarker;	//hold temporary marker
var xdata;		//hold X point for map
var ydata;		//hold Y point for map
	
//DEBUGGING ONLY!!
//Set up the initial marker
xdata = 33.061414;	//Set the map to initially point at Lockerly Arboretum
ydata = -83.225214;

//PHP Request variables
var requestObj = false;
requestObj = new XMLHttpRequest();

//Other
var data;
//google.maps.event.addDomListener(window, 'load', initialize);


function initializeMap(id)
{
	requestObj.open("GET", "./php/db_query.php?id=" + id + "", true);
	requestObj.onreadystatechange = mapReady;
	requestObj.send(null);
}



/*

*/
function mapReady()
{
	if (requestObj.readyState == 4) //Request completed
	{
		//window.location="map.html";
		//$("link[href='css/design.css']").remove();
		//Retrieve the JSON encoded array, which is stored at index-key: media
		var text = requestObj.responseText;
		alert(text);
	    var data = jQuery.parseJSON(text).media;

		//Loop through the JSON array, and add each element to a <li>, which is then added to the <ul>
		for(var i = 0; i < data.length; i++)
		{
			var tree = data[i];
			xdata = tree.lng;
			ydata = tree.lat;
			displayMap();
		}		
	}
}



/*

*/
function displayMap()
{

	//Set map to initially look at Lockerly Arboretum
	var myLatlng = new google.maps.LatLng(33.061414, -83.226385);
		
	//Set map options, zoom, cetner, type
	var mapOptions = 
	{
		zoom: 18,									//sets zoome to 18%
		center: myLatlng,							//Center map on points from above
		mapTypeId: google.maps.MapTypeId.SATELLITE	//set map to use satellite view (other views: ROAD, TERRAIN, HYBRID)
	};
	  
	//Set up map object using style from top of code
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		
	//Create the DIV to hold the user controls and
	//call the HomeControl() constructor passing
	//in this DIV.
    var homeControlDiv = document.createElement('div');
	var homeControl = new HomeControl(homeControlDiv, map);

	homeControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);	//set position of controls
}



function HomeControl(controlDiv, map) {

	  //Set CSS styles for the DIV containing the control
	  //Setting padding to 5 px will offset the control
	  //from the edge of the map
	  controlDiv.style.padding = '5px';

	  //Set CSS for the control border
	  var controlUI = document.createElement('div');
	  controlUI.style.backgroundColor = 'white';
	  controlUI.style.borderStyle = 'solid';
	  controlUI.style.borderWidth = '2px';
	  controlUI.style.cursor = 'pointer';
	  controlUI.style.textAlign = 'center';
	  controlUI.title = 'Click to set marker';
	  controlDiv.appendChild(controlUI);

	  //Set CSS for the control interior
	  var controlText = document.createElement('div');
	  controlText.style.fontFamily = 'Arial,sans-serif';
	  controlText.style.fontSize = '12px';
	  controlText.style.paddingLeft = '4px';
	  controlText.style.paddingRight = '4px';
	  controlText.innerHTML = '<b>Set Marker</b>';
	  controlUI.appendChild(controlText);

	  //Click event will generate new marker on the map.
	  google.maps.event.addDomListener(controlUI, 'click', function() 
	  {
		//set up lat and long for marker
		alert(xdata);
	    myLatlng = new google.maps.LatLng(xdata, ydata);
		genMarker = myLatlng;	//holds points for marker
		  
		//To add the marker to the map, use the 'map' property
		var marker = new google.maps.Marker(
		{
			position: genMarker,	//sets marker to the current position being held in genMarker
			map: map,				//Refreshes map
			title:"Test Marker!"	//Sets the title of the marker  (Will hold data pertaining to marker upon completion.
		});
		
		//DEBUGGING ONLY!!
		//Moves the maker slightly every time the set marker is clicked
		xdata =xdata + .0001;
		ydata =ydata + .0001;
		
	  });
	}