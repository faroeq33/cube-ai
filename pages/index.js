import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Stopwatch from "../src/Stopwatch";
export default function Home() {
  const [loading, setLoading] = useState();
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setUserInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className=" fullbody">
        <main className={styles.main}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=""
            style={{ height: 100 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
            />
          </svg>
          {/* <img src="/dog.png" className={styles.icon} /> */}
          <h3>Cube AI Scramble</h3>
          <form onSubmit={onSubmit}>
            {/* <input
              type="text"
              name="user"
              placeholder="Enter something"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            /> */}
            <button
              type="submit"
              className="px-3 py-4 mb-8 text-lg text-white bg-green-500 border-green-600 rounded-sm"
            >
              {loading && (
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white-500 inline"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              Generate scramble
            </button>
          </form>
          <div className={styles.result}>{result}</div>
          <Stopwatch></Stopwatch>
        </main>
      </div>
    </div>
  );
}
