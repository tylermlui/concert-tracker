const form = document.getElementById("myForm");
form.addEventListener("submit", function (event) {
  const location = form[0].value;

  // Make an asyncronous GET request to the Ticketmaster API
  $.ajax({
    type: "GET",
    url:
    // Filter by music events in the US (make sure to properly add the api key to the URL)
      "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&classificationName=music&city=" +
      location +
      "&apikey=" + API_KEY,
    async: true,
    dataType: "json",
    success: function (json) {
      console.log(json); // for debugging purposes
      var e = document.getElementById("events");
      if (e) {
        e.innerHTML = json.page.totalElements + " events found.";
        for (var i = 0; i < json.page.size; i++) {
          $("#events").append(
            "<p>" +
             json._embedded.events[i].name + "<br>" +
             json._embedded.events[i].id + "<br>" + 
             json._embedded.events[i].dates.timezone + "<br>" +
             json._embedded.events[i].dates.start.localDate + "<br>" +
             json._embedded.events[i].dates.start.localTime + "<br>" +
             json._embedded.events[i].classifications[0].genre.name + "<br>$" +
             json._embedded.events[i].priceRanges[0].min + " - $ " +
             json._embedded.events[i].priceRanges[0].max + "<br>" +
             json._embedded.events[i]._embedded.venues[0].name + "<br>" +
             "</p>");

        }
      } else {
        console.error("No element with id 'events' found.");
      }
    },
    error: function (xhr, status, err) {
      console.log(err);
      console.error("Failed to fetch data from Ticketmaster API.");
    },
  });
  event.preventDefault();
});

// Preferred not to use latlong to search for events because it might not be supported in future releases.
// Can filter by radius or by city so no need to use google map's api i just need to get the user's entered string and pass that into the URL
// once i have a list of events, get event details through attractions like name, city/country, image, genre, start time, date, TimeZone, Price Range
// Add a view seating button that will take the user to the ticketmaster website to view seating