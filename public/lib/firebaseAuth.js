var config = {
  apiKey: "AIzaSyBwS50rQMo3zkBwt3ffNvep-MnjH_2Dr4c",
  authDomain: "pollr-bd9fc.firebaseapp.com",
  databaseURL: "https://pollr-bd9fc.firebaseio.com",
  projectId: "pollr-bd9fc",
  storageBucket: "pollr-bd9fc.appspot.com",
  messagingSenderId: "709159988362"
};
firebase.initializeApp(config);

$(".google-sign-in").on("click", function() {
  signInWithGoogle();
});

$(".google-sign-out").on("click", function() {
  firebase.auth().signOut();
});

window.onload = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("user is signed in " + user.displayName);
      $.post("/currentUser/" + user.uid);
    } else {
      var url = $(location).attr("href");
      if (url != "http://localhost:5500/login") {
        window.location.href = "/login";
      }
      console.log("user is not signed in");
      console.log($(location).attr("href"));
    }
  });
};

function signInWithGoogle() {
  var googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then(function(data) {
      console.log(data);
      window.location.href = "/";
    })
    .catch(function(err) {
      console.log(err);
    });
}
