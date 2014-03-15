//Called when sumbit is pressed on the New Tree Page, under the Admin Page
//Used to submit all new data to the Database

function newTreeSubmit()
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
	$('#newTree p').html("Submit contents of form to Database.<br>"
		+ "Species: " + species + "<br>"
		+ "GPS: " + gpsCords + "<br>"
		+ "Donor: " + donorName + "<br>"
		+ "Honoree: " + honoreeName + "<br>"
		+ "Value: " + value + "<br>"
		+ "Age: " + age + "<br>"
		+ "Extra: " + extraInfo);
}