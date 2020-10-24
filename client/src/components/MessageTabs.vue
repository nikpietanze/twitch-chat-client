<template>
  <div class="tabs">
    <div class="tab active" @click="filterMessages">
      <span>All</span>
    </div>
    <div class="tab" @click="filterMessages">
      <span>Questions</span>
    </div>
    <div class="tab" @click="filterMessages">
      <span>Pinned</span>
    </div>
    <div class="tab" @click="filterMessages">
      <span>Donations</span>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    function filterMessages(event) {
      document.querySelectorAll(".tabs .tab").forEach((tab) => {
        if (tab !== event.target) tab.classList.remove("active");
      });
      event.target.classList.toggle("active");
    }

    return {
      filterMessages,
    };
  },
};
</script>

<style>
.tabs {
  width: 100%;
  display: flex;
  justify-content: space-between;
  grid-gap: 0.5rem;
  color: #fff;
  margin: 1rem 0;
}
.tabs .tab {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.35rem;
  cursor: pointer;
  background-color: #111;
  padding: 1rem;
  transition: all 0.3s ease;
  border-radius: 0.75rem;
  border: 3px solid lightblue;
}
.tabs .tab:not(.active):hover {
  background-color: #000;
  border-color: lightskyblue;
}
.tabs .tab.active:hover {
  background-color: #000;
  border-color: cyan;
}
.tabs .tab.active {
  border-color: cyan;
}
.tabs .tab span {
  pointer-events: none;
  font-family: "Staatliches", sans-serif;
  text-transform: uppercase;
}
</style>