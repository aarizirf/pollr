function vote(button, option) {
  var database = firebase.database();
  key = button.parent().attr("id");

  var pollRef = database.ref("/polls").child(key);

  pollRef
    .child("/option" + option)
    .child("/votes")
    .transaction(function(votes) {
      return votes + 1;
    });
}

$(".option1").on("click", function() {
  vote($(this), 1);

  option1Votes = parseInt($(this).attr("votes")) + 1;
  option2Votes = parseInt(
    $(this)
      .siblings()
      .attr("votes")
  );

  $(this).text(
    Math.round((option1Votes / (option1Votes + option2Votes)) * 100) + "%"
  );
  $(this)
    .siblings()
    .text(
      Math.round((option2Votes / (option1Votes + option2Votes)) * 100) + "%"
    );
});

$(".option2").on("click", function() {
  vote($(this), 2);

  option2Votes = parseInt($(this).attr("votes"));
  option1Votes =
    parseInt(
      $(this)
        .siblings()
        .attr("votes")
    ) + 1;

  $(this).text(
    Math.round((option2Votes / (option1Votes + option2Votes)) * 100) + "%"
  );
  $(this)
    .siblings()
    .text(
      Math.round((option1Votes / (option1Votes + option2Votes)) * 100) + "%"
    );
});
