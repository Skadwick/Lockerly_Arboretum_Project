//pop up error message controller.

var popup = function(msg){
	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><p>"+msg+"</p></div>")
	.css({ display: "block", 
		opacity: 1.00, 
		position: "fixed",
		padding: "7px",
		"text-align": "center",
		width: "500px",
		left: "50%",
		top: "20%",
		"color": "Red"})	//Not working, want to change color of font. also tried doing this in the p section above
	.appendTo( $.mobile.pageContainer ).delay( 1500 )
	.fadeOut( 400, function(){
		$(this).remove();
	});
}