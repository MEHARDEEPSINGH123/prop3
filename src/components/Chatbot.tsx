'use client'

import Script from "next/script";

declare global {
  interface Window {
    DagsisChat: any;
  }
}

export default function Chatbot() {
  return (
    <Script
      src="https://dagsis.ai/widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        window.DagsisChat.init({
          agentId: "477e207d-bf30-49b6-9fed-c88994f702a1",
          apiKey: "0dfb06dd-8dcd-4777-9520-b3b3e68decef"
        });
      }}
    />
  );
}
