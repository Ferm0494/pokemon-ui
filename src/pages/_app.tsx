import AuthProvider from "@/context/AuthProvider";
import type { AppProps } from "next/app";
import Login from "./auth/login";
import Home from "./";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {({ user, loading }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        // If the user is logged in and wants to view the Login Page, redirect to the home page
        if (user && Component == Login) {
          return <Home {...pageProps}/>;
        }
        // If the user is logged in and is not viewing the Login Page, render the requested page
        if (user) {
          return <Component {...pageProps} />;
        }
        // Means the user is not logged in, we force to view the Login Page
        return <Login />;
      }}
    </AuthProvider>
  );
}
