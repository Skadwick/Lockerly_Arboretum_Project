<?php

//Starting the session
session_start();

//Check if the user is logged in, and give them the option to logout
if( isset($_SESSION['userName']) )
{	
	echo '<br>Logged in as: '. $_SESSION['userName'] . '
		  <a href="./admin.php?logout=true">Logout</a><br><br>';
}
else
{
	//Send them back if they are not logged in
	echo '<script>window.location = "./admin.php";</script>';	
}

if($_GET['AddRemove'] == 'add')
{
	echo 'Add tree!';

}
else if($_GET['AddRemove'] == 'remove')
{
	echo 'Remove tree!';

}

?>