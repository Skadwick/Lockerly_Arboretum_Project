//Called when cancel is pressed on either the New Tree or Edit Tree page, under the Admin Page
//Used to close WITHOUT saving any data in either form, return user to the Admin Page
//KEEP ADMIN LOGGED IN

function cancel()
{
	//Debugging purposes only!!! ensuring logic works
	$('#newTree p').text("Return to admin page.");
	$('#editTree p').text("Return to admin page.");
}