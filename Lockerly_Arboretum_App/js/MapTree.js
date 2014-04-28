
var map;		//hold map
var genMarker;	//hold temporary marker
var treeLat;	//hold X point for map
var treeLon;	//hold Y point for map
var markerText;
	
//These coordinates point to the center of the grounds
var defaultLat = 33.061414;
var defaultLon = -83.225214;

//Information for where to center the map
var mapCenterLat;
var mapCenterLon;

//PHP Request variables
var requestObj = false;
requestObj = new XMLHttpRequest();

var data; //Response text from the server

function initializeMap(id)
{
	requestObj.open("GET", "./php/db_query.php?id=" + id + "", true);
	requestObj.onreadystatechange = mapReady;
	requestObj.send(null);
}



/*
This method is called once the XMLHttpRequest object is ready.  mapReady() retrieves
the result of the query, and exports the relevant data from the response text.
*/
function mapReady()
{
	if (requestObj.readyState == 4) //Request completed
	{
		//Retrieve the JSON encoded array, which is stored at index-key: media
		var text = requestObj.responseText;
	    var data = jQuery.parseJSON(text).media;

	    //Retrieve necessary data
		var tree = data[0];
		treeLat = tree.lat;
		treeLon = tree.lon;
		markerText = 'Species: ' + tree.common; // use \n to make the popup multi-lined.

		//If lattitude and longiture are set, then their length will be at least 3 characters long.
		//Set the center of the map to the point if it is set, or set the center to the default location.
		if(treeLat.length > 2 && treeLon.length > 2)
		{
			mapCenterLat = treeLat;
			mapCenterLon = treeLon;
		}
		else
		{
			mapCenterLat = defaultLat;
			mapCenterLon = defaultLon;
		}
	
		displayMap();	
	}
}



/*
This method is called once all necessary data is collected, and it initializes the
google map, and sets the data point to the proper location.
*/
function displayMap()
{
	var mapCenter = new google.maps.LatLng(mapCenterLat, mapCenterLon);
		
	//Set map options, zoom, cetner, type
	var mapOptions = 
	{
		zoom: 18,									//sets zoome to 18%
		center: mapCenter,							//Center map on points from above
		mapTypeId: google.maps.MapTypeId.SATELLITE	//set map to use satellite view (other views: ROAD, TERRAIN, HYBRID)
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	//set up lat and long for marker
	var myLatLon = new google.maps.LatLng(treeLat, treeLon);
	genMarker = myLatLon;	//holds points for marker
		  
	//To add the marker to the map, use the 'map' property
	var marker = new google.maps.Marker(
	{
		position: genMarker,	//sets marker to the current position being held in genMarker
		map: map,				//Refreshes map
		title:markerText		//Sets the title of the marker  (Will hold data pertaining to marker upon completion.
	});

	//Create the back button for the map display
	var backControlDiv = document.createElement('div');
	var backControl = new BackControl(backControlDiv, map);

	backControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(backControlDiv);
}



/*
Creates a button on the map.  This button, when clicked, returns the user
back to the tree search page.
*/
function BackControl(controlDiv, map) {

	  controlDiv.style.padding = '5px';

	  //Set CSS for the control border
	  var controlUI = document.createElement('div');
	  controlUI.style.backgroundColor = 'white';
	  controlUI.style.borderStyle = 'solid';
	  controlUI.style.borderWidth = '2px';
	  controlUI.style.cursor = 'pointer';
	  controlUI.style.textAlign = 'center';
	  controlUI.title = 'Click to search for a tree';
	  controlDiv.appendChild(controlUI);

	  //Set CSS for the control interior
	  var controlText = document.createElement('div');
	  controlText.style.fontFamily = 'Arial,sans-serif';
	  controlText.style.fontSize = '12px';
	  controlText.style.paddingLeft = '4px';
	  controlText.style.paddingRight = '4px';
	  controlText.innerHTML = '<b>Find a tree</b>';
	  controlUI.appendChild(controlText);

	  //Click event will redirect user to search page
	  google.maps.event.addDomListener(controlUI, 'click', function() 
	  {
		window.location = "index.html#findTree";	
	  });
	}