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
This is to be called when admin Login button is pressed
Will handle the login procedure
*/

function adminLogin()
{

	//get userName and password variables
	var userName = $('#userName').val();
	var password = $('#password-1').val();

	if(userName == "test" && password == "test")
	{
		//Debugging purposes only!!! ensuring logic works
		$('#adminLogin p').text("Login Successful!");

		//Show the edit tree and new tree link/button
		$("#newTreeBtn").show();
		$("#editTreeBtn").show();
	}
	else
	{
		if(userName == "" && password == "")
		{
			$('#adminLogin p').html("Failed Login, Try Again!<br>You entered Username: NULL" + "<br>Password: NULL" + "<br> TESTING ONLY");
		}
		else if (password == "")
		{
			$('#adminLogin p').html("Failed Login, Try Again!<br>You entered Username: " + userName + "<br>Password: NULL" + "<br> TESTING ONLY");
		}
		else if (userName == "")
		{
			$('#adminLogin p').html("Failed Login, Try Again!<br>You entered Username: NULL" + "<br>Password: " + password + "<br> TESTING ONLY");
		}
		else
		{
			$('#adminLogin p').html("Failed Login, Try Again!<br>You entered Username: " + userName + "<br>Password: " + password + "<br> TESTING ONLY");
		}	
	}
}