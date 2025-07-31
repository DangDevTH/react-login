import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import liff from "@line/liff";

function App() {
  const [idToken, setIdToken] = useState<string | null>(null);
  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "2007844970-wd1e003k" });
        const getIDToken = liff.getIDToken();
        console.log("getIDToken", getIDToken);
        if (!getIDToken) {
          await loginLine();
        } else {
          setIdToken(getIDToken);
        }
        console.log("Tokenxxxx");
      } catch (err) {
        console.error("LIFF init failed:", err);
      }
    };

    initLiff();
  }, [idToken]);

  const loginLine = async () => {
    try {
      await sleep(5000);
      await liff.init({ liffId: "2007844970-wd1e003k" });
      liff.login({ redirectUri: window.location.href });
      const token = liff.getIDToken();
      console.log("logining...");
      setIdToken(token);
    } catch (err) {
      console.error("LIFF init error:", err);
    }
  };

  const logoutLine = async () => {
    await liff.init({ liffId: "2007844970-wd1e003k" });
    liff.logout();
    window.location.href = "/";
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
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-md text-white bg-[#00C300] hover:bg-[#00a300] transition">
          <img
            src="https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_login.png"
            alt="LINE logo"
            className="h-6 w-6"
          />
          <span className="font-medium">Login with LINE</span>
        </button>
      </div>
      {idToken ? (
        <div>
          <p>User ID: {idToken}</p>
          <button onClick={() => logoutLine()}>logout</button>
        </div>
      ) : (
        <div>
          <div>
            <button onClick={() => loginLine()}> Login line</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
