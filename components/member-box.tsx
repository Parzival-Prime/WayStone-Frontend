import { useAllMembersDataState } from "@/hooks/data-handler.hooks";
import { useLatency, useUsernameState } from "@/hooks/data-handler.hooks";
import type { DataHandler } from "@/utils/incoming-data-handler";

export default function MemberPanel({
  dataHandler, showMembersTab
}: {
  dataHandler: DataHandler;
  showMembersTab: boolean
}) {
  const members = useAllMembersDataState(dataHandler);
  const username = useUsernameState(dataHandler);
  const latency = useLatency(dataHandler);
  return (
    <div className={`origin-top-left scale-[0.85] sm:scale-[0.9] md:scale-100 flex-4 md:static w-90 absolute top-25
    ${showMembersTab ? "left-0 pl-9 z-10" : "-left-full"} transition-all duration-100 ease-in-out`}>
      
      <div className="relative h-38 mb-4 p-5 pl-8 md:top-4 md:left-2 text-[#96c3fd]">
        <div className="-z-5 absolute h-36 w-54 top-0 left-5 bg-[url('/themes/mech/username-box-2.svg')] bg-cover bg-no-repeat scale-120">
        </div>
        Username: <span className="font-medium">{username}</span> <br /> Ping:{" "}
        ~{latency}ms
        <div className="absolute bottom-6 right-23 h-10 w-25 font-medium text-shadow-lg font-orbitron text-4xl text-amber-400 cursor-none">003</div>
      </div>

      <div className="relative top-4 left-1 h-100 py-2 px-5 space-y-2">
      <div className="-z-5 absolute w-75 h-105 top-0 left-0 bg-[url('/themes/mech/members-board-2.svg')] bg-cover bg-no-repeat"></div>
        <div className="text-2xl font-medium text-amber-400 mb-2 w-full text-center">
          Members
        </div>
        <div className="ml-5 py-3 h-88 overflow-y-auto no-scrollbar">
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
    <div className={` w-[70%] text-md mb-3 px-2 ml-4
      relative tracking-wide font-normal 
      ${musername === username ? "text-amber-400" : "text-[#00eeff]"}
    `}>

      <div className="-z-5 absolute -top-1 left-0 h-8.5 w-35.5 bg-[url('/themes/mech/member-username-box.svg')] bg-cover bg-no-repeat"></div>
      {musername}
    </div>
  );
}
