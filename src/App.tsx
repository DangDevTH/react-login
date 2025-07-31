import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import liff from "@line/liff";

function App() {
  const [count, setCount] = useState(0);
  const [profile, setProfile] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [contextData, setContextData] = useState<any>();
  const loginLine = async () => {
    try {
      await liff.init({ liffId: "2007844970-wd1e003k" });
      liff.login({ redirectUri: window.location.href });
      const userProfile = await liff.getProfile();
      const token = liff.getIDToken();
      console.log("userProfile", liff.getContext());
      console.log("token", token);
      const contextData = liff.getContext();
      setContextData(contextData);
      setProfile(userProfile);
      setIdToken(token);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("LIFF init error:", err);
    }
  };

  const getContext = async () => {
    try {
      await liff.init({ liffId: "2007844970-wd1e003k" });
      console.log("context:", liff.getContext());
      const contextData = liff.getContext();
      setContextData({ ...contextData });
      console.log("os:", liff.getOS());
    } catch (err) {
      console.error("LIFF init error:", err);
    }
  };

  console.log("Token", idToken);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        showContext
        {contextData?.userId && <div>context:{contextData.userId}</div>}
      </p>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {profile?.displayName}</h2>
          <img src={profile?.pictureUrl} alt="profile" style={{ width: 100 }} />
          <p>User ID: {profile?.userId}</p>
          <button onClick={() => liff.logout()}>ผูกบัญชีไลน์</button>
        </div>
      ) : (
        <div>
          <div>
            <button onClick={() => loginLine()}> Login line</button>
          </div>
          <div>
            <button onClick={() => getContext()}>ผูกบัญชีไลน์</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
