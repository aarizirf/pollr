function vote(button, option) {
  var database = firebase.database();
  key = button.parent().attr("id");

  var pollRef = database.ref("/polls").child(key);

  pollRef
    .child("/option" + option)
    .child("/votes")
    .transaction(function(votes) {
      votes = votes + 1;
      return votes;
    });

  var option1Votes;
  var option2Votes;

  pollRef
    .child("/option1")
    .child("/votes")
    .on("value", function(snapshot) {
      console.log(snapshot.val());
      option1Votes = snapshot.val();
      console.log(option1Votes);
      button.text(option1Votes);
    });

  pollRef
    .child("/option2")
    .child("/votes")
    .once("value", function(snapshot) {
      option2Votes = snapshot.val();
    });
}

$(".option1").on("click", function() {
  vote($(this), 1);
});

$(".option2").on("click", function() {
  vote($(this), 2);
});
