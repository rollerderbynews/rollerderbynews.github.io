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
        var modals ="";
 
        items.forEach(function (item) {
          // Check the duration of the video, 
          // full-length movies are generally longer than 1 hour
          // item.id.videoId
          var duration = Math.round((item.duration) / (60 * 60));
 var deb = JSON.stringify(item);
 console.log(deb);
          // Filter out videos that aren't in the Film or Movies category
          if (true/*(duration > 0) && (item.category == "Sports" || item.category == "Education")*/) {
 
            // Include the YouTube Watch URL youtu.be
            html += '<div class="col-sm-4 portfolio-item"> \
    <a href="#portfolioModal-'+count+'" class="portfolio-link" data-toggle="modal" onclick="javascript:loadVideo(\''+item.id.videoId+'\',\''+count+'\');"> \
        <div class="caption"> \
            <div class="caption-content"> \
                <i class="fa fa-search-plus fa-2x">'+item.snippet.title+'</i> \
            </div> \
        </div> \
        <img src="'+item.snippet.thumbnails.high.url +'" class="img-responsive" alt="'+item.snippet.description+'"> \
    </a> \
</div>';
modals +='<div class="portfolio-modal modal fade" id="portfolioModal-'+count+'" tabindex="-1" role="dialog" aria-hidden="true"> \
        <div class="modal-content"> \
            <div class="close-modal" data-dismiss="modal"> \
                <div class="lr"> \
                    <div class="rl"> \
                    </div> \
                </div> \
            </div> \
            <div class="container"> \
                <div class="row"> \
                    <div class="col-lg-8 col-lg-offset-2"> \
                        <div class="modal-body"> \
                            <h2>'+item.snippet.title+'</h2> \
                            <hr class="star-primary"> \
    <div class="row"> \
        <div class="col-md-12"> \
            <div class="embed-responsive embed-responsive-16by9" style="margin: 0 auto;text-align:center;"> \
                <iframe id="video-'+count+'" allowfullscreen="" src="" \
                frameborder="0"></iframe> \
            </div> \
        </div> \
    </div> \
                            <p>'+item.snippet.description+'</p> \
                            <button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i> Close</button> \
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div> \
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
        $("#search-container").html(modals);
      }
}

var loadVideo = function (videoId,count) {
   $("#video-"+count).attr('src','http://www.youtube.com/embed/'+videoId+'?feature=player_detailpage')
}

jQuery(document).ready(function ($) {
   // dom is ready

});