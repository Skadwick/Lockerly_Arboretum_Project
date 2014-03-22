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
This file contains the main functions necessary for working with 
a database in php.

db_connect() -- function which attempts to connect to the server
which contains the database.

db_query($query, $db) -- function used for sending querys to
the database.  $query contains the query to be used, and $db contains
the database which is to be queried.

db_result_to_array($result) -- function which takes the result of
a sucessful query, and stores each of the rows from the resulting
table in an array.

-->

<?php

/*
db_connect attempts to connect to a server using the variables
which are defined within.  the MySQL server, the username, and the password
are all passed to mysql_connect, which then attempts to connect to the database.
mysql_connect returns a MySQL link identifier on success or FALSE on failure.
If failed to connect to the database, then an error is displayed.
*/
function db_connect()
{

	//Variables for local server testing
	$server="localhost";
	$username="root";
	$password="";
   	$dbName="???";
	
	//Server variables
	//$server="???";
	//$username="???";
	//$password="???";
    //$dbName="???";

    //Attempt to connect to the database, and set character-set.
    $link=mysql_connect($server, $username, $password) or die (mysql_error());
	mysql_set_charset('utf8',$link);

	//Display errors as needed
	if (!@mysql_select_db($dbName, $link)) 
	{
		echo "<p>Error connecting to database. This is the error message:</p>"; 
     	echo "<p><strong>" . mysql_error() . "</strong></p>"; 
     	echo "Please Contact Your Systems Administrator with the details"; 
     	exit();
	}

	return $link;
}


/*
Recieves a variable ($query) attempts to use that query on
the given database ($db).  If there is an error, then $result
will be set to false, and an error message will be generated.  

For SELECT, SHOW, DESCRIBE, EXPLAIN and other statements
returning resultset, mysql_query() returns a resource 
on success, or FALSE on error.

For other type of SQL statements, INSERT, UPDATE, DELETE,
 DROP, etc, mysql_query() returns TRUE on success or FALSE on error.

*/
function db_query($query, $db)
{
	//Attempt to query the database
	$result = mysql_query($query, $db);

	//Report any errors encountered
	if(!$result) 
	{
		die("SQL_QUERY_ERR: Query failed.\nFull query: $query");
	}

	return $result;
}


/*
This method uses a loop to iterate over a table which was the
result of a query statement.  Each row of the table is stored
in the result array, which is returned when all rows have been added.
*/
function db_result_to_array($result) 
{
   $res_array = array();
   $count=0;

   //Fetching each row of the relation stored in $result, and adding it
   //to the result array, $res_array.
   while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
   {
     $res_array[$count] = $row;
     $count++;
   }
   echo $res_array;
   return $res_array;
}

?>