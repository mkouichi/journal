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
      @cell-dblclick="createNewEntry"
      events-on-month-view="short"
      style="height: 600px"

    >
    </vue-cal>
    <w-flex justify-end>
      <w-button route="/journal/new" xl right class="mt5 teal-dark3--bg">
        + New Entry
      </w-button>
    </w-flex>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getDataFromDB } from "@/helper-functions";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  mounted() {
    getDataFromDB();
  },
  computed: {
    ...mapGetters({ entries: "journal/getEntries" }),
  },
  methods: {
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

<style scoped>
.vuecal__title-bar .vuecal__flex.vuecal__title {
  background-color: blue;
  font-size: 2rem;
}
/* Green-theme. */
.vuecal__menu, .vuecal__cell-events-count {background-color: #9db942;}
.vuecal__title-bar {background-color: #7d16b9;}
.vuecal__cell--today, .vuecal__cell--current {background-color: rgba(240, 240, 255, 0.4);}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(235, 255, 245, 0.4);}
.vuecal__cell--selected:before {border-color: rgba(66, 185, 131, 0.5);}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {background-color: rgba(195, 255, 225, 0.5);}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {background-color: rgba(136, 236, 191, 0.25);}
</style>