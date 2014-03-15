//This is to be called when admin Login button is pressed
//Will handle the login procedure

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