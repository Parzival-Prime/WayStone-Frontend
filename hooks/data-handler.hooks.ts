import { DataHandler } from "@/utils/incoming-data-handler";
import { useEffect, useState } from "react";

export function useMessagesState(dataHandler: DataHandler) {
    const [messages, setMessages] = useState([...dataHandler.getState("messages")])

    useEffect(() => {
        const cleaner = dataHandler.addListener("messages", (newMessagesState) => {
            setMessages(newMessagesState)
        })
        return () => cleaner()
    }, [dataHandler])

    return messages
}

export function useConnectionsState(dataHandler: DataHandler) {
    const [connectionStatus, setConnectionStatus] = useState(dataHandler.getState("connectionStatus"))

    useEffect(() => {
        const cleaner = dataHandler.addListener("connectionStatus", (newConnectionState) => {
            setConnectionStatus(newConnectionState)
        })
        return () => cleaner()
    }, [dataHandler])

    return connectionStatus
}

export function useUsernameState(dataHandler: DataHandler) {
    const [username, setUsername] = useState(dataHandler.getState("username"))

    useEffect(() => {
        const cleaner = dataHandler.addListener("username", (newUsernameState) => {
            setUsername(newUsernameState)
        })
        return () => cleaner()
    }, [dataHandler])

    return username
}

export function useUserIDState(dataHandler: DataHandler): string {
    const [userId, setUserId] = useState(dataHandler.getState("Id"))

    useEffect(() => {
        const cleaner = dataHandler.addListener("Id", (newUserId) => {
            setUserId(newUserId)
        })
        return () => cleaner()
    }, [dataHandler])

    return userId
}

export function useRoomIDState(dataHandler: DataHandler): string {
    const [roomId, setRoomId] = useState(dataHandler.getState("roomId"))

    useEffect(() => {
        const cleaner = dataHandler.addListener("roomId", (newRoomId) => {
            setRoomId(newRoomId)
        })
        return () => cleaner()
    }, [dataHandler])

    return roomId
}

export function useAllMembersDataState(dataHandler: DataHandler) {
    const [allMembers, setAllMembers] = useState(() => [...dataHandler.getState("allMembers")])

    useEffect(() => {
        const cleaner = dataHandler.addListener("allMembers", (newAllMembersData) => {
            // console.log("listener fired", newAllMembersData.length, newAllMembersData)
            setAllMembers(prev => [...newAllMembersData])
        })
        return () => cleaner()
    }, [dataHandler])

    return allMembers
}

export function useLatency(dataHandler: DataHandler) {
    const [latency, setLatency] = useState(dataHandler.getState("latency"))

    useEffect(() => {
        const cleaner = dataHandler.addListener("latency", (newLatency) => {
            setLatency(newLatency)
        })
        return () => cleaner()
    }, [dataHandler])

    return latency
}
