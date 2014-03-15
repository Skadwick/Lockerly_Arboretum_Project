//Called when the clear button is pressed either on the New Tree or Edit Tree page, under the Admin Page
//Will clear all data from the form, either manually do this or force a page refresh to clear all data.

function clear()
{
	//Debugging purposes only!!! ensuring logic works
	$('#newTree p').text("Clear current contents, or perform a forced refresh page to clear contents.");
	$('#editTree p').text("Clear current contents, or perform a forced refresh page to clear contents.");
}