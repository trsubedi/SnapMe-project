//when document loads
$(document).ready(function(){
  getPictures();
});

// //define functions
// function pageLoad() {
// 	getPictures();
// }

function getPictures(){
	$.get('/images', function(res_data){

		renderImages(res_data);
		// console.log(res_data);
	});
}

function renderImages(array_of_image_objects) {
	console.log(array_of_image_objects);
	var template = _.template($("#image-template").html());
	// input images into template and append to html
	imagesToappend = array_of_image_objects.map(function(imageObj){
		return template({imageObject: imageObj});
		// console.log(imageObject);
	});	
	$("#images-id").append(imagesToappend);
}

