
type MessageProps = {
    message: string
    className: string
    username:string | null
}
export default function Message({ message, className, username }: MessageProps) {
  return <div className={`${className} w-fit max-w-sm h-auto border border-emerald-950 bg-green-500/80 inset-shadow-sm inset-shadow-neutral-950 rounded-lg px-1.75 py-1 whitespace-pre-wrap wrap-anywhere text-green-950`}>
    {username && <span className="text-[.7rem] block mb-0.5 text-rose-900">{username}</span>
}
    {message}
  </div>;
}
