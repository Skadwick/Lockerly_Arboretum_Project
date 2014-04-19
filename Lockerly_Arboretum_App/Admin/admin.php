<?php

//Connect to the database
include ('../php/db_connect.php');
$link=db_connect();


/*
If the values in the user and pwd forms are set, then the user has tried to
log in.  Check their input, and see if it matches an admin stored in the database.
If a correct login was entered, then setup the admin session.
*/
if( isset($_POST['user']) && isset($_POST['pwd']) )
{
	$query = 'SELECT * 
			  FROM admin 
			  WHERE username="' . $_POST['user'] . '"
			  AND password="' . $_POST['pwd'] . '"';

	//Text to help with testing
	echo '<h3>Query: </h3>' . $query;

	//Check the query result
	$result = mysql_query($query);
	if(!$result){
		die("Database access failed: ".mysql_error());
	}
	$rows = mysql_num_rows($result);
	for($r = 0; $r < $rows; $r++){
		$user = mysql_result($result,$r, 'username');
	}

	//if results are returned, login information was correct, setup admin session.
	if(isset($user)){ 
		$_SESSION['userName'] = $user;
	}
	else
	{
		echo '<br>Incorrect username or password.';
	}

}


/*
If the database was successfully queried, then the session variable userName will
be set.  If they are sucessfully logged in, then display their options as an admin.
*/
if( isset($_SESSION['userName']) )
{	
	echo '<br>Logged in as: '. $_SESSION['userName'];
}


/*
Display input fields which allow the user to enter admin login information
*/
else
{
	echo '<h1>Please enter your admin information below.</h1>
		<form action="./admin.php" method="post">
		  	<table>
		  		<tr><td class = "login">Username: </td><td class = "login"><input type="text" name="user"></td></tr>
		  		<tr><td class = "login">Password: </td><td class = "login"><input type="password" name="pwd"></td></tr>
		  	</table>
		  	<input type="image" name="submit" value="submit" src="http://i.imgur.com/w8Xwr7g.png" />
		</form>';
}

?>