/*
Author(s): Joshua Shadwick
Date: March 13, 2014
File: findTree.js
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