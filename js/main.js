// include
var $ = require('jquery');
var csvParser = require("csv").parse;
var Storage = require("./StorageLocalStorage");
var storage = new Storage();

// global variable
var template_xml = null;
var dataSheet = null;

var $inputRepeatHori, $inputRepeatVert;
var $inputTitle, $inputVersion, $inputBy;
var $previewArea;

// dom operations

$(function main() {
	$("#input-template-file").change(onTemplateChosen);
	$("#input-datasheet-file").change(onDatasheetChosen);

	$("#button-generate").click(onGenerateClicked);

	$inputRepeatHori = $("#input-repeat-hori");
	$inputRepeatVert = $("#input-repeat-vert");

	$inputTitle = $("#input-title");
	$inputVersion = $("#input-version");
	$inputBy = $("#input-by");

	$previewArea = $("#preview-template-file");

	// also initializes to default value
	loadSettingFromStorage();
});


function onTemplateChosen(){
	//console.log(this.files);

	if(this.files.length<=0){
		return;
	}
	// grab the first image in the FileList object and pass it to the function
	renderImage(this.files[0]);

	////////////////////////

	// render the image in our view
	function renderImage(file) {

		// generate a new FileReader object
		var reader = new FileReader();
		// inject an image with the src url
		reader.onload = function(event) {
			template_xml = event.target.result;
			$("#preview-template-file")
				.html(template_xml)
				.find(":first-child")
					.css({"border":"solid lightGray thin"});

		};
		// when the file is read it triggers the onload event above.
		reader.readAsText(file);
	}
}

function onDatasheetChosen(){
	console.log(this.files);

	if(this.files.length<=0){
		return;
	}
	// grab the first image in the FileList object and pass it to the function
	// grab the first image in the FileList object and pass it to the function
	loadcsv(this.files[0]);

	////////////////////////

	// render the image in our view
	function loadcsv(file) {

		// generate a new FileReader object
		var reader = new FileReader();
		// inject an image with the src url
		reader.onload = function(event) {
			var dataSheet_string = event.target.result;
			var result = csvParser(dataSheet_string, {columns:true}, function(err, output){
				if(err){
					console.log(err);
					return;
				}
				//console.log(output);
				dataSheet = output;
			});

		};
		// when the file is read it triggers the onload event above.
		reader.readAsText(file);
	}
}

// function parseCSV(string) {
// 	var result = [];
//
// 	dataSheet_string.split("\n").forEach(function(element, index, array){
// 		var line = element.split(",")
// 	});
//
// 	return result;
// }


function onGenerateClicked(){
	// validation
	if(template_xml === null || dataSheet === null){
		console.log("template_xml and dataSheet should not be null");

		// TODO error

		return;
	}
	// get value
	var xx = $inputRepeatHori.val();
	var yy = $inputRepeatVert.val();
	var title = $inputTitle.val();
	var version = $inputVersion.val();
	var by = $inputBy.val();

	var $result = generateCardSheet(dataSheet, xx, yy);
	console.log($result);
	$(".sheet-version").html(title+" v"+version+" by "+by);
	$previewArea.html("").append($result);




	saveSettingToStorage();
}


function generateCardSheet(pDatasheet, pRepeatX, pRepeatY) {
	var $result = $("<table></table>").addClass("page");
	var cardID = 0;
	var pDatasheetlen = pDatasheet.length;
	for(var i=0; i < pRepeatY; i++){
		// stop if no more cards
		if(cardID >= pDatasheetlen) break;

		var $row = $("<tr></tr>");
		for(var j=0; j < pRepeatX; j++){
			// create cell
			var $cell = $("<td></td>");

			// fill in if have more cards
			if(cardID < pDatasheetlen) {
				// clone card svg
				var template_xml_clone = new String(template_xml);

				// put cars and jquery the card svg
				var $card = $cell
					.html(template_xml_clone)
					.find(":first-child");

				// card data
				var cardData = pDatasheet[cardID];
				Object.getOwnPropertyNames(cardData).forEach(function(val, idx, array) {
					//console.log(val + ' -> ' + obj[val]);
					$card.find(":contains('" + val + "')").html(cardData[val]);
				});
				cardID++;
			}else{
				// else leave it blank
			}

			$row.append($cell);
		}
		$result.append($row);
	}
	return $result;
}


function saveSettingToStorage() {

	var xx = $inputRepeatHori.val();
	var yy = $inputRepeatVert.val();
	storage
		.write("repeatX",xx)
		.write("repeatY",yy);

	var title = $inputTitle.val();
	var version = $inputVersion.val();
	var by = $inputBy.val();

	storage
		.write("title",title)
		.write("version",version)
		.write("by",by);
}

function loadSettingFromStorage() {

	var xx = storage.read("repeatX") || 3;
	var yy = storage.read("repeatY") || 4;
	var title = storage.read("title") || "Cardgame";
	var version = storage.read("version") || "0.0.1";
	var by = storage.read("by") || "no-name";

	console.log(xx);
	console.log(yy);
	console.log(title);
	console.log(version);
	console.log(by);

	$inputRepeatHori.val(xx);
	$inputRepeatVert.val(yy);
	$inputTitle.val(title);
	$inputVersion.val(version);
	$inputBy.val(by);

}
