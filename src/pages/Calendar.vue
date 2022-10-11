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
      :disable-views="['years', 'year', 'week', 'day']"
      active-view="month"
      :on-event-click="onEventClick"
      @cell-dblclick="createNewEntry"
      events-on-month-view="short"
      style="height: 600px"
      class="vuecal--blue-theme"
    >
    </vue-cal>
    <w-flex justify-end>
      <w-button route="/journal/new" xl right class="mt5 teal-dark1--bg">
        + New Entry
      </w-button>
    </w-flex>
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
    getDataFromDB();
  },
  computed: {
    // ...mapGetters("dialog", ["getLoadingState", "getErrorState"]),
    ...mapGetters({ entries: "journal/getEntries" }),
  },
  methods: {
    // ...mapActions("dialog", ["setLoading"]),
    // ...mapActions("journal", ["setEntryData", "setSelectedDate"]),
    ...mapActions("journal", ["setSelectedDate"]),
    onEventClick(event, e) {
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