<?php

//Link to db_connect.php
include ('../php/db_connect.php');

$myArray = array(); //JSON encoded Array

$link=db_connect(); //Connect to the database, and store the link in a variable


/*
GET[iniialize] is set when this file is called from the initialize() method.  This method
finds all of the distinct dates, and tree species stored on the database.  This information
is used to populate the dropdown menus on the Find a Tree page.
*/
if( isset($_GET['initialize']) )
{
	$sql_query = "SELECT DISTINCT don_date
				  FROM plants";

	$result = db_query($sql_query, $link); //Query the database, and store the result
	$myArray = array(); //JSON encoded Array

	//Loop through each row of the resulting relation
	while ( $row = mysql_fetch_array($result,MYSQL_ASSOC) )
	{ 
		//Store result in an associative array, and then
		//store the associative array in the JSON array  
		//key => value
		$entity = array('year' => $row['don_date']);
		array_push($myArray,$entity);
	}

	//Same thing as above, but finding distinct common species in the DB
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


/*
GET[name], GET[year], or GET[species] is set when this file is called from the searchDB() method.  
This if statement searches the database for all the trees which meet the search criteria, and
sends the result to the calling javascript method.
*/
else if( isset($_GET['name']) || isset($_GET['year']) || isset($_GET['species']))
{
	//Store the user input
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
	if (isset($searchName) && $searchName != '')
	{
		$sql_query = $sql_query . " AND (donors.fname LIKE '%" . $searchName . "%' 
										OR donors.lname LIKE '%" . $searchName . "%'
										OR honorees.fname LIKE '%" . $searchName . "%'
										OR honorees.lname LIKE '%" . $searchName . "%')";
	}
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


//Encode the array, and echo it.  When echo'd, the javascript method that
//called this file can retrieve the information via an XMLHttpRequest response.
$newArray = array('media' =>$myArray);
$output= json_encode($newArray);
echo $output;

//Close the connection
mysql_close($link);
?>