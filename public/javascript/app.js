//when document loads
$(document).ready(function(){
  getPictures();
  // postPictures();
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
// function postPictures(){
// //post new pictures from link
// $("#image-form").on("submit", function(e){
//     // prevent form submission
//     e.preventDefault();
//     // post to profile
//     $.post("/profile", $(this).serialize())
//       .done(function(res){
//         // append new picture to the page
//         getPictures();
//         $("#image-form")[0].reset();
//       });
//   });
// }



