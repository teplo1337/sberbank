export class Room {
    name: string;
    times: Time [];
    id: number;
}
export class Time {
    roomId: number;
    busy: boolean;
    title: string;
    event_id: string;
    startTime: number;
}
