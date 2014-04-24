<?php

//Link to db_connect.php
include ('../php/db_connect.php');

$myArray = array(); //JSON encoded Array

//Connect to the database
$link=db_connect();

//If called from the initialize data method...
if( isset($_GET['initialize']) )
{

	//Find all the distinct dates in which trees were donates
	$sql_query = "SELECT DISTINCT don_date
				  FROM plants";

	//Send the query to the database
	$result = db_query($sql_query, $link);
	$myArray = array(); //JSON encoded Array

	//Loop through each row of the resulting relation and do whatever work is necessary.
	while ( $row = mysql_fetch_array($result,MYSQL_ASSOC) )
	{ 
		//Associative array.  key => value, key2 => value2, etc...
		$entity = array('year' => $row['don_date']);
		array_push($myArray,$entity);
	}


	//Find all the distinct common names for the trees at lockerly
	$sql_query = "SELECT DISTINCT common
				  FROM plants
				  ORDER BY common";
	$result = db_query($sql_query, $link);
	while ( $row = mysql_fetch_array($result,MYSQL_ASSOC) )
	{ 
		$entity = array('common' => $row['common']);
		array_push($myArray,$entity);
	}
}


//If any of these variables are set, then the user is searching for a tree.
else if( isset($_GET['name']) || isset($_GET['year']) || isset($_GET['species']))
{
	$searchName = $_GET['name'];
	$searchYear = $_GET['year'];
	$searchCommon = $_GET['species'];

	/*
	Creating the 'base' query for a tree search. All other user choices will be
	concatenated to the end of this string.
	*/
	$sql_query = "SELECT plants.plant_id,
						 donors.fname AS don_first,
						 donors.lname AS don_last,
						 honorees.fname AS hon_first,
						 honorees.lname AS hon_last,
						 plants.common,
						 plants.don_date
				  FROM plants
				  LEFT JOIN Common ON Common.common = Plants.common
				  LEFT JOIN Donors ON Donors.don_id = Plants.don_id
				  INNER JOIN Honorees ON Honorees.hon_id = Plants.hon_id
				  WHERE plants.plant_id > 0";

	//Add additional information to the query
				  /*
	if (isset($searchName) && $searchName != '')
	{
		$sql_query = $sql_query . " AND Donor LIKE '%" . $searchName . "%'";
	}*/
	if (isset($searchYear) && $searchYear != 'all')
	{
		$sql_query = $sql_query . " AND plants.don_date LIKE '%" . $searchYear . "%'";
	}
	if (isset($searchCommon) && $searchCommon != 'all')
	{
		$sql_query = $sql_query . " AND plants.common LIKE '%" . $searchCommon . "%'";
	}

	//Send the query to the database
	$result = db_query($sql_query, $link);
	$myArray = array(); //JSON encoded Array, each element is an array containing the elements of a row.

	//Loop through each row of the resulting relation and do whatever work is necessary.
	while ( $row = mysql_fetch_array($result,MYSQL_ASSOC) )
	{ 
		//Associative array.  key => value, key2 => value2, etc...
		$entity = array('id' => $row['plant_id'] ,
						'don_fName' => $row['don_first'] ,
						'don_lName' => $row['don_last'] ,
						'hon_fName' => $row['hon_first'] ,
						'hon_lName' => $row['hon_last'] ,
						'common' => $row['common'] ,
						'don_date' => $row['don_date']);
		array_push($myArray,$entity);
	}
}


//If user is trying to map a tree, then id will be set
if( isset($_GET['id']) )
{
	$id = $_GET['id'];
	$sql_query = 'SELECT common,
						 lat,
						 lon
				  FROM plants
				  WHERE (plant_id = ' . intval($id) . ')';

	//Send the query to the database
	$result = db_query($sql_query, $link);
	$myArray = array(); //JSON encoded Array, each element is an array containing the elements of a row.

	//Loop through each row of the resulting relation and do whatever work is necessary.
	while ( $row = mysql_fetch_array($result,MYSQL_ASSOC) )
	{ 
		//Associative array.  key => value, key2 => value2, etc...
		$entity = array('common' => $row['common'] ,
					   'lon' => $row['lon'] ,
					   'lat' => $row['lat']);
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