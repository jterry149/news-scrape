$(document).ready(function() 
{
    var $winwidth = $(window).width();
    $("img.main-img").attr({
        width: $winwidth
    });
    $(window).bind("resize", function() 
    {
        var $winwidth = $(window).width();
        $("img.main-img").attr({
            width: $winwidth
        });
    });
  
    // Function to fetch the articles
    $(".scrape").click(function(event) 
    {
        event.preventDefault();
        $.get("/api/fetch").then(function(data) 
        {
            $(".articles").remove();
            $.get("/").then(function()
            {
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>", function(result) {
                  location.reload()
                });
            });
        });
    });
  
    // Function save the articles and store them into json object
    $(".save-article").click(function() 
    {
        var articleToSave = {};
        articleToSave.id = $(this).data("id");
        articleToSave.saved = true;
        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToSave
        }).then(function(data) {
            location.reload();
        });
    });
    
    // Function to remove the saved articles once called and grabbed by id from the database
    $(".removeSaved").click(function() 
    {
        var articleToRemoveSaved = {};
        articleToRemoveSaved.id = $(this).data("id");
        articleToRemoveSaved.saved = false;
        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToRemoveSaved
        }).then(function(data) {
            location.reload();
        });
    });
  
    // Function for the click action for the save buttons under each article
    $('.saved-buttons').on('click',  function () 
    {
        // Variable for the NEWS article id
        var thisNewsId = $(this).attr("data-value");
  
        // Attach the news article _id to the save button in the modal for each article
        $("#saveButton").attr({"data-value": thisNewsId});
  
        // Make a get ajax call for the notes attached to the article
        $.get("/notes/" + thisNewsId, function(data)
        {
            // Console log the data for each article
            console.log(data);

            // Clear the modal title, textarea and notes
            $('#noteModalLabel').empty();
            $('#notesBody').empty();
            $('#notestext').val('');
  
  
            // Append the id of the current NEWS article to modal labels in the user display
            $('#noteModalLabel').append(' ' + thisNewsId);
            
            // Add notes to articles and loop through to find other notes if there is one and grab those
            for(var i = 0; i<data.note.length; i++) 
            {
                var button = ' <a href=/deleteNote/' + data.note[i]._id + '><i class="pull-right fa fa-times fa-2x deletex" aria-hidden="true"></i></a>';
                $('#notesBody').append('<div class="panel panel-default"><div class="noteText panel-body">' + data.note[i].body + '  ' + button + '</div></div>');
            }
        });
    });
  
    // Function used to handle the click for the save note button 
    $(".savenote").click(function() 
    {
        // Grab the id associated with the articles from the submit button
        var thisNewsId = $(this).attr("data-value");
  
        // Run a POST request to change the note, using what's entered in the inputs by the user
        $.ajax({
            method: "POST",
            url: "/notes/" + thisNewsId,
            data: 
            {
                // Value taken from note textarea
                body: $("#notestext").val().trim()
            }
        })
        // With that close the request and hide the modal
        .done(function(data) 
        {
          $('#noteModal').modal('hide');
  
        });
    });
});
  
  