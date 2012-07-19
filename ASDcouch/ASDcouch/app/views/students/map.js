function(doc) {
  if (doc._id.substr(0,9) ==="students:") {
    emit(doc._id.substr(9),{
    	"fname": doc.fname,
    	"lname": doc.lname,
    	"email": doc.email,
    	"sex": doc.sex,
    	"group": doc.group,
    	"pop": doc.pop,
    	"interests": doc.interests
    });
  }
};