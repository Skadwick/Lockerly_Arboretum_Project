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
else if( isset($_POST['don_id']) && $_POST['don_id'] != null )
{

	$sql_query = "INSERT INTO donors (don_id,
									  fname,
									  lname) 
				  VALUES (" . $_POST['don_id'] . ",
				  		  '" . $_POST['fname'] . "', 
				  		  '" . $_POST['lname'] . "')";

	$result = db_query($sql_query, $link);
	echo "Donor sucessfully inserted into database!<br>The page will redirect you in a moment.";
	header( "refresh:3;url=index.php" );
}


else if( isset($_GET['deleteid']) )
{

	$sql_query = "DELETE FROM donors
  				  WHERE don_id=" . $_GET['deleteid'] . "";

	$result = db_query($sql_query, $link);
	echo "Donor sucessfully deleted!<br>The page will redirect you in a moment.";
	header( "refresh:3;url=EditDB.php?AddRemove=donor" );
}


//If they are logged in, but no form has POSTed, then display the form
else
{
	?> 
	<!--End php to display html-->

	<form action="../admin/EditDonor.php" method="post">

	<table>

		<tr>
			<td>don_id</td>
			<td><input type="text" name="don_id" maxlength="4" size="4"></td>
		</tr>

		<tr>
			<td>first name</td>
			<td><input type="text" name="fname" maxlength="20" size="20"></td>
		</tr>

		<tr>
			<td>last name</td>
			<td><input type="text" name="lname" maxlength="20" size="20"></td>
		</tr>

	</table>

	<input type="submit" name="submit" value="Add donor" />
	
</form><hr><br>


<?php

$sql_query = "SELECT *
			  FROM donors";
$result = db_query($sql_query, $link);

while ($row = mysql_fetch_assoc($result)) {
   formatDeleteRow($row);
}

} //end of else statement

//Formats the form containing the row to be deleted
function formatDeleteRow($row)
{
	echo '<form action="../admin/EditDonor.php?deleteid=' . $row['don_id'] . '" method="post">
	      <table>
	      	<tr> 
	      		<td> <input type="submit" name="submit" value="DELETE" /> </td>
	      		<td>don_id:  ' . $row['don_id'] . '</td>
	      		<td>  ' . $row['fname'] . '</td>
	      		<td>  ' . $row['lname'] . '</td>
	      	</tr>
	      </table>	
          </form>';
}

?>
