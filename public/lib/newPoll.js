function addPoll() {
  var database = firebase.database();
  var pollsRef = database.ref("/polls");

  var question = $(".question-input").val();
  var option1 = $(".option1-input").val();
  var option2 = $(".option2-input").val();

  var currentUser = firebase.auth().currentUser;

  pollsRef
    .push({
      question: question,
      author: {
        uid: currentUser.uid,
        username: currentUser.displayName
      },
      option1: {
        text: option1,
        votes: 0
      },
      option2: {
        text: option2,
        votes: 0
      },
      createdAt: new Date().getTime()
    })
    .then(function() {
      //redirect
      window.location.href = "/home";
    })
    .catch(function(err) {
      console.log(err);
    });
}

$(".submit-poll").on("click", function() {
  addPoll();
});
