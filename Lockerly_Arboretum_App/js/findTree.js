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
This function creates the link to allow the program to begin sending and receiving data
with the server.  Each time the ready state of the request changes, the showTreeContent()
function is called.

open(method,url,async) - Specifies the type of request, the URL, and if the 
request should be handled asynchronously or not.

send(string) - Sends the request off to the server.
*/
function initializeData()
{
	requestObj.open("GET", "../php/db_get_tree.php", true);
	requestObj.onreadystatechange = showTreeContent;
	requestObj.send(null);
}


/*

*/
function showTreeContent()
{
	if (requestObj.readyState == 4) //Request completed
	{
		
	}


}


/*

*/
function searchDB()
{

}