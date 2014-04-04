/*
@Authors
<Joshua Shadwick> (Joshua.Shadwick@bobcats.gcsu.edu)
<Phillip Vinson> (Phillip.Vinson@bobcats.gcsu.edu)
<William Smith> (William.Smith3@bobcats.gcsu.edu)

@Overview
This mobile webpage is for Lockerly Arboretum in Milledgeville, GA.  This project was
created by Joshua Shadwick, Phillip Vinson, and William Smith for CSCI 4320 (Software Engineering), 
instructed by Dr. Gita Phelps during the Spring 2014 semester.

This webpage's primary function is to help users locate and gather information about the
various donated trees on the property.  Visitors to Lockerly Arboretum will be able to
visit this page on their mobile device, and then search the database for trees based on
their donation date, tree species, and the names of the honoree or donor. Once the specified
tree(s) is found, it can be displayed on a map of the grounds - along with any other relevant
information about the tree.

@file description
*/


/*
The XMLHttpRequest object is used to exchange data with a server behind the scenes.

"The XMLHttpRequest object is a developer's dream, because you can:
Update a web page without reloading the page, Request data from a server after the page has loaded,
Receive data from a server after the page has loaded, Send data to a server in the background"
*/
var requestObj = false;
requestObj = new XMLHttpRequest();



/*
This function populates the necessary dropdown menus for the search screen.
*/
function initializeData()
{
	requestObj.open("GET", "./php/db_query.php?initialize=true", true);
	requestObj.onreadystatechange = showYears;
	requestObj.send(null);
	alert('Database Loaded!');
}



/*

*/
function showYears()
{
	if (requestObj.readyState == 4) //Request completed
	{
		//Retrieve the JSON encoded array, which is stored at index-key: media
		var text = requestObj.responseText;
	    var years = jQuery.parseJSON(text).media;	
		//$('#select-choice-1').text('');

		//Alert the number of rows, for testing purposes
		alert(years.length + " results.");

		//Loop through the JSON array, and add each element to a <li>, which is then added to the <ul>
		for(var i = 0; i < years.length; i++)
		{
			var year = years[i];
			//var option = $('#yearMenu').clone();

			$('#select-choice-1').append('<option id="yearMenu" value="' + year['year'] + '">' + year['year'] + '</option>');

		}		
	}


}



/*
This function is called when the ready state of the XMLHttpRequest object changes
its ready state.  Once the ready state is 4, then the request is complete and a
response has been received. The response text of the request is received, and the
JSON encoded array is extracted.  This array contains the results from the search
query.  Finally, each element of the array (which is one row or entity) if added to
an unordered list in the index file, '#treeUL'.
*/
function showTreeContent()
{
	if (requestObj.readyState == 4) //Request completed
	{
		//Retrieve the JSON encoded array, which is stored at index-key: media
		var text = requestObj.responseText;
		alert(text);
	    var myTrees = jQuery.parseJSON(text).media;	
		$('#treesUL').text('');

		//Alert the number of rows, for testing purposes
		alert(myTrees.length + " results.");

		//Loop through the JSON array, and add each element to a <li>, which is then added to the <ul>
		for(var i = 0; i < myTrees.length; i++)
		{
			var tree = myTrees[i];
			var li =$('#treesLI').clone();
			li.removeAttr('id');
			li.appendTo('#treesUL');
			
			li.find('.donorName').text(tree['donor']);
			li.find('.honoreeName').text(tree['honoree']);
			li.find('.dedicationText').text(tree['dedication']);
			li.find('.commonName').text(tree['common']);
			li.data('treeID','tree'+i);			
		}		
	}
}



/*
searchDB() is called from the tree search page.  After being called, it retrieves user
input search terms, if they entered any.  Then it opens a GET request with the XMLHttpRequest object
on the db_get_tree.php file, and sends values for name, data, and species.
*/
function searchDB()
{
	//Create variables based on the user input in the index.html file
	var name = $("#name-a").val();
	var year = $("#select-choice-1").val();
	var species = $("#select-choice-2").val();

	//Send open a GET request with db_get_tree.php, and call showTreeContent when finished
	requestObj.open("GET", "./php/db_query.php?name=" + name + "&year=" + year + "&species=" + species + "", true);
	requestObj.onreadystatechange = showTreeContent;
	requestObj.send(null);

	//Alert for testing purposes
	alert("Name:  " + name + ", Year: " + year + ", Species: " + species);
}

