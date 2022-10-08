<template>
  <section v-if="entries">
    <vue-cal
      ref="vuecal"
      hide-view-selector
      today-button
      start-week-on-sunday
      small
      :events="modifiedEntries"
      :time="false"
      :disable-views="['years', 'year', 'week', 'day']"
      active-view="month"
      :on-event-click="onEventClick"
      events-on-month-view="short"
      style="height: 600px"
      class="vuecal--blue-theme"
    >
    </vue-cal>
    <w-button
      route="/journal/new"
      @click="createNewEntry"
      xl
      class="ma1"
      bg-color="info"
    >
      + New Entry
    </w-button>
  </section>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  props: ["entries"],
  data() {
    return {
      modifiedEntries: [],
    };
  },
  computed: {
    setModifiedEntries() {
      const modifiedEntries = [];
      this.entries.forEach((entry) => {
        modifiedEntries.push({
          ...entry,
          start: entry.date,
          end: entry.date,
        });
      });
      this.modifiedEntries = modifiedEntries;
    },
  },
  methods: {
    onEventClick(event, e) {
      this.selectedEvent = event;
      this.showDialog = true;

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
    },
    createNewEntry() {
      console.log("+");
    },
    // createEvent() {
    //   this.$refs.vuecal.createEvent(
    //     // TODO: Double click to also create an entry?
    //   );
    // },
  },
};
</script>