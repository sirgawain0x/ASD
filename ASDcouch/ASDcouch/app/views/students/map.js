function(doc) {
  if (doc._id.substr(0,9) ==="students:") {
    emit(doc._id.substr(9));
  }
};