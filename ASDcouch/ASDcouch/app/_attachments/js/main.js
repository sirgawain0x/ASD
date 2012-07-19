$(document).ready(function(){
	$.ajax({
		"url": "_view/students",
		"dataType": "json",
		"success": function(data){
			console.log(data);
		} 
	});
});