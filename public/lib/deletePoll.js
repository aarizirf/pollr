$(".delete-button").on("click", function() {
  pollID = $(this).attr("id");
  console.log(pollID);

  $.get("/polls/" + pollID + "/delete");

  $(this)
    .closest(".card")
    .slideUp();
});
