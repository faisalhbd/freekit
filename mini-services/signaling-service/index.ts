import { WebSocketServer, WebSocket } from "ws";

const PORT = 3003;
const wss = new WebSocketServer({ port: PORT });

/**
 * Simple WebRTC signaling server.
 *
 * Protocol:
 *   Client -> Server:  { type: "join", room: string }
 *   Client -> Server:  { type: "signal", room: string, payload: any }
 *   Client -> Server:  { type: "file-meta", room: string, payload: any }
 *   Server -> Client:  { type: "joined", room: string, peerCount: number }
 *   Server -> Client:  { type: "peer-joined", room: string, peerCount: number }
 *   Server -> Client:  { type: "signal", from: string, payload: any }
 *   Server -> Client:  { type: "file-meta", from: string, payload: any }
 *   Server -> Client:  { type: "error", message: string }
 *   Server -> Client:  { type: "peer-left", peerCount: number }
 */

interface Room {
  peers: Map<string, WebSocket>;
}

const rooms = new Map<string, Room>();

function getRoom(roomId: string): Room {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, { peers: new Map() });
  }
  return rooms.get(roomId)!;
}

function generatePeerId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

function broadcastToRoom(room: Room, message: object, excludePeer?: string) {
  const data = JSON.stringify(message);
  for (const [peerId, ws] of room.peers) {
    if (peerId !== excludePeer && ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  }
}

function cleanupRoom(roomId: string) {
  const room = rooms.get(roomId);
  if (room && room.peers.size === 0) {
    rooms.delete(roomId);
  }
}

// Auto-cleanup stale rooms every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [roomId, room] of rooms) {
    if (room.peers.size === 0) {
      rooms.delete(roomId);
    }
  }
}, 5 * 60 * 1000);

wss.on("connection", (ws) => {
  const peerId = generatePeerId();
  let currentRoom: string | null = null;

  ws.on("message", (raw) => {
    let msg: any;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      ws.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
      return;
    }

    if (msg.type === "join") {
      const roomId = String(msg.room).trim();
      if (!roomId) {
        ws.send(JSON.stringify({ type: "error", message: "Room ID required" }));
        return;
      }

      // Leave previous room if any
      if (currentRoom) {
        const prevRoom = rooms.get(currentRoom);
        if (prevRoom) {
          prevRoom.peers.delete(peerId);
          broadcastToRoom(prevRoom, { type: "peer-left", peerCount: prevRoom.peers.size });
          cleanupRoom(currentRoom);
        }
      }

      currentRoom = roomId;
      const room = getRoom(roomId);
      room.peers.set(peerId, ws);

      // Notify the joining peer
      ws.send(
        JSON.stringify({
          type: "joined",
          room: roomId,
          peerCount: room.peers.size,
          peerId,
        })
      );

      // Notify others in the room
      broadcastToRoom(
        room,
        { type: "peer-joined", room: roomId, peerCount: room.peers.size },
        peerId
      );
    } else if (msg.type === "signal") {
      if (!currentRoom) {
        ws.send(JSON.stringify({ type: "error", message: "Join a room first" }));
        return;
      }
      const room = rooms.get(currentRoom);
      if (room) {
        broadcastToRoom(
          room,
          { type: "signal", from: peerId, payload: msg.payload },
          peerId
        );
      }
    } else if (msg.type === "file-meta") {
      if (!currentRoom) {
        ws.send(JSON.stringify({ type: "error", message: "Join a room first" }));
        return;
      }
      const room = rooms.get(currentRoom);
      if (room) {
        broadcastToRoom(
          room,
          { type: "file-meta", from: peerId, payload: msg.payload },
          peerId
        );
      }
    }
  });

  ws.on("close", () => {
    if (currentRoom) {
      const room = rooms.get(currentRoom);
      if (room) {
        room.peers.delete(peerId);
        broadcastToRoom(room, { type: "peer-left", peerCount: room.peers.size });
        cleanupRoom(currentRoom);
      }
    }
  });

  ws.on("error", () => {
    // Silent error handling
  });
});

console.log(`[Signaling] WebSocket server running on ws://localhost:${PORT}`);
