$(".delete-button").on("click", function() {
  pollID = $(this).attr("id");
  console.log(pollID);

  fetch("/polls/" + pollID + "/delete", { method: "GET" })
    .then(function(response) {
      if (response.ok) {
        console.log("Deleted poll with id " + pollID);
        return;
      }
      throw new Error("request failed");
    })
    .catch(function(error) {
      console.log(error);
    });

  $(this)
    .closest(".card")
    .slideUp();
});
