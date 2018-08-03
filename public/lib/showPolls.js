var pollsRef = db.collection("polls");

//get all polls
pollsRef.get().then(function(pollSnapshot) {
  //for each through poills
  pollSnapshot.forEach(function(pollSnap) {
    //query to get user info through author id of poll
    var poll = pollSnap.data();

    //get voters # for each option, costs alot tho, change in future
    var option1Voters, option2Voters;
    pollsRef
      .doc(pollSnap.id)
      .collection("option1Voters")
      .get()
      .then(function(option1Snap) {
        option1Voters = option1Snap.size;
        //voters 2
        pollsRef
          .doc(pollSnap.id)
          .collection("option2Voters")
          .get()
          .then(function(option2Snap) {
            option2Voters = option2Snap.size;

            var userRef = db.collection("users").doc(poll.author);
            userRef
              .get()
              .then(function(userSnapshot) {
                //set vars to data of snapshots
                var user = userSnapshot.data();

                var pollHtml = `
                  <div class="card mb-5">
                  <div class="card-header">
                    Created by
                    <strong>
                      ${user.name}
                    </strong>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title text-center">
                      ${poll.question}
                    </h4>
                    <div class="row">
                        <div class="col-sm-12 col-md-6 offset-md-3">
                            <div class="input-group">
                                <button id=
                                  "${pollSnap.id}"
                                  class="option1 form-control btn btn-outline-dark py-3">
                                  ${poll.option1.text}
                                </button>
                                <button id=
                                  "${pollSnap.id}"
                                  class="option2 form-control btn btn-outline-dark py-3">
                                  ${poll.option2.text}
                                </button>
                            </div>
                        </div>
                    </div>
                      <div class="mt-2">
                        <a class="badge badge-pill badge-success" href="#">
                          Topic
                        </a>
                        <span class="badge badge-pill badge-info">
                          ${option1Voters + option2Voters} votes
                        </span>
                        <span class="badge badge-pill badge-dark">
                          ${moment(poll.createdAt.toDate()).fromNow()}
                        </span>
                      </div>
                    </div>
                  </div>`;

                $(".polls-div").append(pollHtml);
              })
              .catch(function(error) {
                console.log(error);
              });
          });
      });
  });
});
