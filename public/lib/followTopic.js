$(".is-following-button").on("click", function() {
  var database = firebase.database();
  var currentUser = firebase.auth().currentUser;

  console.log("follow button hit");
  var key = $(this).attr("key");

  console.log("TYPE" + $(this).attr("type"));
  //                                                                            REFACTOR!!~!!!!!~
  if ($(this).attr("type") == "follow") {
    var topicRef = database.ref("/topics").child(key);
    topicRef.once("value", function(topicSnapshot) {
      var topic = topicSnapshot.val();

      if (topic.followers) {
        if (!topic.followers.includes(currentUser.uid)) {
          topic.followers.push(currentUser.uid);
        }
      } else {
        topicRef.update({ followers: [currentUser.uid] });
      }
      window.location.reload(true);
    });
  } else {
    var topicRef = database
      .ref("/topics")
      .child(key)
      .child("/followers");

    var followers;

    topicRef.once("value", function(topicSnapshot) {
      followers = topicSnapshot.val();
      console.log("follow array: ", followers);
      followers.splice(followers.indexOf(currentUser.uid), 1);
      console.log("follow array2: ", followers);
      topicRef.set(followers);
    });

    // topicRef
    //   .remove()
    //   .then(function() {
    //     // window.location.reload();
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });

    // topicRef.on("value", function(snap) {
    //   console.log(snap.val());
    // });
  }
});
