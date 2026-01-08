import { useLatency, useUsernameState } from "@/hooks/data-handler.hooks"
import type { DataHandler } from "@/utils/incoming-data-handler"


export default function StatusBox({dataHandler}: {dataHandler: DataHandler}) {
  const username = useUsernameState(dataHandler)
  const latency = useLatency(dataHandler)
  return (
    <div className='w-full p-2 max-w-6xl flex justify-around border rounded-lg border-purple-500 bg-purple-700/20'>
      <div>Username : {username}</div>
      <div>Ping: ~{latency}ms</div>
    </div>
  )
}
