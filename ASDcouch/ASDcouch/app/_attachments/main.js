$(document).ready(function(){
	$.ajax({
		"url": "_view/students",
		"dataType": "json",
		"success": function(data){
			$.each(data.rows, function(index, students){
				var fname = students.value.fname;
				var lname = students.value.lname;
				var email = students.value.email;
				var sex = students.value.sex;
				var group = students.value.sex;
				var pop = students.value.pop;
				var interests = students.value.interests;
				$('#studentlist').append(
					$('<li>').append(
						$('<a>').attr('href', '#')
							.text(interests)
					)
				);
			});
			$('#studentlist').listview('refresh');
		} 
	});
});