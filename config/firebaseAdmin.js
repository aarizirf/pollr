//FIREBASE
var admin = require("firebase-admin");

var serviceAccount = require("../config/pollr-bd9fc-firebase-adminsdk-i1cuu-bcb652ef48.json");

var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pollr-bd9fc.firebaseio.com"
});

var database = firebaseAdmin.database();

module.exports = database;
