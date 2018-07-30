var pollsRef = db.collection("polls");

//get all polls
pollsRef.get().then(function(pollSnapshot) {
  //for each through poills
  pollSnapshot.forEach(function(poll) {
    //query to get user info through author id of poll
    var userRef = db.collection("users").doc(poll.data().author);
    userRef
      .get()
      .then(function(userSnapshot) {
        var pollHtml = `
          <div class="card mb-5">
          <div class="card-header">
            Created by
            <strong>
              ${userSnapshot.data().name}
            </strong>
          </div>
          <div class="card-body">
            <h4 class="card-title text-center">
              ${poll.data().question}
            </h4>
            <div class="row">
                <div class="col-sm-12 col-md-6 offset-md-3">
                    <div class="input-group">
                        <button class="option1 form-control btn btn-outline-dark py-3">

                        </button>
                        <button class="option2 form-control btn btn-outline-dark py-3">

                        </button>
                    </div>
                </div>
            </div>
              <div class="mt-2">
                <a class="badge badge-pill badge-success" href="#">

                </a>
                <span class="badge badge-pill badge-info">

                </span>
                <span class="badge badge-pill badge-dark">

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
