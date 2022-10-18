// @ts-ignore
import { createApp, reactive } from "../../libs/petite-vue.js";
// @ts-ignore
import { io } from "../../libs/socket.io.js";

let socket = io.connect("http://127.0.0.1:8080");
socket.emit('test', {data: "content data"});

console.log('test')