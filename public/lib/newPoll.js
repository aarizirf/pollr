$(".submit-poll").on("click", function() {
  var pollsRef = db.collection("polls");

  var questionText = $(".question-input").val();
  var option1Text = $(".option1-input").val();
  var option2Text = $(".option2-input").val();
  var userUid = firebase.auth().currentUser.uid;

  pollsRef
    .add({
      question: questionText,
      option1: { text: option1Text },
      option2: { text: option2Text },
      author: userUid
    })
    .then(function() {
      window.location.href = "/home";
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
});
