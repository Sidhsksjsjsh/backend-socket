const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.get('/',(req,res) => {
    res.send('Server Backend & WebSocket berjalan dengan normal! 🚀');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const PORT = process.env.PORT || 3000;

wss.on('connection', (ws) => {
    console.log('✅ Klien baru terhubung ke WebSocket!');

    ws.on('message',(message) => {
        console.log('Menerima data:',message.toString());

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close',() => {
        console.log('❌ Klien terputus dari WebSocket.');
    });
});

//const PORT = process.env.PORT || 3000;

server.listen(PORT,() => {
    console.log(`Server siap dan mendengarkan di port ${PORT}`);
});
