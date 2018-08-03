$(".submit-topic").on("click", function() {
  var topicsRef = db.collection("topics");

  var topicName = $(".topic-name-input").val();
  var userUid = firebase.auth().currentUser.uid;

  topicsRef
    .add({
      name: topicName,
      author: userUid,
      createdAt: new Date()
    })
    .then(function(topicRef) {
      var topicFollowingRef = topicRef.collection("followers");
      topicFollowingRef.doc(firebase.auth().currentUser.uid).set({
        followedAt: new Date()
      });
    })
    .then(function() {
      window.location.href = "/home";
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
});
