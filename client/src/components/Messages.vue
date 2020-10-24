<template>
  <div class="messages">
    <div
      class="message"
      v-for="message in newMessages"
      :key="message.id"
      :style="{ borderColor: message.color }"
    >
      <div class="icons">
        <i @click="closeMsg(message)" class="far fa-times-circle close"></i>
      </div>

      <div class="author">
        <p>{{ message.author }}</p>
        <i class="fas fa-star subscriber" v-if="message.subscriber"></i>
      </div>
      <div class="text">
        <p>{{ message.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    messages: Object,
  },
  setup(props) {
    const messages = computed(() => props.messages);

    function closeMsg(message) {
      message.seen = true;
    }

    const newMessages = computed(() =>
      messages.value.filter((message) => message.seen === false).slice()
    );

    return {
      closeMsg,
      newMessages,
    };
  },
};
</script>

<style>
.messages {
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  grid-gap: 0.5rem;
}
.message {
  width: 100%;
  font-size: 1.1rem;
  padding: 1.5rem 2rem;
  border-width: 3px;
  border-style: solid;
  border-radius: 0.75rem;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),
    url(../../public/img/message_bg.jpg);
  color: #eee;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 120px;
  box-shadow: inset 0 0 40px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.message:hover {
  box-shadow: inset 0 0 60px 30px rgba(0, 0, 0, 0.2);
}
.message .author {
  display: flex;
  grid-gap: 0.5rem;
}
.message .author p {
  margin: 0;
  font-weight: bold;
}
.message .text {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.message .text p {
  margin-bottom: 0;
}
.message .icons {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
  grid-gap: 0.5rem;
}
.message .icons > * {
  font-size: 1.5rem;
  opacity: 0.5;
  transition: all 0.3s ease;
  cursor: pointer;
}
.message .icons > *:hover {
  opacity: 1;
}
.message .subscriber {
  color: gold;
  cursor: default;
}
.message .donation {
  animation: bounce 400ms alternate ease-in-out infinite;
}

@keyframes bounce {
  0% {
    transform: translateY(-2vmin);
  }
  100% {
    transform: translateY(2vmin);
  }
}
</style>