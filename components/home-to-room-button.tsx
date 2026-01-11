"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function HomeToRoomButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false)

  async function handleButtonClick() {
    setIsPending(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HTTP_HOST}/allocate-room`).then(
        (res) => res.json()
      );
      if (res?.success) {
        toast.success("routing to room");
        router.push(`/room/${res.roomId}`)

      } else {
        toast.error("room not allocated!");
      } 
    } catch (error) {
    } finally {
      setIsPending(false)
    }
  }
  return (
    <button
      className="rounded-lg flex items-center justify-center z-5 text-center text-lg px-4 h-13 w-40 md:h-10 md:w-40 mt-19 font-amarna relative cursor-pointer
            border border-white/10 bg-white/5 drop-shadow-lg shadow-md backdrop-filter backdrop-blur-[2px]
            hover:shadow-xl/60 hover:bg-white/15 hover:backdrop-blur-sm  hover:scale-104 
            active:shadow-xl/90 active:bg-white/8 active:backdrop-blur-xs active:scale-102
            transition-all duration-150 ease-in-out
            "
      onClick={()=>handleButtonClick()}
      disabled={isPending}
    >
      Give it a try &nbsp;
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-arrow-out-up-right-icon lucide-circle-arrow-out-up-right"
      >
        <path d="M22 12A10 10 0 1 1 12 2" />
        <path d="M22 2 12 12" />
        <path d="M16 2h6v6" />
      </svg>{" "}
    </button>
  );
}
