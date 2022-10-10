<template>
  <section>
    <vue-cal
      ref="vuecal"
      hide-view-selector
      today-button
      start-week-on-sunday
      small
      :events="getEntries"
      :time="false"
      :disable-views="['years', 'year', 'week', 'day']"
      active-view="month"
      :on-event-click="onEventClick"
      @cell-dblclick="createNewEntry"
      events-on-month-view="short"
      style="height: 600px"
      class="vuecal--blue-theme"
    >
    </vue-cal>
    <w-button route="/journal/new" xl class="ma1" bg-color="info">
      + New Entry
    </w-button>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getDataFromDB } from "../helper-functions";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  mounted() {
    // // Set loading to true
    // this.setLoading({ dataName: "journal", status: true });

    // Get initial data once from Firebase
    getDataFromDB();

    // // Set loading to false
    // this.setLoading({ dataName: "journal", status: false });

    // // Set data to Vuex
    // this.setEntryData(entries);
  },
  computed: {
    ...mapGetters("journal", [
      "getLoadingState",
      "getErrorState",
      "getEntries",
    ]),
    // entries() {
    //   console.log(this.getEntries);
    //   return this.getEntries;
    // },
  },
  methods: {
    ...mapActions("journal", ["setEntryData", "setLoading", "setSelectedDate"]),
    onEventClick(event, e) {
      // this.selectedEvent = event;
      this.$router.push("/journal/" + event.id);

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
    },
    createNewEntry(event) {
      this.setSelectedDate(event.format());
      this.$router.push("/journal/new");
    },
  },
};
</script>