<!--Used to create a new row for every 3 events-->
<div class="row">
  <slot>Event 1</slot>
</div>

<style>
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>