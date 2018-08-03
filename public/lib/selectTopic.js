var topicsRef = db.collection("topics");

topicsRef
  .get()
  .then(function(topicsSnap) {
    topicsSnap.forEach(function(topicSnap) {
      var topic = topicSnap.data();

      var topicHtml = `
      <li class="list-group-item topic-choice" id="${topicSnap.id}">
        ${topic.name}
      </li>
    `;

      $(".topics").append(topicHtml);
    });
  })
  .then(function() {
    chooseTopic();
  });

function chooseTopic() {
  $(".topic-choice").on("click", function() {
    $(".topic-choice").removeClass("active");
    $(this).addClass("active");
  });
}
