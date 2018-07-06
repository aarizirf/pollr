////////////////////////////////////////////////////////////////////////////////////////////REFACTOR WITH FUNCTIONS!

$(".option1").on("click", function() {
  var pollID = $(this).attr("id");
  console.log(pollID);

  $.post("/polls/" + pollID + "/1");

  animateButtons($(this), $(this).siblings());
});

$(".option2").on("click", function() {
  var pollID = $(this).attr("id");
  console.log(pollID);

  $.post("/polls/" + pollID + "/2");

  animateButtons($(this).siblings(), $(this));
});

function animateButtons(option1, option2) {
  option1.prop("disabled", true);
  option2.prop("disabled", true);

  //HANDLE ANIMATION
  var option1ToWidth = option1.attr("towidth");
  var option2ToWidth = option2.attr("towidth");

  if (option1ToWidth == 0) {
    option1.css("display", "none");
  } else if (option2ToWidth == 0) {
    option2.css("display", "none");
  } else {
    option1.animate(
      {
        width: option1ToWidth + "%"
      },
      function() {
        obj.html(Math.round(option1ToWidth) + "%").fadeIn("slow");
      }
    );
    option2.animate(
      {
        width: option2ToWidth + "%"
      },
      function() {
        obj.html(Math.round(option2ToWidth) + "%").fadeIn("fast");
      }
    );
  }

  changeText(option1, option2);
}

function changeText(option1, option2) {
  option1Text = option1.html();
  option2Text = option2.html();

  var option1ToWidth = Math.round(option1.attr("towidth"));
  var option2ToWidth = Math.round(option2.attr("towidth"));

  option1.text(option1ToWidth + "%");
  option2.text(option2ToWidth + "%");
}
