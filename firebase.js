import firebase from "firebase/app";
import "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyBwq8GK9oNuiQmpAmGJGpPYZOi7mx0s76w",
  authDomain: "nextjs-blog-6b3e4.firebaseapp.com",
  projectId: "nextjs-blog-6b3e4",
  storageBucket: "nextjs-blog-6b3e4.appspot.com",
  messagingSenderId: "547268889058",
  appId: "1:547268889058:web:ad9366f1d2059af40851bb",
  measurementId: "G-NYLY9KDRQ9",
};

let messaging;
if (process.browser) {
  firebase.initializeApp(firebaseConfig);
  messaging = firebase.messaging();
}

export const getToken = (setTokenFound) => {
  //   if (!process.browser) {
  //     return;
  //   } else {
  if (!process.browser) return;
  return messaging
    .getToken({
      vapidKey:
        "BKHo2ceef2SWq3ey_Jdu_4dzoZcSyAUfrZ2KLcwJcO0H3bR79_9jV8EL9WQNC-nUvKHMnD46QXdEQ-z_Mdi5Uvc",
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
  //   }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      console.log("msg test");
      resolve(payload);
    });
  });
