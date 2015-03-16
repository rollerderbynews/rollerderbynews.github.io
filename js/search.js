// After the API loads, call a function to enable the search box.

var nextPageToken = ''
// Search for a specified string.
function search() {
  var q = 'rollerderby';//$('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults : 50, 
    type: 'video',
    order: 'viewCount',
    videoDuration: 'long',
    videoEmbeddable: true,
    pageToken: nextPageToken

  });

  request.execute(function(response) {
  var str = JSON.stringify(response.result);
  nextPageToken = response.result.nextPageToken;
  //console.log(str);
  buildData(response);
    //$('#search-container').html('<pre>' + str + '</pre>');
  });
}

function buildData(response) {
  var count = 0;
  var $results = $('#results');
      if (response.result.items) {
 
        var items = response.result.items;
        var html = "";
 
        items.forEach(function (item) {
          // Check the duration of the video, 
          // full-length movies are generally longer than 1 hour
          var duration = Math.round((item.duration) / (60 * 60));
 
          // Filter out videos that aren't in the Film or Movies category
          if (true/*(duration > 0) && (item.category == "Sports" || item.category == "Education")*/) {
 
            // Include the YouTube Watch URL youtu.be
            html += '<div class="col-sm-4 portfolio-item"> \
    <a href="#portfolioModal-'+count+'" class="portfolio-link" data-toggle="modal"> \
        <div class="caption"> \
            <div class="caption-content"> \
                <i class="fa fa-search-plus fa-2x">'+item.snippet.title+'</i> \
            </div> \
        </div> \
        <img src="'+item.snippet.thumbnails.high.url +'" class="img-responsive" alt="'+item.snippet.description+'"> \
    </a> \
</div>'; 
         //   html += '<p><a href="http://youtu.be/' + item.id + '">';
 
            // Add the default video thumbnail (default quality)
            //html += '<img src="http://i.ytimg.com/vi/' + item.id + '/default.jpg">';
 
            // Add the video title and the duration
           // html += '<h2>' + item.title + ' ' + item.duration + '</h2></a></p>';
            count++;
          }
        });
      }
 
      // Did YouTube return any search results?
      if (count === 0) {
        $results.html("No videos found");
      } else {
        // Display the YouTube search results
        $results.html(html);
      }
}

jQuery(document).ready(function ($) {
   // dom is ready
});