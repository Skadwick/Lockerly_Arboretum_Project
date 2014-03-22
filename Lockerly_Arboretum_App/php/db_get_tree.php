<!--
@Authors
<Joshua Shadwick> (Joshua.Shadwick@bobcats.gcsu.edu)
<Phillip Vinson> (Phillip.Vinson@bobcats.gcsu.edu)
<William Smith> (William.Smith3@bobcats.gcsu.edu)

@Overview
This mobile webpage is for Lockerly Arboretum in Milledgeville, GA.  This project was
created by Joshua Shadwick, Phillip Vinson, and William Smith for CSCI 4320 (Software Engineering), 
instructed by Dr. Gita Phelps during the Spring 2014 semester.

This webpage's primary function is to help users locate and gather information about the
various donated trees on the property.  Visitors to Lockerly Arboretum will be able to
visit this page on their mobile device, and then search the database for trees based on
their donation date, tree species, and the names of the honoree or donor. Once the specified
tree(s) is found, it can be displayed on a map of the grounds - along with any other relevant
information about the tree.

@file description
This php file will create the main search query of the database. The base query
is created first, and then any search selections made by the user are added
to the end, in the WHERE portion of the query.

This file also links to the db_connect.php file, which allows this file to
connect to the database, and then send queries to the database.

===============================================================================
===============================================================================
NOTE: THE QUERY LINES BELOW ARE JUST MADEUP AS AN EXAMPLE! I WILL CHANGE IT TO
THE ACTUAL QUERY ONCE WE HAVE ACCESS TO THE DATABASE OR AT LEAST ONCE WE
KNOW HOW IT IS SETUP.
===============================================================================
===============================================================================

-->

<?php

//Ling to db_connect.php
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
$sql_query = "SELECT attribute1, 
					 attribute2,
					 attribute3
			  FROM table1,
			  	   table2,
			  WHERE something1 = something_else1
			    AND something2 = something_else2";


//Check if the user is searching for donor or honoree name.  If so, add it to the query.
if (isset($searchName) && $searchName != '')
{
	$sql_query = $sql_query . " AND (tree.donor_name LIKE '%" . $searchName . 
									"%' OR tree.honoree_name LIKE '%" . $searchName . "%')";
}


//Check if the user is searching for a specific donation date.  If so, add it to the query.
if (isset($searchDate) && $searchDate != '')
{
	$sql_query = $sql_query . " AND tree.donation_date = '" . $searchDate . "'";
}


//Check if the user is searching for a specific species.  If so, add it to the query.
if (isset($searchSpecies) && $searchSpecies != '')
{
	$sql_query = $sql_query . " AND tree.species = '" . $searchSpecies . "'";
}


//Send the query to the database
$result = db_query($sql_query, $link);


//Loop through each row of the resulting relation and do whatever work is necessary.
while ( $row = mysql_fetch_array($result,MYSQL_ASSOC) )
{ 
	//ADD WORK NEEDED TO BE DONE ON EACH ROW HERE!!!
}
	
?>