"use client";

import { RefObject, useState } from "react";
import { SenderMessage, UserMessage } from "@/components/message-box";
import type { DataHandler } from "@/utils/incoming-data-handler";
import {
  useConnectionsState,
  useMessagesState,
  useRoomIDState,
  useUserIDState,
  useUsernameState,
} from "@/hooks/data-handler.hooks";
import { ChatMessageDataExchangeFormat, DataType } from "@/types/data.types";
import { toast } from "sonner";

export default function ChatBox({ dataHandler }: { dataHandler: DataHandler }) {
  const [newMessage, setNewMessage] = useState("");
  const messages = useMessagesState(dataHandler);
  const Id = useUserIDState(dataHandler);
  const roomId = useRoomIDState(dataHandler);
  const connectionStatus = useConnectionsState(dataHandler);
  const username = useUsernameState(dataHandler);

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
  return (
    <div className="h-svh flex-8 flex flex-col shadow-lg border-x border-white/20">
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
        className=" flex flex-col flex-1 p-6 space-y-4 
      "
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
            <UserMessage key={index} message={messageObj.message} className="self-end" />
          )
        )}
      </div>

      <form onSubmit={sendMessage} className=" p-6">
        <div className="flex gap-3">
          <input
            type="text"
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
