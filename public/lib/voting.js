//option 1 is clicked
$(".option1").on("click", function() {
  vote(1, $(this).attr("id"));
});

//option 2 is clicked
$(".option2").on("click", function() {
  vote(2, $(this).attr("id"));
});

function vote(optionChosen, id) {
  console.log(id);

  //create ref to poll iwth id of id
  var pollRef = db.collection("polls").doc(id);
  var optionRef;

  if (optionChosen == 1) {
    optionRef = pollRef.collection("option1Voters");
  } else {
    optionRef = pollRef.collection("option2Voters");
  }

  optionRef.doc(firebase.auth().currentUser.uid).set({
    votedAt: new Date()
  });
}
