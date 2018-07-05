var status1 = 0;
var status2 = 0;

$(".option1").on("click", function() {
  console.log("option 1 was clicked for poll with id " + $(this).attr("id"));
  //   $(this)
  //     .closest(".card")
  //     .slideUp();
  fetch("/polls/" + $(this).attr("id") + "/1", { method: "POST" })
    .then(function(response) {
      if (response.ok) {
        console.log("click recorded");
        return;
      }
      throw new Error("request failed");
    })
    .catch(function(error) {
      console.log(error);
    });

  // Animation
  $(this).css("width", $(this).attr("towidth") + "%");
  $(this)
    .siblings()
    .css(
      "width",
      $(this)
        .siblings()
        .attr("towidth") + "%"
    );
});

$(".option2").on("click", function() {
  console.log("option 2 was clicked for poll with id " + $(this).attr("id"));
  //   $(this)
  //     .closest(".card")
  //     .slideUp();
  fetch("/polls/" + $(this).attr("id") + "/2", { method: "POST" })
    .then(function(response) {
      if (response.ok) {
        console.log("click recorded");
        return;
      }
      throw new Error("request failed");
    })
    .catch(function(error) {
      console.log(error);
    });

  // Animation
  $(this).css("width", $(this).attr("towidth") + "%");
  $(this)
    .siblings()
    .css(
      "width",
      $(this)
        .siblings()
        .attr("towidth") + "%"
    );
});
