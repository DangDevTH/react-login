import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import liff from "@line/liff";

function App() {
  const [count, setCount] = useState(0);
  const [profile, setProfile] = useState<any>(null);
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
      setContextData({ ...contextData });
      console.log({ ...userProfile });
      setProfile({ ...userProfile });
      setIdToken(token);
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
      console.log(profile);
      console.log("os:", liff.getOS());
    } catch (err) {
      console.error("LIFF init error:", err);
    }
  };

  const logoutLine = async () => {
    await liff.init({ liffId: "2007844970-wd1e003k" });
    liff.logout();
    setContextData(null);
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
      {contextData?.userId ? (
        <div>
          <h2>Welcome, {profile?.displayName}</h2>
          <img src={profile?.pictureUrl} alt="profile" style={{ width: 100 }} />
          <p>User ID: {profile}</p>
          <button onClick={() => logoutLine()}>logout</button>
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
