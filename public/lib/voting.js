// $(document).ready(function() {
//   //If checking if the element exists, use .length
//   if ($(".option1").length > 0) {
//     //option 1 is clicked
//     $(".option1").on("click", function() {
//       console.log("clicked");
//       vote(1, $(this).attr("id"));
//     });

//     //option 2 is clicked
//     $(".option2").on("click", function() {
//       vote(2, $(this).attr("id"));
//     });
//   }
// });

setTimeout(function() {
  $(".option1").on("click", function() {
    vote(1, $(this).attr("id"));
  });

  //option 2 is clicked
  $(".option2").on("click", function() {
    vote(2, $(this).attr("id"));
  });
}, 2000);

function vote(optionChosen, id) {
  console.log(id);

  //create ref to poll with id of id
  var pollRef = db.collection("polls").doc(id);
  var optionRef;

  if (optionChosen == 1) {
    optionRef = pollRef.collection("option1Voters");
  } else {
    optionRef = pollRef.collection("option2Voters");
  }

  //set doc with id of uid if or doesnt exist
  optionRef.doc(firebase.auth().currentUser.uid).set({
    votedAt: new Date()
  });
}
