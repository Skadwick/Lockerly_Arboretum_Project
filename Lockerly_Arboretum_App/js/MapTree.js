
//Map variables
var map;		//hold map
var genMarker;	//hold temporary marker
var treeLat;		//hold X point for map
var treeLng;		//hold Y point for map
	
//DEBUGGING ONLY!!
//Set up the initial marker
treeLat = 33.061414;	//Set the map to initially point at Lockerly Arboretum
treeLng = -83.225214;

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
		alert(text);
	    var data = jQuery.parseJSON(text).media;

	    //Retrieve necessary data
		var tree = data[0];
		treeLat = tree.lat;
		treeLon = tree.lon;
	
		displayMap();	
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

	//set up lat and long for marker
	myLatlng = new google.maps.LatLng(treeLat, treeLon);
	genMarker = myLatlng;	//holds points for marker
		  
	//To add the marker to the map, use the 'map' property
	var marker = new google.maps.Marker(
	{
		position: genMarker,	//sets marker to the current position being held in genMarker
		map: map,				//Refreshes map
		title:"Test Marker!"	//Sets the title of the marker  (Will hold data pertaining to marker upon completion.
	});
}