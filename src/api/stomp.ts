import {Client} from '@stomp/stompjs';

export const client = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    debug: function (str) {
        console.log(str);
    },
    reconnectDelay: 5000, //자동 재 연결
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

client.activate()