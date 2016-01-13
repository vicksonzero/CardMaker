// include
var $ = require('jquery');

// global variable
var template_svgData = null;
var template_dataURL = null;
var dataSheet = null;

// dom operations

$("#input-template-file").change(function(){
	console.log(this.files);

	if(this.files.length<=0){
		return;
	}
	// grab the first image in the FileList object and pass it to the function
	renderImage(this.files[0]);
});

$("#input-datasheet-file").change(function(){
	console.log(this.files);

	if(this.files.length<=0){
		return;
	}
	// grab the first image in the FileList object and pass it to the function
	renderImage(this.files[0]);
});






// render the image in our view
function renderImage(file) {

	// generate a new FileReader object
	var reader = new FileReader();
	// inject an image with the src url
	reader.onload = function(event) {
		var template_dataURL = event.target.result;
		$("#preview-template-file").attr("src", template_dataURL);
	}
	// when the file is read it triggers the onload event above.
	reader.readAsDataURL(file);
}

var p1 = new Promise(function(resolve, reject) {
	console.log("HI");
});
