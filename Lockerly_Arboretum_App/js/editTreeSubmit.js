//Called when submit is pressed on the Edit Tree Page, under the Admin Page.
//Used to retrieve and submit new data to DB

function editTreeSubmit()
{
	//get form informationvariables
	var species = $('#select-species').val();
	var gpsCords = $('#gpsCords').val();
	var donorName = $('#donorName').val();
	var honoreeName = $('#honoreeName').val();
	var value = $('#value').val();
	var age = $('#age').val();
	var extraInfo = $('#extraInfo').val();

	//Debugging purposes only!!! ensuring logic works
	$('#editTree p').html("Submit contents of form to Database to edit existing info.<br>"
		+ "Species: " + species + "<br>"
		+ "GPS: " + gpsCords + "<br>"
		+ "Donor: " + donorName + "<br>"
		+ "Honoree: " + honoreeName + "<br>"
		+ "Value: " + value + "<br>"
		+ "Age: " + age + "<br>"
		+ "Extra: " + extraInfo);
}