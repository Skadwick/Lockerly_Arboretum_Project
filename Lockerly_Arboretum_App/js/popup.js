//pop up error message controller.

var popup = function(msg)
{
	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><p class = 'black'>" +  msg  + "</p></div>")
	.css({ display: "block", 
		opacity: 1.00, 
		position: "fixed",
		padding: "7px",
		"text-align": "center",
		width: "500px",
		left: "35%",
		top: "20%" })
	.appendTo( $.mobile.pageContainer ).delay( 1500 )
	.fadeOut( 400, function(){
		$(this).remove();
	});
}