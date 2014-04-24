
//Map variables
var map;		//hold map
var genMarker;	//hold temporary marker
var treeLat;		//hold X point for map
var treeLon;		//hold Y point for map
var markerText;
	
//Set up the initial marker
var defaultLat = 33.061414;	//Set the map to initially point at Lockerly Arboretum
var defaultLon = -83.225214;

var mapCenterLat;
var mapCenterLon;

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
		//Retrieve the JSON encoded array, which is stored at index-key: media
		var text = requestObj.responseText;
	    var data = jQuery.parseJSON(text).media;

	    //Retrieve necessary data
		var tree = data[0];
		treeLat = tree.lat;
		treeLon = tree.lon;
		markerText = 'Species: ' + tree.common; // use \n to make the popup multi-lined.

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

*/
function displayMap()
{
	//Set map to initially look at Lockerly Arboretum
	var mapCenter = new google.maps.LatLng(mapCenterLat, mapCenterLon);
		
	//Set map options, zoom, cetner, type
	var mapOptions = 
	{
		zoom: 18,									//sets zoome to 18%
		center: mapCenter,							//Center map on points from above
		mapTypeId: google.maps.MapTypeId.SATELLITE	//set map to use satellite view (other views: ROAD, TERRAIN, HYBRID)
	};
	  
	//Set up map object using style from top of code
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	//set up lat and long for marker
	var myLatLon = new google.maps.LatLng(treeLat, treeLon);
	genMarker = myLatLon;	//holds points for marker
		  
	//To add the marker to the map, use the 'map' property
	var marker = new google.maps.Marker(
	{
		position: genMarker,	//sets marker to the current position being held in genMarker
		map: map,				//Refreshes map
		title:markerText	//Sets the title of the marker  (Will hold data pertaining to marker upon completion.
	});


	var backControlDiv = document.createElement('div');
	var backControl = new BackControl(backControlDiv, map);

	backControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(backControlDiv);
}



/*

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