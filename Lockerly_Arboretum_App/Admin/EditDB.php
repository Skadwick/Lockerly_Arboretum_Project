<?php

//Starting the session
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

//Check if the user is logged in, and give them the option to logout
if( isset($_SESSION['userName']) )
{	
	echo '<br>Logged in as: '. $_SESSION['userName'] . '<br>
		  <a href="./admin.php?logout=true">Logout</a><br><br>';
}
else
{
	//Send them back if they are not logged in
	echo 'You do not have permission to view this page.<br>';
	echo '<script>window.location = "./admin.php";</script>';	
}

//Display form for adding a tree to the database
if($_GET['AddRemove'] == 'tree')
{
	echo 'tree';

	include ('EditPlant.php');

}

//Display form for removing a tree from the database
else if($_GET['AddRemove'] == 'donor')
{
	echo 'donor';
	include ('EditDonor.php');

}

else if($_GET['AddRemove'] == 'honoree')
{
	echo 'honoree';
	include ('EditHonoree.php');
}

?>