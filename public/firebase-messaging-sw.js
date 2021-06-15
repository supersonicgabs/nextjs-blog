// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyBwq8GK9oNuiQmpAmGJGpPYZOi7mx0s76w",
  authDomain: "nextjs-blog-6b3e4.firebaseapp.com",
  projectId: "nextjs-blog-6b3e4",
  storageBucket: "nextjs-blog-6b3e4.appspot.com",
  messagingSenderId: "547268889058",
  appId: "1:547268889058:web:ad9366f1d2059af40851bb",
  measurementId: "G-NYLY9KDRQ9",
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Retrieve firebase messaging
