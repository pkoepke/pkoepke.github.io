// Why is this .js file an unnecessarily long mess of comments, testing code, and generally-too-long code? Because it's going to get minified before it goes into production. Leaving my comments, ramblings, and random test cases makes it easier to make changes later.

/* Test pages:
http://gfycat.com/BaggyJollyCaribou
http://imgur.com/gallery/I3cBLuV
*/

// JavaScript / JQuery for the Reddit Pics Viewer web page. HTML file must include JQuery with this line: <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
// Tumbeasts by Matthew Inman are licensed under a Creative Commons Attribution 3.0 Unported License. Based on a work at theoatmeal.com.
// Wikipedia edit 2014 video by VGrias is licensed under the Creative Commons Attribution-Share Alike 3.0 Unported license. http://commons.wikimedia.org/wiki/File:Wikipedia_Edit_2014.webm
// Triple conj.ogg by Tos is licensed under the Creative Commons Attribution-Share Alike 3.0 Unported license. http://commons.wikimedia.org/wiki/File:Triple_conj.ogg

/* Flow: 
 * Set up the page with default images and/or hide image and video elements until they're needed. See function initial_set_up()
 * When the user enters a subreddit and clicks the Load Subreddit button, grab the subreddit name and do an async $.ajax() call to grab the JSON from Reddit. See function load_subreddit(), which calls function grab_JSON( subreddit_to_load ).
 * Once the JSON is successfully gotten, immediately parse all of the URLs in data.data.children. Those from imgur.com or gfycat.com get put in an array that will be used to cycle through the images.
 * When the array is ready, 
 * 
 * 
 * 
 * 
*/

// Test lines
// document.getElementById("paragraph_for_video").innerHTML = "Updated by plain JavaScript"; // for testing only
// $( "#paragraph_for_image" ).html( "Updated by JQuery" ); // for testing only

// Function to add defaults to the page and do any other needed setup. Runs immediately 
function initial_set_up() {
  // As soon as the page loads, add the tumblbeast image to the Imgur tag: <img id="image_tag" src="" style="max-width:100%;" />. If the image appears, JQuery is working correctly
  $( "#image_tag" ).attr( "src", "oatmeal_tumbeasts/tbservers.png" );
  
  // As soon as the page loads, add the default video to the Gfycat tag: <source id="source_tag_for_video" src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Wikipedia_Edit_2014.webm" type="video/webm" />. If the video appears, JQuery is working correctly.
  var default_video = "https://upload.wikimedia.org/wikipedia/commons/4/4d/Wikipedia_Edit_2014.webm";
  default_video = "http://fat.gfycat.com/BaggyJollyCaribou.webm";
  default_video = "Triple_conj_VP8_Vorbis.webm";
  // $( "#source_tag_for_video" ).attr( "src", default_video );
  $( "#responsive_div_for_video" ).html('<video id="video_tag" autoplay loop controls muted="muted" class="embed-responsive-item" > <source id="source_tag_for_video" src="Triple_conj_VP8_Vorbis.webm" type="video/webm" /></video>');
}

// Run initial_set_up() right away.
initial_set_up()

// When the Load Subreddit button is clicked, grab the JSON from that subreddit.
function load_subreddit() {
	var subreddit_to_load = $( "#subreddit_input" ).val();
	// console.log( subreddit_to_load ); // for testing only
	$( "#span_for_output_to_user" ).html( "Loading..." )
	grab_JSON( subreddit_to_load );
}
// Function to grab JSON once the subreddit has been chosen. Modified from another example from Stack Overflow: http://stackoverflow.com/questions/1739800/variables-set-during-getjson-function-only-accessible-within-function
var redditJSON = {}
function grab_JSON( subreddit_to_load ) {
  subreddit_URL = "http://www.reddit.com/r/" + subreddit_to_load + ".json";
  $.ajax ({
    url: subreddit_URL,
    //async: false,
    dataType:'json',
    timeout: 30000,
    success: function(data) {
      redditJSON = data;
      // console.log( data ); // for testing only
      $( "#span_for_output_to_user" ).html( "Finished loading." )
      parse_URLs()
    }, 
    error: function(error){console.log("AJAX error:",error); redditJSON = {}; $( "#span_for_output_to_user" ).html( "Error - are you sure that's a subreddit?" )},
    404: function(error){console.log("404 failed AJAX:",error); $( "#span_for_output_to_user" ).html( "404 error - couldn't get subreddit data." )},
  })
  // console.log( redditJSON ); // for testing only; doesn't work with async set to true.
}

// Just for testing whether the JSON is available after doing an async $.ajax call. Turns out it is available - once the async call returns, it saves to var redditJSON. The example I saw in Stack Overflow insisted that you needed async: false, but that was probably for some other reason. Saving to a variable works fine.
function log_redditJSON_to_console() {
  console.log( redditJSON );
}

// Function to parse all of the URLs and store the ones 
var URLarray = []
function parse_URLs() { // console.log( redditJSON ); // for testing only
  $.each(redditJSON.data.children,
    // function (i, post) { $("#append_individual_posts").append( '<br>' + post.data.title ); $("#append_individual_posts").append( '<br>' + post.data.url ); $("#append_individual_posts").append( '<br>' + post.data.domain ); $("#append_individual_posts").append( '<hr>' ); } // for testing only
    function (i, post) {
      if ( ( post.data.domain.search( "imgur" ) != -1) || ( post.data.domain.search( "gfycat" ) != -1 )) {
        // console.log ( post.data.url + " " + post.data.domain.search( "imgur" ) + " " + post.data.domain.search( "gfycat" ) ) // for testing only
		URLarray[URLarray.length] = post.data.url
      }
      // console.log ( URLarray ); // for testing only
    }
  )
}

// Function to display the image or video
function display_content () {
  console.log( URLarray );
}


// --------------------------------------------------------------------------------------------------

// Everything below is old example code

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