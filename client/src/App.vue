<template>
  <div class="container">
    <MessageTabs />
    <Messages :messages="messages" />
  </div>
</template>

<script>
import io from "socket.io-client";
import { ref } from "vue";
import MessageTabs from "./components/MessageTabs";
import Messages from "./components/Messages";

export default {
  components: {
    MessageTabs,
    Messages,
  },
  setup() {
    const API_URL =
      window.location.hostname == "localhost"
        ? "http://localhost:5000"
        : "officialURL";
    const socket = io(API_URL);

    const messages = ref([]);
    const questions = ref([]);
    const newSubs = ref([]);

    socket.on("twitchMessage", getMessages);
    socket.on("twitchSub", getNewSubs);

    function getMessages(message) {
      messages.value.push({
        id: Date.now(),
        chatId: message.chatId,
        author: message.displayName,
        message: message.message,
        badgeInfo: message.badgeInfo,
        badges: message.badges,
        mod: message.mod,
        color: message.color,
        subscriber: message.subscriber,
        messageType: message.messageType,
        seen: false,
        pinned: false,
      });

      if (message.message.includes("?")) {
        questions.value.push({
          id: Date.now(),
          chatId: message.chatId,
          author: message.displayName,
          message: message.message,
          badgeInfo: message.badgeInfo,
          badges: message.badges,
          mod: message.mod,
          color: message.color,
          subscriber: message.subscriber,
          messageType: message.messageType,
          seen: false,
          pinned: false,
        });
      }
    }

    function getNewSubs(sub) {
      newSubs.value.push({
        channel: sub.channel,
        username: sub.username,
        mothods: sub.method,
        message: sub.message,
        userstate: sub.userstate,
        seen: false,
      });

      console.log(newSubs);
    }

    return {
      messages,
      questions,
    };
  },
};
</script>

<style>
@font-face {
  font-family: "Commissioner";
  src: url("../public/fonts/commissioner.ttf") format("truetype");
}
@font-face {
  font-family: "Staatliches";
  src: url("../public/fonts/staatliches.ttf") format("truetype");
}

body {
  font-family: "Commissioner";
  margin: 0;
  padding: 0;
  background-color: #222;
}
body * {
  box-sizing: border-box;
}
.container {
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}
</style>
