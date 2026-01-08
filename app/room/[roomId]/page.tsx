"use client";

import ChatBox from "@/components/chat-box";
import EventPanel from "@/components/event-box";
import MemberPanel from "@/components/member-box";
import StatusBox from "@/components/status-box";
import { useEffect, useMemo, useRef } from "react";
import { DataHandler } from "@/utils/incoming-data-handler";
import { DataType } from "@/types/data.types";
import { useParams } from "next/navigation";

export default function page() {
  const wsRef = useRef<WebSocket | null>(null);
  const dataHandler = useMemo(() => new DataHandler(wsRef), []);
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    const ws = new WebSocket(`wss://waystone-backend.onrender.com?roomId=${roomId}`);
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
    <div className="flex w-full min-h-screen bg-black text-white font-comfortaa">
      {/* <StatusBox dataHandler={dataHandler} /> */}
      <div className="flex w-full">
        <MemberPanel dataHandler={dataHandler} />
        <ChatBox dataHandler={dataHandler} />
        <EventPanel />
      </div>
    </div>
  );
}
