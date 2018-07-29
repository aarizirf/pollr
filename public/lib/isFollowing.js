window.onload = function() {
  var key = $(".is-following-button").attr("key");

  var database = firebase.database();
  var topicRef = database.ref("/topics").child(key);

  var currentUser = firebase.auth().currentUser;

  topicRef.on("value", function(topicSnapshot) {
    var topic = topicSnapshot.val();
    var btn = $(".is-following-button");

    if (topic.followers && topic.followers.includes(currentUser.uid)) {
      /*change(
        btn,
        "btn-outline-danger",
        "btn-success",
        "/topics/" + key + "/unfollow",
        "fa-user-slash",
        "fa-user-add",
        "Unfollow"
      );
    } else {*/
      change(
        btn,
        "btn-success",
        "btn-outline-danger",
        "/topics/" + key + "/follow",
        "fa-user-add",
        "fa-user-slash",
        "Follow"
      );
    }
  });
};

function change(
  btn,
  addClasses,
  removeClasses,
  href,
  iconAddClass,
  iconRemoveClass,
  text
) {
  btn
    .removeClass(removeClasses)
    .addClass(addClasses)
    .attr("href", href)
    .children()
    .children()
    .removeClass(iconRemoveClass)
    .addClass(iconAddClass)
    .parent()
    .parent()
    .text(text);
}
