import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { useEffect, useState } from "react";
import { getToken, onMessageListener } from "../firebase";
import { Button, Row, Col, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);

  // var log = document.getElementById("btn-test");
  useEffect(() => {
    // document.addEventListener('message', function(msg) {})
    // document.ReactNativeWebView.postMessage("Hello React Native!");

    window.addEventListener(
      "message",
      function (event) {
        console.log("Received post message", event);

        // logMessage(event.data);
      },
      false
    );

    return () => {
      window.removeEventListener(
        "message",
        function (event) {
          console.log("Received post message", event);

          // logMessage(event.data);
        },
        false
      );
    };
  });

  const sendMessage = () => {
    console.log("Send post message");

    // logMessage("Sending post message from web..");
    window.postMessage("Post message from web", "*");
  };

  // function logMessage(message) {
  //   log.append(new Date() + " " + message + "\n");
  // }
  // getToken(setTokenFound);
  // onMessageListener() &&
  //   onMessageListener()
  //     .then((payload) => {
  //       setShow(true);
  //       setNotification({
  //         title: payload.notification.title,
  //         body: payload.notification.body,
  //       });
  //       console.log(payload);
  //     })
  //     .catch((err) => console.log("failed: ", err));
  return (
    <Layout home>
      {/* {isTokenFound ? (
        <h1> Notification permission enabled 👍🏻 </h1>
      ) : (
        <h1> Need notification permission ❗️ </h1>
      )} */}
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          minWidth: 200,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      {/* <Button onClick={() => setShow(true)}>Show Toast</Button> */}
      <button id="btn-test" onClick={sendMessage}>
        Show Toast
      </button>
    </Layout>
  );
}
