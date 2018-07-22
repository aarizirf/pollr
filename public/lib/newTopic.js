function createTopic() {
  var database = firebase.database();
  var topicsRef = database.ref("/topics");

  var name = $(".topic-name-input").val();
  var description = $(".topic-description-input").val();

  var currentUser = firebase.auth().currentUser;

  topicsRef
    .push({
      name: name,
      description: description,
      followers: [currentUser.uid],
      author: {
        uid: currentUser.uid,
        username: currentUser.displayName
      },
      isApproved: false,
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

$(".submit-topic").on("click", function() {
  createTopic();
});
