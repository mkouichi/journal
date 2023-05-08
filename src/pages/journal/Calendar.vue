<template>
  <section>
    <vue-cal
      ref="vuecal"
      hide-view-selector
      today-button
      start-week-on-sunday
      small
      :events="entries"
      :time="false"
      :disable-views="['years', 'week', 'day']"
      active-view="month"
      :on-event-click="onEventClick"
      click-to-navigate
      @cell-click="createNewEntry"
      events-on-month-view="short"
      style="height: 600px"
    >
    </vue-cal>
    <w-flex justify-end>
      <w-button route="/journal/new" lg right class="mt5 teal-dark2--bg">
        New Entry
      </w-button>
    </w-flex>
    <div>
      <div ref="cardTitle" class="mt5 mb5 title2 text-bold"></div>
      <w-card
        v-if="events && events.length"
        no-border
        :title="`
          ${events[randomIndex].year} -
          ${events[randomIndex].month} -
          ${events[randomIndex].day}
          `"
      >
        <p>{{ events[randomIndex].event }}</p>
      </w-card>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import axios from "axios";

import { loadJournalEntries } from "@/helper-functions";

const store = useStore();
const entries = computed(() => store.getters["journal/getEntries"]);

const events = ref(null);
const randomIndex = ref(null);

onBeforeMount(async () => {
  try {
    const { data } = await axios.get(
      "https://journal-u9ss.onrender.com/historical-events"
    );

    // Store the fetched data in the events array
    events.value = data.data.map((event) => {
      // If a negative integer exists in the year property, format it with BC
      const year = event.year < 0 ? `${Math.abs(event.year)} BC` : event.year;

      return {
        ...event,
        year,
      };
    });

    // Choose a random index of an event from the events array
    randomIndex.value = Math.floor(Math.random() * events.value.length);
  } catch (error) {
    console.log(error);
  }
});

const userId = computed(() => store.getters.getUserId);
const cardTitle = ref(null);

onMounted(() => {
  // Load entries for the user when the component is mounted
  loadJournalEntries(userId.value);

  // Pick a card title for historical events randomly from below
  const cardTitles = [
    "On this day in history...",
    "Remembering what happened on this day...",
    "Today in history...",
    "Looking back on this day...",
    "Did you know?",
  ];

  // Choose a random index from the titles array
  const randomIn = Math.floor(Math.random() * cardTitles.length);

  // Set the text content of the title element to the randomly chosen title
  cardTitle.value.textContent = cardTitles[randomIn];
});

const router = useRouter();
const setSelectedDate = (payload) =>
  store.dispatch("journal/setSelectedDate", payload);

// Create a new journal entry with the currently selected date
const createNewEntry = (event) => {
  // Set the selected date to the datepicker's selected date
  setSelectedDate(event.format());

  // Redirect to the new journal entry form
  router.push("/journal/new");
};

const onEventClick = (event, e) => {
  router.push("/journal/" + event.id);

  // Prevent navigating to narrower view (default vue-cal behavior).
  e.stopPropagation();
};
</script>

<style>
.vuecal__title > button {
  font-weight: bold;
  font-size: 1.2rem;
}
.vuecal--month-view {
  font-weight: bold;
  font-size: 1.1rem;
  color: #555;
}
.vuecal__event {
  background-color: #a255a2;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 3px 6px;
  margin-top: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.vuecal__event:hover {
  background-color: purple;
  color: #fff;
}
.vuecal__today-btn {
  padding: 5px 10px;
  margin: 0 2px;
}
</style>