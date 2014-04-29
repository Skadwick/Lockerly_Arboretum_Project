<?php

//Connect to the database
include ('../php/db_connect.php');
$link=db_connect();

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

//Redirect users who are not logged in
if( !isset($_SESSION['userName']) )
{
	echo 'You do not have permission to view this page.<br>';
	echo '<script>window.location = "./index.php";</script>';	
}


//If they are logged in, and a post from the form was made, then query the database
else if( isset($_POST['plant_id']) && $_POST['plant_id'] != null )
{

	$sql_query = "INSERT INTO plants (plant_id, 
									  lat,
									  lon,
									  common,
									  cultivar,
									  memory,
									  don_date,
									  don_id,
									  hon_id) 
				  VALUES (" . $_POST['plant_id'] . ",
				  		  '" . $_POST['lat'] . "',
				  		  '" . $_POST['lng'] . "',
				  		  '" . $_POST['common'] . "',
				  		  '" . $_POST['cultivar'] . "',
				  		  '" . $_POST['memory'] . "',
				  		  " . $_POST['don_date'] . ",
				  		  " . $_POST['don_id'] . ", 
				  		  " . $_POST['hon_id'] . ")";

	$result = db_query($sql_query, $link);
	echo "Plant sucessfully inserted into database!<br>The page will redirect you in a moment.";
	header( "refresh:3;url=index.php" );
}

else if( isset($_GET['deleteid']) )
{

	$sql_query = "DELETE FROM plants
  				  WHERE plant_id=" . $_GET['deleteid'] . "";

	$result = db_query($sql_query, $link);
	echo "Plant sucessfully deleted!<br>The page will redirect you in a moment.";
	header( "refresh:3;url=EditDB.php?AddRemove=tree" );
}


//If they are logged in, but no form has POSTed, then display the form
else
{
	?>

	<form action="../admin/EditPlant.php" method="post">

	<table>

		<tr>
			<td>plant_id</td>
			<td><input type="text" name="plant_id" maxlength="4" size="4"></td>
		</tr>

		<tr>
			<td>Latitude</td>
			<td><input type="text" name="lat" maxlength="15" size="15"></td>
		</tr>

		<tr>
			<td>Longitude</td>
			<td><input type="text" name="lng" maxlength="15" size="15"></td>
		</tr>

		<tr>
			<td>Common name</td>
			<td><input type="text" name="common" maxlength="20" size="20"></td>
		</tr>

		<tr>
			<td>Cultivar</td>
			<td><input type="text" name="cultivar" maxlength="20" size="20"></td>
		</tr>

		<tr>
			<td>Memory</td>
			<td><textarea name="memory" rows="4" cols="25"></textarea></td>
		</tr>

		<tr>
			<td>Donation date</td>
			<td><input type="text" name="don_date" maxlength="10" size="10"></td>
		</tr>

		<tr>
			<td>Hon_id</td>
			<td><input type="text" name="hon_id" maxlength="4" size="4"></td>
		</tr>

		<tr>
			<td>Don_id</td>
			<td><input type="text" name="don_id" maxlength="4" size="4"></td>
		</tr>

	</table>

	<input type="submit" name="submit" value="Add tree" />
	
</form><hr><br>


<?php

$sql_query = "SELECT *
			  FROM plants";
$result = db_query($sql_query, $link);

while ($row = mysql_fetch_assoc($result)) {
   formatDeleteRow($row);
}

} //End of else statement

//Formats the form containing the row to be deleted
function formatDeleteRow($row)
{
	echo '<form action="../admin/EditPlant.php?deleteid=' . $row['plant_id'] . '" method="post">
	      <table>
	      	<tr> 
	      		<td> <input type="submit" name="submit" value="DELETE" /> </td>
	      		<td>  plant_id:' . $row['plant_id'] . '</td>
	      		<td>  ' . $row['common'] . '</td>
	      		<td>  ' . $row['cultivar'] . '</td>
	      		<td>  Don_id:' . $row['don_id'] . '</td>
	      		<td>  Hon_id:' . $row['hon_id'] . '</td>
	      	</tr>
	      </table>	
          </form>';
}

?>
