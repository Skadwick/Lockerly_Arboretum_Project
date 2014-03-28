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
This javascript file holds all of the various scripts needed for different opertions
within this program.  
*/



/*
adminLogin() is a function that is called when the admin login button is pressed.  This
function handles the login procedure.  If incorrect login information is entered, then an
error message is displayed in a popup.
*/
function adminLogin()
{

	//get userName and password variables
	var userName = $('#userName').val();
	var password = $('#password-1').val();

	var errorMsg = "Failed Login! Try Again!";
	
	if(userName == "" || password == "")
	{
		popup(errorMsg);		
	}

	//Current user and pass hard coded in.  This should be pulled from the DB at some point.
	else if (userName == "test" && password == "test")
	{
		//Show the edit tree and new tree link/button
		$("#newTreeBtn").show();
		$("#editTreeBtn").show();

		//Debugging purposes only!!! ensuring logic works
		$('#adminLogin p').text("Login Successful!");		
	}

	else 
	{
		popup(errorMsg);
	}
}



/*
Called when the edit tree search button is pressed either on the Edit Tree page, under the Admin Page
will search for information in DB and fill form for editing.
*/
function editTreeSearch()
{
	//Debugging purposes only!!! ensuring logic works
	$('#editTree p').text("Searching DB.");
}



/*
Called when cancel is pressed on either the New Tree or Edit Tree page, under the Admin Page
Used to close WITHOUT saving any data in either form, return user to the Admin Page
KEEP ADMIN LOGGED IN
*/
function editTreeCancel()
{
	//Debugging purposes only!!! ensuring logic works
	$('#editTree p').text("Return to admin page.");
}




/*
Called when cancel is pressed on either the New Tree or Edit Tree page, under the Admin Page
Used to close WITHOUT saving any data in either form, return user to the Admin Page
KEEP ADMIN LOGGED IN
*/
function newTreeCancel()
{
	//Debugging purposes only!!! ensuring logic works
	$('#newTree p').text("Return to admin page.");
}



/*
called when the clear button is pressed on the new tree page, under the Admin Page
Will clear the form of all content, either forced refresh or a clear function.
*/
function newTreeClear()
{
	//Debugging purposes only!!! Logic Check
	$('#newTree p').html("Clearing contents of form.");	
}



/*
Called when submit is pressed on the Edit Tree Page, under the Admin Page.
Used to retrieve and submit new data to DB
*/
function editTreeSubmit()
{
	//get form informationvariables
	var species = $('#select-species').val();
	var gpsCords = $('#gpsCords').val();
	var donorName = $('#donorName').val();
	var honoreeName = $('#honoreeName').val();
	var value = $('#value').val();
	var age = $('#age').val();
	var extraInfo = $('#extraInfo').val();

	//Debugging purposes only!!! ensuring logic works
	$('#editTree p').html("Submit contents of form to Database to edit existing info.<br>"
		+ "Species: " + species + "<br>"
		+ "GPS: " + gpsCords + "<br>"
		+ "Donor: " + donorName + "<br>"
		+ "Honoree: " + honoreeName + "<br>"
		+ "Value: " + value + "<br>"
		+ "Age: " + age + "<br>"
		+ "Extra: " + extraInfo);
}



/*
Called when sumbit is pressed on the New Tree Page, under the Admin Page
Used to submit all new data to the Database
*/
function newTreeSubmit()
{
	//get form informationvariables
	var species = $('#select-species').val();
	var gpsCords = $('#gpsCords').val();
	var donorName = $('#donorName').val();
	var honoreeName = $('#honoreeName').val();
	var value = $('#value').val();
	var age = $('#age').val();
	var extraInfo = $('#extraInfo').val();

	//Debugging purposes only!!! ensuring logic works
	$('#newTree p').html("Submit contents of form to Database.<br>"
		+ "Species: " + species + "<br>"
		+ "GPS: " + gpsCords + "<br>"
		+ "Donor: " + donorName + "<br>"
		+ "Honoree: " + honoreeName + "<br>"
		+ "Value: " + value + "<br>"
		+ "Age: " + age + "<br>"
		+ "Extra: " + extraInfo);
}



/*
pop up error message controller.
*/
var popup = function(msg)
{
	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><p class = 'black'>" +  msg  + "</p></div>")
	.css({ display: "block", 
		opacity: 1.00, 
		position: "fixed",
		padding: "7px",
		"text-align": "center",
		width: "500px",
		left: "35%",
		top: "20%" })
	.appendTo( $.mobile.pageContainer ).delay( 1500 )
	.fadeOut( 400, function(){
		$(this).remove();
	});
}