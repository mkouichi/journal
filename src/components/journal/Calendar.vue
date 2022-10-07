<template>
  <section>
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
    <!-- <RouterLink to="/journal/new">+ New Entry</RouterLink> -->
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
      modifiedEntries: [
        // {
        //   start: "2022-10-08",
        //   end: "2022-10-08",
        //   title: "Need to go shopping",
        //   content: '<i class="icon material-icons">shopping_cart</i>',
        //   class: "leisure",
        // },
        // {
        //   start: "2022-10-10",
        //   end: "2022-10-10",
        //   title: "Golf with John",
        //   content: '<i class="icon material-icons">golf_course</i>',
        //   class: "sport",
        // },
        // {
        //   start: "2022-10-20",
        //   end: "2022-10-20",
        //   title: "My birthday",
        //   content: '<i class="icon material-icons">cake</i>',
        //   class: "sport",
        // },
      ],
    };
  },
  computed: {
    setModifiedEntries() {
      const modifiedEntries = [];
      this.entries.forEach((element) => {
        element;
        modifiedEntries.push({
          ...element,
          start: element.date,
          end: element.date,
          // start: "2022-10-08",
          // end: "2022-10-08",
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

<style scoped>
/* Calendar */
/* .vuecal--month-view .vuecal__cell {
  height: 80px;
} */
/* .vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
} */
/* .vuecal--month-view .vuecal__cell-date {
  padding: 4px;
} */
/* .vuecal--month-view .vuecal__no-event {
  display: none;
} */

/* Different color for different event types. */
/* .vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event.sport {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
} */
</style>