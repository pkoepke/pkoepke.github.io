/* Test pages:
http://gfycat.com/BaggyJollyCaribou
http://imgur.com/gallery/I3cBLuV
*/

// JavaScript / JQuery for the Reddit Pics Viewer web page. HTML file must include JQuery with this line: <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
// Tumbeasts by Matthew Inman are licensed under a Creative Commons Attribution 3.0 Unported License. Based on a work at theoatmeal.com.
// Wikipedia edit 2014 video by VGrias is licensed under the Creative Commons Attribution-Share Alike 3.0 Unported license. http://commons.wikimedia.org/wiki/File:Wikipedia_Edit_2014.webm
// Triple conj.ogg by Tos is licensed under the Creative Commons Attribution-Share Alike 3.0 Unported license. http://commons.wikimedia.org/wiki/File:Triple_conj.ogg

// Test lines
// document.getElementById("paragraph_for_video").innerHTML = "Updated by plain JavaScript"; // for testing only
// $( "#paragraph_for_image" ).html( "Updated by JQuery" ); // for testing only

// As soon as the page loads, add the tumblbeast image to the Imgur tag: <img id="image_tag" src="" style="max-width:100%;" />. If the image appears, JQuery is working correctly
$( "#image_tag" ).attr( "src", "oatmeal_tumbeasts/tbservers.png" );

// As soon as the page loads, add the default video to the Gfycat tag: <source id="source_tag_for_video" src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Wikipedia_Edit_2014.webm" type="video/webm" />. If the video appears, JQuery is working correctly.
var default_video = "https://upload.wikimedia.org/wikipedia/commons/4/4d/Wikipedia_Edit_2014.webm";
default_video = "http://fat.gfycat.com/BaggyJollyCaribou.webm";
default_video = "Triple_conj_VP8_Vorbis.webm";
// $( "#source_tag_for_video" ).attr( "src", default_video );
$( "#responsive_div_for_video" ).html('<video id="video_tag" autoplay loop controls muted="muted" class="embed-responsive-item" > <source id="source_tag_for_video" src="Triple_conj_VP8_Vorbis.webm" type="video/webm" /></video>');

// When the Load Subreddit button is clicked, grab the JSON from that subreddit.
function load_subreddit() {
	var subreddit_to_load = $( "#subreddit_input" ).val();
	// console.log( subreddit_to_load ); // for testing only
	$( "#span_for_output_to_user" ).html( "Loading..." )
	grab_JSON( subreddit_to_load );
}

//My modification:
/* jsonUrl = "https://www.reddit.com/r/gifs.json?jsonp=jQuery";
console.log("Getting JSON from " + jsonUrl)
redditJSON = $.ajax({
  url: jsonUrl,
  dataType: 'jsonp',
  success: function(data){console.log("success:",data);},
  error: function(error){console.log("error:",error);},
  404: function(error){console.log("404 failed AJAX:",error);},
  timeout: 5
})

document.write( redditJSON.toSource() ) */

// Another example from GitHub: https://gist.github.com/sente/947491
/* $.getJSON( "http://www.reddit.com/r/gifs.json",
  function foo(data) {
  // console.log(data) // for testing only
    $.each(data.data.children,
	  function (i, post) {
		$("#append_individual_posts").append( '<br>' + post.data.title );
        $("#append_individual_posts").append( '<br>' + post.data.title );
        $("#append_individual_posts").append( '<br>' + post.data.url );
        $("#append_individual_posts").append( '<br>' + post.data.permalink );
        $("#append_individual_posts").append( '<br>' + post.data.ups );
        $("#append_individual_posts").append( '<br>' + post.data.downs );
        $("#append_individual_posts").append( '<hr>' );
      }
    )
  }
)
      .success(function() { alert("second success"); })
      .error(function() { alert("error"); })
      .complete(function() { alert("complete"); })
*/

// Function to grab JSON once the subreddit has been chosen. Modified from another example from StackOverflow: http://stackoverflow.com/questions/1739800/variables-set-during-getjson-function-only-accessible-within-function
var redditJSON = {}
function grab_JSON( subreddit_to_load ) {
  subreddit_URL = "http://www.reddit.com/r/" + subreddit_to_load + ".json";
  $.ajax ({
    url: subreddit_URL,
    async: false,
    dataType:'json',
    timeout: 30000,
    success: function(data) {
      redditJSON = data;
      // console.log( data ); // for testing only
	  $( "#span_for_output_to_user" ).html( "Finished loading." )
    }, 
    error: function(error){console.log("AJAX error:",error); redditJSON = {}; $( "#span_for_output_to_user" ).html( "Error - are you sure that's a subreddit?" )},
    404: function(error){console.log("404 failed AJAX:",error); $( "#span_for_output_to_user" ).html( "404 error - couldn't get subreddit data." )},
  })
  console.log(redditJSON); // for testing only
}

// Function to display the image or video
function (subredditJSON) {
  
}