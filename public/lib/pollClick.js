$(".option1").on("click", function() {
  console.log("option 1 was clicked for poll with id " + $(this).attr("id"));
  var pollID = $(this).attr("id");
  //   $(this)
  //     .closest(".card")
  //     .slideUp();
  fetch("/polls/" + pollID + "/1", { method: "POST" })
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

  //HANDLE ANIMATION

  var button1ToWidth = $(this).attr("towidth");
  var button2ToWidth = $(this)
    .siblings()
    .attr("towidth");

  if (button1ToWidth == 0) {
    $(this).css("display", "none");
    $(this)
      .siblings()
      .html("100%")
      .fadeIn("fast");
  } else if (button2ToWidth == 0) {
    $(this)
      .siblings()
      .css("display", "none");
    $(this)
      .html("100%")
      .fadeIn("slow");
  } else {
    $(this).animate(
      {
        width: button1ToWidth + "%"
      },
      function() {
        $(this)
          .html(Math.round(button1ToWidth) + "%")
          .fadeIn("slow");
      }
    );
    $(this)
      .siblings()
      .animate(
        {
          width: button2ToWidth + "%"
        },
        function() {
          $(this)
            .html(Math.round(button2ToWidth) + "%")
            .fadeIn("fast");
        }
      );
  }
});

$(".option1").on("click", function() {
  console.log("option 2 was clicked for poll with id " + $(this).attr("id"));
  var pollID = $(this).attr("id");
  //   $(this)
  //     .closest(".card")
  //     .slideUp();
  fetch("/polls/" + pollID + "/2", { method: "POST" })
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

  //HANDLE ANIMATION

  var button2ToWidth = $(this).attr("towidth");
  var button1ToWidth = $(this)
    .siblings()
    .attr("towidth");

  if (button2ToWidth == 0) {
    $(this).css("display", "none");
    $(this)
      .siblings()
      .html("100%")
      .fadeIn("fast");
  } else if (button1ToWidth == 0) {
    $(this)
      .siblings()
      .css("display", "none");
    $(this)
      .html("100%")
      .fadeIn("slow");
  } else {
    $(this).animate(
      {
        width: button2ToWidth + "%"
      },
      function() {
        $(this)
          .html(Math.round(button2ToWidth) + "%")
          .fadeIn("slow");
      }
    );
    $(this)
      .siblings()
      .animate(
        {
          width: button1ToWidth + "%"
        },
        function() {
          $(this)
            .html(Math.round(button1ToWidth) + "%")
            .fadeIn("fast");
        }
      );
  }
});
