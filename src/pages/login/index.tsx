import PageWrapper from "@/components/PageWrapper";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import Spinner from "@/components/Spinner";
const provider = new GoogleAuthProvider();

const auth = getAuth();

export default function Login() {
  const [loading, setLoading] = useState(true);
  const ranCheck = useRef(false);

  async function onLoginClick() {
    signInWithRedirect(auth, provider);
  }

  async function attemptToGetToken() {
    const savedToken = localStorage.getItem("todo-auth-token");

    if (savedToken) {
      return (window.location.href = "/");
    }
    try {
      const result = await getRedirectResult(auth);
      if (!result) {
        setLoading(false);
        return;
      }
      const token = await result.user.getIdToken();
      localStorage.setItem("todo-auth-token", token);
      window.location.href = "/";
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }

  useEffect(() => {
    if (!ranCheck.current) {
      ranCheck.current = true;
      attemptToGetToken();
    }
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Login</title>
      </Head>
      <PageWrapper>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h3>Welcome to</h3>
            <h1>2Do.io</h1>
            <p className="w-6/12 pb-8 text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem. Veritatis obcaecati tenetur iure
              eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
              tenetur error, harum nesciunt ipsum debitis quas aliquid.
            </p>
            <button
              onClick={onLoginClick}
              className="hover:shadow-md transition-shadow duration-200 shadow-black bg-orange-600 p-2 rounded-md text-amber-300 text-xl h-12 w-32"
            >
              Login
            </button>
          </>
        )}
      </PageWrapper>
    </React.Fragment>
  );
}
