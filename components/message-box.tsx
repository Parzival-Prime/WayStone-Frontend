type UserMessageProps = {
  message: string;
  className: string;
};
type SenderMessageProps = {
  message: string;
  className: string;
  username: string;
};

export function UserMessage({ message, className }: UserMessageProps) {
  return (
    <div
      className={`${className} w-fit max-w-sm h-auto border-2 border-[#2554ff] bg-[#00374d] rounded-lg px-1.75 py-1 whitespace-pre-wrap wrap-anywhere text-[#96c3fd]`}
    >
      {message} 
    </div>
  );
}

export function SenderMessage({
  message,
  className,
  username,
}: SenderMessageProps) {
  return (
    <div
      className={`${className} relative w-fit max-w-sm h-auto border-2 border-[#2554ff] bg-[#00374d] rounded-lg px-1.75 py-1 whitespace-pre-wrap wrap-anywhere text-[#96c3fd]`}
    >
      {username && (
        <span className="text-[.7rem] block mb-0.5 text-amber-400">
          {username}
        </span>
      )}
      {message}
    </div>
  );
}
