export class Event {
    _id: string;
    day: string;
    title: string;
    room_id: number;
    who: string;
    start_time: number;
    end_time: number;
    roomName: string;
}

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
    roomName: string;
}
