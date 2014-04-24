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

//Display form for adding a tree to the database
if($_GET['AddRemove'] == 'add')
{
	echo 'Add tree!';

	echo '
		<form action="./index.php" method="post">
		<table>

			<tr>
				<td>plant_id</td>
				<td><input type="text" name="plant_id"></td>
			</tr>

			<tr>
				<td>lat</td>
				<td><input type="text" name="lat"></td>
			</tr>

			<tr>
				<td>lng</td>
				<td><input type="text" name="lng"></td>
			</tr>

		</table>
		<input type="submit" name="submit" value="Add tree" />
		</form>
	';

}

//Display form for removing a tree from the database
else if($_GET['AddRemove'] == 'remove')
{
	echo 'Remove tree!';

}

?>