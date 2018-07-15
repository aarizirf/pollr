function addPoll() {
  var database = firebase.database();
  var pollsRef = database.ref("/polls");

  var questionInput = $(".question-input").val();
  $(".question-input").val(" ");

  var currentUser = firebase.auth().currentUser;

  pollsRef
    .push({
      question: questionInput,
      author: {
        uid: currentUser.uid,
        username: currentUser.displayName
      }
    })
    .then(function() {
      //reidrect
    })
    .catch(function(err) {
      console.log(err);
    });
}

$(".submit-poll").on("click", function() {
  addPoll();
});
