//option 1 is clicked
$(".option1").on("click", function() {
  vote(1, $(this));
});

//vote function for dry
function vote(option, btn) {
  //set id to id attribute
  var id = btn.attr("id");
  console.log(id);

  //create ref to poll iwth id of id
  var pollRef = db.collection("polls").doc(id);

  //get data
  pollRef.get().then(function(pollSnap) {
    //get values of data into JSON (poll)
    var poll = pollSnap.data();
    console.log(poll);
  });
}
