import { 
    ChatMessageDataExchangeFormat, 
    UserInitDataExchangeFormat,
    NewMemberEventDataExchangeFormat,
    LatencyPingDataExchangeFormat,
    DataType, 
    MemberDisconnectionDataExchangeFormat,
    LatencyPongDataExchangeFormat
} from "@/types/data.types";
import { RefObject } from "react";
import { StateKey, StateType } from "@/types/data-handler.types"
import { toast } from "sonner";


export class DataHandler {
    private listeners = new Map<
        StateKey,
        Set<(value: StateType[StateKey]) => void>
>()

    private globalState: StateType = {
        connectionStatus: "connecting",
        username: "",
        messages: [],
        allMembers: [],
        Id: "",
        roomId: "",
        latency: 0
    }

    constructor(public wsRef: RefObject<WebSocket | null>) { }

    public getState<K extends StateKey>(key: K): StateType[K] {
        const value = this.globalState[key]
        return Array.isArray(value) ? [...value] as StateType[K] : value
    }

    public addListener<K extends StateKey>(key: K, cb: (value: StateType[K]) => void) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set())
        }

        this.listeners.get(key)!.add(cb as any)

        return () => {
            this.listeners.get(key)!.delete(cb as any)
        }
    }

    private callTheCallBacks<K extends StateKey>(key: K) {
        const value = this.getState(key)
        this.listeners.get(key)?.forEach(cb => cb(value))
    }

    private callTheCallBacksForArray<K extends StateKey>(key: K, value: StateType[K]) {
        this.listeners.get(key)?.forEach(cb => cb(value))
    }

    public incomingMessageHandler(data: any) { // data is parsed into JSON
        switch (data.type) {

            case DataType.USER_MESSAGE:
                this.handleUserMessage(data)
                break

            case DataType.INIT:
                this.handleInit(data)
                break

            case DataType.LATENCY_PONG:
                this.handleLatencyPong(data)
                break

            case DataType.NEW_MEMBER_EVENT:
                this.handleNewMemberEvent(data)
                break

            case DataType.MEMBER_DISCONNECTED_EVENT:
                this.handleMemberDisconnectedEvent(data)
                break

            // case DataType.USERNAME_CHANGE:
            //     this.handleUsernameChange(data)
            //     break

            // case DataType.MEMBER_USERNAME_CHANGE_EVENT:
            //     this.handleMemberUsernameChange(data)
            //     break

            default:
                console.log(data)
                break
        }
    }

    public handleInit(data: UserInitDataExchangeFormat) {
        if(!data.userId || !data.roomId){
            toast.error("UserID or RoomID not found in INIT Data!")
        }
        this.globalState.Id = data.userId
        this.globalState.roomId = data.roomId
        if (!data.username || data.username.trim() === "") {
            throw new Error("Invalid username!")
        }
        this.globalState.username = data.username
        this.callTheCallBacks("username")
        this.callTheCallBacks("Id")
        this.callTheCallBacks("roomId")
        if (!data.allMembersData) {
            throw new Error("All Members data not found!")
        } else {
            this.globalState.allMembers = data.allMembersData
        }
        this.callTheCallBacksForArray("allMembers", this.globalState.allMembers)
    }

    public handleUserMessage(data: ChatMessageDataExchangeFormat) {
        if (!data.message || data.message.trim() === "") {
            throw new Error("Incorrect inncoming user message form!")
        }
        if (!data.username || data.username.trim() === "") {
            throw new Error("Incorrect incoming username form in USER_MESSAGE!")
        }
        this.globalState.messages.push({ message: data.message, Id: data.userId, username: data.username })
        this.callTheCallBacks("messages")
    }

    public setStatus(status: "connected" | "disconnected" | "connecting") {
        this.globalState.connectionStatus = status
        this.callTheCallBacks("connectionStatus")
    }

    public handleLatencyPong(data: LatencyPongDataExchangeFormat) {
        if (!data.timestamp || typeof data.timestamp !== "number") {
            throw new Error("Invalid timestamp error!")
        }
        this.globalState.latency = (Date.now() - data.timestamp)
        this.callTheCallBacks("latency")
    }

    public handleNewMemberEvent(data: NewMemberEventDataExchangeFormat) {
        if (!data.newMemberUsername || data.newMemberUsername.trim() === "") {
            throw new Error("Invalid new member username error!")
        }
        const next = [...this.globalState.allMembers, { memberId: data.newMemberId, username: data.newMemberUsername }]
        this.globalState.allMembers = next
        this.callTheCallBacksForArray("allMembers", next)
        toast.info(`${data.newMemberUsername} joined!`)
    }

    public handleMemberDisconnectedEvent(data: MemberDisconnectionDataExchangeFormat) {
        try {
            if (!data.message || data.message.trim() === "") {
                throw new Error("Invalid Member disconnection Message!")
            }
            const next = this.globalState.allMembers.filter((m) => {
                if (m.memberId === data.userId) {
                    toast.info(`${m.username} left!`)
                    return false
                }
                return true
            })
            this.globalState.allMembers = next
            this.callTheCallBacksForArray("allMembers", next)
        } catch (error) {
            console.log(error)
        }
    }

    // public handleUsernameChange(data: DataExchangeFormat) {
    //     if (!data.newUsername || data.newUsername.trim() === "") {
    //         throw new Error("Invalid newUsername error!")
    //     }
    //     this.globalState.username = data.newUsername
    //     toast.success("Spell Applied Successfully! \n New Username: " + data.newUsername)
    //     this.callTheCallBacks("username")
    // }

    // public handleMemberUsernameChange(data: DataExchangeFormat) {
    //     if (!data.newUsername || data.newUsername.trim() === "") {
    //         throw new Error("Invalid Member newusername error!")
    //     }
    //     const member = this.globalState.allMembers.find(m => m.Id === data.Id)
    //     if (member) {
    //         toast.success(`${member.username} executed a Spell \n New Username: ${data.username}`)
    //         member.username = data.newUsername as string
    //     }
    // }
}
