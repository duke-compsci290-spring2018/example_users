// use Firebase as our database
import Firebase from 'firebase'

// configure and connect to database
var config = {
    apiKey: "AIzaSyDSZsjGLRaOix0JPEWw9GRj2uFDQFsM6p0",
    authDomain: "vue-images-auth.firebaseapp.com",
    databaseURL: "https://vue-images-auth.firebaseio.com",
    projectId: "vue-images-auth",
    storageBucket: "vue-images-auth.appspot.com",
    messagingSenderId: "1017896827110"
}
var fbApp = Firebase.initializeApp(config)

// global reference to remote database app
export const db = fbApp.database()
// global reference to remote storage
export const storageRef = fbApp.storage().ref()
// create useful endpoints within the database
export const imagesRef = db.ref('images')
