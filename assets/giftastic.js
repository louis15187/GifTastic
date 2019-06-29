$(document).ready(function() {
    var topics = ["baseball", "football", "hockey", "soccer", "golf", "tennis", "lacrosse", "cricket"];

    // Add buttons for original sports array
    function renderButtons() {
        $("#sports-buttons").empty();
        for (i = 0; i < topics.length; i++) {
            $("#sports-buttons").append("<button class='btn btn-success' data-sport='" + sports[i] + "'>" + sports[i] + "</button>");
        }
    }

    renderButtons();

    // Adding a button for each sport entered
    $("#add-sport").on("click", function() {
        event.preventDefault();
        var sport = $("#sports-input").val().trim();
        topics.push(sports);
        renderButtons();
        return;
    });


    // Getting gifs from api... onto html
    $("button").on("click", function() {
        var sport = $(this).attr("data-sport");
        var queryURL = "https://api.giphy.com/v1/gifs/search?" +
            sports + "&api_key=3vpYgJ7viyfVBgB4NJcuUuN56N6oQl0C"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var results = response.data;
            $("#sports").empty();
            for (var i = 0; i < results.length; i++) {
                var sportsDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var sportsImg = $("<img>");

                sportImg.attr("src", results[i].images.original_still.url);
                sportImg.attr("data-still", results[i].images.original_still.url);
                sportImg.attr("data-animate", results[i].images.original.url);
                sportImg.attr("data-state", "still");
                sportImg.attr("class", "gif");
                sportDiv.append(p);
                sportDiv.append(sportImg);
                $("#sports").append(sportsDiv);
            }
        });
    });

    function changeState() {
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    // $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", changeState);

});