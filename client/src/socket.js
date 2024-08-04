import { io } from 'socket.io-client';

const socket = io(import.meta.env.DEV ? 'http://localhost:5000' : import.meta.env.VITE_SERVER_URL, { withCredentials: true });

export default socket