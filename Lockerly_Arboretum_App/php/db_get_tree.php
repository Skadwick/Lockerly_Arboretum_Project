<?php

//Link to db_connect.php
include ('../php/db_connect.php');

/*
Setting the necessary variables to setup the user's query. All of the
$_GET[] values are set in the javascript function that calls this file.
*/
$searchName = $_GET['name'];
$searchDate = $_GET['date'];
$searchSpecies = $_GET['species'];
$link=db_connect();

/*
Creating the 'base' query. All other user choices will be
concatenated to the end of this string.

This is just an example for now
*/
$sql_query = "SELECT plants.Species,
					 plants.Date,
					 honorees.Hon_first,
					 honorees.Hon_last
			  FROM plants,
			  	   honorees
			  WHERE honorees.Hon_id = plants.Hon_id";


//Check if the user is searching for a name.  If so, add it to the query.
if (isset($searchName) && $searchName != '')
{
	$sql_query = $sql_query . " AND honorees.Hon_first LIKE '%" . $searchName . "%'";
}


//Check if the user is searching for a specific donation date.  If so, add it to the query.
if (isset($searchDate) && $searchDate != 'all')
{
	$sql_query = $sql_query . " AND plants.Date = '" . $searchDate . "'";
}


//Check if the user is searching for a specific species.  If so, add it to the query.
if (isset($searchSpecies) && $searchSpecies != 'all')
{
	$sql_query = $sql_query . " AND plants.Species = '" . $searchSpecies . "'";
}


//Send the query to the database
$result = db_query($sql_query, $link);
$myArray = array(); //JSON encoded Array, each element is an array containing the elements of a row.

//Loop through each row of the resulting relation and do whatever work is necessary.
while ( $row = mysql_fetch_array($result,MYSQL_ASSOC) )
{ 
	//Associative array.  key => value, key2 => value2, etc...
	$entity = array('fName' => $row['Hon_first'] ,
				   'lName' => $row['Hon_last'] ,
				   'date' => $row['Date'] ,
				   'species' => $row['Species']);
	array_push($myArray,$entity);
}

//Encode the array
$newArray = array('media' =>$myArray);
$output= json_encode($newArray);

echo $output;
mysql_close($link);
	
?>