<?php

//Link to db_connect.php
include ('../php/db_connect.php');

//Connect to the database
$link=db_connect();

//If called from the initialize data method...
if( isset($_GET['initialize']) )
{

	$sql_query = "SELECT DISTINCT Year
				  FROM plants";

	//Send the query to the database
	$result = db_query($sql_query, $link);
	$myArray = array(); //JSON encoded Array

	//Loop through each row of the resulting relation and do whatever work is necessary.
	while ( $row = mysql_fetch_array($result,MYSQL_ASSOC) )
	{ 
		//Associative array.  key => value, key2 => value2, etc...
		$entity = array('year' => $row['Year']);
		array_push($myArray,$entity);
	}

}


//If any of these variables are set, then the user is searching for a tree.
else if( isset($_GET['name']) || isset($_GET['year']) || isset($_GET['species']))
{
	$searchName = $_GET['name'];
	$searchYear = $_GET['year'];
	$searchSpecies = $_GET['species'];

	/*
	Creating the 'base' query for a tree search. All other user choices will be
	concatenated to the end of this string.
	*/
	$sql_query = "SELECT plants.Species,
						 plants.Year,
						 honorees.Hon_first,
						 honorees.Hon_last
				  FROM plants,
				  	   honorees
				  WHERE honorees.Hon_id = plants.Hon_id";

	//Add additional information to the query
	if (isset($searchName) && $searchName != '')
	{
		$sql_query = $sql_query . " AND honorees.Hon_first LIKE '%" . $searchName . "%'";
	}
	if (isset($searchYear) && $searchYear != 'all')
	{
		$sql_query = $sql_query . " AND plants.Year = '" . $searchYear . "'";
	}
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
					   'year' => $row['Year'] ,
					   'species' => $row['Species']);
		array_push($myArray,$entity);
	}
}

//Encode the array
$newArray = array('media' =>$myArray);
$output= json_encode($newArray);
echo $output;

//Close the connection
mysql_close($link);
?>