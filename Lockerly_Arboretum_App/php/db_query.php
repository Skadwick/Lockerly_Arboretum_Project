<?php

//Link to db_connect.php
include ('../php/db_connect.php');

$myArray = array(); //JSON encoded Array

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
	$sql_query = "SELECT ID,
						 Donor,
						 Honoree,
						 Dedication,
						 Common,
						 Date,
						 Location
				  FROM plants
				  WHERE ID > 0";

	//Add additional information to the query
	if (isset($searchName) && $searchName != '')
	{
		$sql_query = $sql_query . " AND Donor LIKE '%" . $searchName . "%'";
	}
	if (isset($searchYear) && $searchYear != 'all')
	{
		$sql_query = $sql_query . " AND Year = '" . $searchYear . "'";
	}
	if (isset($searchSpecies) && $searchSpecies != 'all')
	{
		$sql_query = $sql_query . " AND Species = '" . $searchSpecies . "'";
	}

	//Send the query to the database
	$result = db_query($sql_query, $link);
	$myArray = array(); //JSON encoded Array, each element is an array containing the elements of a row.

	//Loop through each row of the resulting relation and do whatever work is necessary.
	while ( $row = mysql_fetch_array($result,MYSQL_ASSOC) )
	{ 
		//Associative array.  key => value, key2 => value2, etc...
		$entity = array('id' => $row['ID'] ,
						'donor' => $row['Donor'] ,
					   'honoree' => $row['Honoree'] ,
					   'dedication' => $row['Dedication'] ,
					   'common' => $row['Common'] ,
					   'date' => $row['Date'] ,
					   'location' => $row['Location']);
		array_push($myArray,$entity);
	}
}


//If user is trying to map a tree, then id will be set
if( isset($_GET['id']) )
{
	$id = $_GET['id'];
	$sql_query = 'SELECT ID,
						 Donor,
						 Honoree,
						 Dedication,
						 Common,
						 Date,
						 Location,
						 Lng,
						 Lat
				  FROM plants
				  WHERE (ID = ' . intval(102) . ')';

	echo $sql_query;

	//Send the query to the database
	$result = db_query($sql_query, $link);
	$myArray = array(); //JSON encoded Array, each element is an array containing the elements of a row.

	//Loop through each row of the resulting relation and do whatever work is necessary.
	while ( $row = mysql_fetch_array($result,MYSQL_ASSOC) )
	{ 
		//Associative array.  key => value, key2 => value2, etc...
		$entity = array('id' => $row['ID'] ,
						'donor' => $row['Donor'] ,
					   'honoree' => $row['Honoree'] ,
					   'dedication' => $row['Dedication'] ,
					   'common' => $row['Common'] ,
					   'date' => $row['Date'] ,
					   'location' => $row['Location'] ,
					   'lng' => $row['Lng'] ,
					   'lat' => $row['Lat']);
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