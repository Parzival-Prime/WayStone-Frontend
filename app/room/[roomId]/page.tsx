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
  const [showMembersTab, setShowMembersTab] = useState(false)

  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_BACKEND_WS_HOST}?roomId=${roomId}`)
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
            userId: dataHandler.getState("Id"),
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

  function handleShowMembersTab(){
    setShowMembersTab(prev => !prev)
  }
  return (
    <div className="flex flex-col relative w-full min-h-dvh text-white font-saira">
      <div className={`fixed inset-0 pointer-events-none bg-center bg-fixed -z-10 bg-[url('/bgs/eva-003-mid.png')] bg-cover bg-no-repeat brightness-60 top-0  -left-102 w-200 sm:left-0 sm:w-full min-h-dvh  overflow-x-hidden`}></div>
      {/* <StatusBox dataHandler={dataHandler} /> */}
      <div className="flex flex-col md:flex-row w-full">
        <MemberPanel dataHandler={dataHandler} showMembersTab={showMembersTab}  />
        <ChatBox dataHandler={dataHandler} handleShowMembersTab={handleShowMembersTab}  />
        <EventPanel />
      </div>
    </div>
  );
}
