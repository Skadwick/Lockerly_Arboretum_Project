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
   	$dbName="lockarbordb";
	
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
	$result = mysql_query($query, $db);
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

   while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
   {
     $res_array[$count] = $row;
     $count++;
   }
   echo $res_array;
   return $res_array;
}

?>