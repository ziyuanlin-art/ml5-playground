import React from "react";
import styles from "./Code.module.css";
import Button from "../button/Button";
import { useState } from "react";
function Code({ children }) {

  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
  };

  if (copied) {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <Button onClick={copyText}>{!copied ? "Copy": "Copied"}</Button>
      </div>
      <pre className={styles.code}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default Code;
