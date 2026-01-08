import { useAllMembersDataState } from "@/hooks/data-handler.hooks";
import { useLatency, useUsernameState } from "@/hooks/data-handler.hooks";
import type { DataHandler } from "@/utils/incoming-data-handler";

export default function MemberPanel({
  dataHandler,
}: {
  dataHandler: DataHandler;
}) {
  const members = useAllMembersDataState(dataHandler);
  const username = useUsernameState(dataHandler);
  const latency = useLatency(dataHandler);
  return (
    <div className="flex-4 space-y-3 bg-black/30 pt-5 px-6 font-comfortaa">
      <div className="h-23 rounded-tl-lg rounded-br-lg p-5 text-rose-500 bg-rose-700/30">
        Username: <span className="font-medium">{username}</span> <br /> Ping:{" "}
        ~{latency}ms
      </div>
      <div className="rounded-tl-lg rounded-br-lg py-2 px-5 space-y-2 bg-violet-800/15">
        <div className="font-bold text-violet-300 mb-2 w-full text-center">
          Members
        </div>
        <div className="ml-5 py-3">
          {members.map((member, index) => (
            <MemberBox key={index} musername={member.username} username={username} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MemberBox({ musername, username }: { musername: string, username: string }) {
  return (
    <div className={`w-[70%] font-light text-sm p-1 px-2 ml-4 rounded-tl-md rounded-br-md text-violet-300 hover:bg-violet-800/50 hover:text-violet-100 transition-all duration-1.5 ease-in-out
    ${musername === username ? "border border-violet-300/35" : ""}
    `}>
      {musername}
    </div>
  );
}
