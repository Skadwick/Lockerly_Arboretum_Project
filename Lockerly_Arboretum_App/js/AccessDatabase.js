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
	//alert('Database Loaded!');
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
		//alert(years.length + " results.");

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
	    var myTrees = jQuery.parseJSON(text).media;

		$('#treesUL').text('');

		//Loop through the JSON array, and add each element to a <li>, which is then added to the <ul>
		for(var i = 0; i < myTrees.length; i++)
		{
			var tree = myTrees[i];
			var li =$('#treesLI').clone();
			li.text('');

			var html = formatTreeContent(tree);
			li.append(html);

			li.removeAttr('id');
			li.appendTo('#treesUL');		
		}		
	}
}



/*
Formats the results of the query into html, which will be added to a li tag.
*/
function formatTreeContent(list)
{

	var tree = list;
	var donorStr;
	var honoreeStr;
	var speciesStr;
	var dateStr;
	var formatStr;

	//Check for null values
	if (tree.don_fName == null)
		tree.don_fName = '';
	if (tree.don_lName == null)
		tree.don_lName = '';
	if (tree.hon_fName == null)
		tree.hon_fName = '';
	if (tree.hon_lName == null)
		tree.hon_lName = '';
	if (tree.common == null)
		tree.common = '';
	if (tree.don_date == null)
		tree.don_date = '0000-00-00';

	//Check if the tree donor is listed
	if( tree.don_fName.length > 1 || tree.don_lName.length > 1) 
		donorStr = 'Donated by ' + tree.don_fName + ' ' + tree.don_lName + ' ';
	else
		donorStr = 'Donated ';

	//Check if a honoree is listed for the tree
	if(tree.hon_fName.length > 1 || tree.hon_lName.length > 1)
		honoreeStr = 'for ' + tree.hon_fName + ' ' + tree.hon_lName + ' ';
	else
		honoreeStr = '';

	//Check if the tree common name is listed
	if (tree.common != null && tree.common.length > 1)
		speciesStr = 'Species: ' + tree.common;
	else
		speciesStr = 'Unknown species';

	//Check of the tree donation date is set
	if (tree.don_date != null && tree.don_date != '0000-00-00')
		dateStr = '<br>Donation date: ' + tree.don_date;
	else
		dateStr = '<br>Unknown donation date'

	formatStr = '<a class="resultLink" href = "#map-canvas" onClick = "initializeMap(' + tree.id +')">' + 
					'<div class="resultNames"><span class="donorName">' + donorStr + '</span>' + 
					'<span class="honoreeName">' + honoreeStr + '</span>' +
					'</div>' +
					'<div class="resultInfo"><span class="treeName">' + speciesStr + '</span>' +
					'<span class="donationDate">' + dateStr + '</span>' +
					'</div></a>';

	return formatStr;
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
}

