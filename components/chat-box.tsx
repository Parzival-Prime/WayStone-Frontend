"use client";

import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SenderMessage, UserMessage } from "@/components/message-box";
import type { DataHandler } from "@/utils/incoming-data-handler";
import { gsap, Power2 } from "gsap";
import {
  useConnectionsState,
  useMessagesState,
  useRoomIDState,
  useUserIDState,
  useUsernameState,
} from "@/hooks/data-handler.hooks";
import { ChatMessageDataExchangeFormat, DataType } from "@/types/data.types";
import { toast } from "sonner";
import { ArrowDownIcon } from "lucide-react";

export default function ChatBox({ dataHandler }: { dataHandler: DataHandler }) {
  const [newMessage, setNewMessage] = useState("");
  const messages = useMessagesState(dataHandler);
  const Id = useUserIDState(dataHandler);
  const roomId = useRoomIDState(dataHandler);
  const connectionStatus = useConnectionsState(dataHandler);
  const username = useUsernameState(dataHandler);
  const chatRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [showScrollToBottomBtn, setShowScrollToBottomBtn] = useState(false)

  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (dataHandler.wsRef.current?.readyState === WebSocket.OPEN) {
      if (!Id || !roomId || !username || !newMessage) {
        toast.error("Data is not complete cannot send Message!");
        return;
      }
      const onBoardingDataObject: ChatMessageDataExchangeFormat = {
        type: DataType.USER_MESSAGE,
        message: newMessage,
        roomId: roomId,
        userId: Id,
        username: username,
      };
      const onBoardingData = JSON.stringify(onBoardingDataObject);
      dataHandler.wsRef.current.send(onBoardingData);
      setNewMessage("");
    }
  }

  const handleScroll = () => {
    const el = chatRef.current;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    // threshold in px (tweak this)
    setShouldAutoScroll(distanceFromBottom < 100);
  };

  function handleScrollToBottom(){
    const el = chatRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
    setShowScrollToBottomBtn(false)
  }

  useEffect(() => {
    if (!shouldAutoScroll) {
      setShowScrollToBottomBtn(true)
      return
    };

    const el = chatRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useLayoutEffect(() => {
    gsap.fromTo('#scroll-to-bottom-btn', 
      {
        bottom: 67
      },
      {
        bottom: 72,
        duration: 0.7,
        repeat: -1,
        smoothOrigin: true,
        yoyoEase: Power2.easeInOut
      }
    )
  }, [])

  return (
    <div className="relative h-svh flex-8 flex flex-col shadow-lg border-x border-white/20">
      <div
        className={`px-6 py-3 text-sm font-medium border-b border-neutral-100/20 ${
          connectionStatus === "connected"
            ? " text-green-400"
            : connectionStatus === "disconnected"
            ? " text-rose-800"
            : " text-yellow-700 "
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              connectionStatus === "connected"
                ? "bg-green-400"
                : connectionStatus === "disconnected"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          ></div>
          Status: {connectionStatus}
        </div>
      </div>

      <div
        ref={chatRef}
        onScroll={handleScroll}
        className=" flex flex-col flex-1 p-6 space-y-4 overflow-y-auto no-scrollbar"
      >
        {messages.map((messageObj, index) =>
          messageObj.Id !== Id ? (
            <SenderMessage
              key={index}
              message={messageObj.message}
              username={messageObj.username}
              className="self-start"
            />
          ) : (
            <UserMessage
              key={index}
              message={messageObj.message}
              className="self-end"
            />
          )
        )}
      </div>

       <div
          onClick={handleScrollToBottom}
          id="scroll-to-bottom-btn"
          className={`absolute flex justify-center items-center bottom-67 left-[40%] h-10 w-10 rounded-full bg-cyan-400/80 shadow-[0_0_10px_rgba(37,84,255,0.6)] ${!showScrollToBottomBtn && "hidden"}`}
        >
          <ArrowDownIcon color="#000000" />
        </div>

      <form onSubmit={sendMessage} className="px-6 py-3">
        <div className="flex gap-3">
          <input
            type="textarea"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border-2 border-[#2554ff] px-4 py-2 focus:outline-none focus:ring-2 text-[#96c3fd] focus:ring-[#2554ff] focus:border-transparent transition-all focus:text-amber-400
            bg-[#00374d] 
            "
            placeholder="Type your message..."
          />
          <button
            type="submit"
            disabled={connectionStatus !== "connected"}
            className={`px-6 py-2 my-1 font-medium transition-all text-[#96c3fd] relative`}
          >
            {/*  */}
            <div className="-z-5 absolute scale-90 -top-1 left-0 w-full h-11.5 bg-[url('/themes/mech/send-button.svg')] bg-cover bg-no-repeat"></div>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
