//google sign in button clicked
$(".google-sign-in").on("click", function() {
  signInWithGoogle();
});

//google sign out button clicked
$(".google-sign-out").on("click", function() {
  firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user.displayName + " is signed in");
  } else {
    //redirect to login if not already on page
    if ($(location).attr("href") != "http://localhost:5500/login") {
      console.log(window.location.href);
      window.location.href = "http://localhost:5500/login";
    }
  }
});

function signInWithGoogle() {
  var googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  //show pop up
  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then(function(data) {
      //check if user exists, if not add it to users collection
      var usersRef = db.collection("users");

      usersRef
        .doc(data.user.uid)
        .set({
          uid: data.user.uid,
          name: data.user.displayName,
          new: true
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .catch(function(err) {
      console.log(err);
    });
}
