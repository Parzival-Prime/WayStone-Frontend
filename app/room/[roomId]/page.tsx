"use client";

import ChatBox from "@/components/chat-box";
import EventPanel from "@/components/event-box";
import MemberPanel from "@/components/member-box";
import StatusBox from "@/components/status-box";
import { useEffect, useMemo, useRef, useState } from "react";
import { DataHandler } from "@/utils/incoming-data-handler";
import { DataType } from "@/types/data.types";
import { useParams } from "next/navigation";

export default function page() {
  const wsRef = useRef<WebSocket | null>(null);
  const dataHandler = useMemo(() => new DataHandler(wsRef), []);
  const { roomId } = useParams<{ roomId: string }>();
  const [themeState, setThemeState] = useState("bg-[url('/bgs/eva-003-mid.png')] bg-cover brightness-60")

  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_BACKEND_WS_HOST}?roomId=${roomId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      dataHandler.setStatus("connected");
    };

    ws.onclose = () => {
      dataHandler.setStatus("disconnected");
    };

    ws.onmessage = (event) => {

      if (event.data !== "{event:ping}") {
        const data = JSON.parse(event.data);
        dataHandler.incomingMessageHandler(data);
      }
    };

    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: DataType.LATENCY_PING,
            roomId: roomId,
            Id: dataHandler.getState("Id"),
            timestamp: Date.now(),
          })
        );
      }
    }, 11000);

    return () => {
      clearInterval(pingInterval);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [roomId]);
  return (
    <div className="flex relative w-full min-h-screen text-white font-saira">
      <div className={`absolute -z-10 ${themeState} top-0 left-0 h-svh w-full`}></div>
      {/* <StatusBox dataHandler={dataHandler} /> */}
      <div className="flex w-full">
        <MemberPanel dataHandler={dataHandler}  />
        <ChatBox dataHandler={dataHandler}  />
        <EventPanel />
      </div>
    </div>
  );
}
