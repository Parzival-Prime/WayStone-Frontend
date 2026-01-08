export interface StateType  {
    connectionStatus: "connected" | "disconnected" | "connecting";
    roomId: string;
    Id: string;
    username: string;
    messages: { message: string, Id: string, username: string }[];
    allMembers: { memberId: string, username: string }[];
    latency: number
}

export type StateKey = keyof StateType
