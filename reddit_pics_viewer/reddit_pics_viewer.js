<!--

// JavaScript / JQuery for the Reddit Pics Viewer web page. HTML file must include JQuery with this line: <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
// Tumbeasts by Matthew Inman are licensed under a Creative Commons Attribution 3.0 Unported License. Based on a work at theoatmeal.com.
// Wikipedia edit 2014 video by VGrias is licensed under the Creative Commons Attribution-Share Alike 3.0 Unported license. http://commons.wikimedia.org/wiki/File:Wikipedia_Edit_2014.webm
// Creative Commons video by Peteforsyth is licensed under the Creative Commons Attribution 3.0 Unported license. http://commons.wikimedia.org/wiki/File:CreativeCommons.webm

// Test lines
// document.getElementById("paragraph_for_video").innerHTML = "Updated by plain JavaScript"; // for testing only
// $( "#paragraph_for_image" ).html( "Updated by JQuery" ); // for testing only

// As soon as the page loads, add the tumblbeast image to the Imgur tag: <img id="image_tag" src="" style="max-width:100%;" />. If the image appears, JQuery is working correctly
$( "#image_tag" ).attr( "src", "oatmeal_tumbeasts/tbservers.png" );

// As soon as the page loads, add the default video to the Gfycat tag: <source id="source_tag_for_video" src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Wikipedia_Edit_2014.webm" type="video/webm" />. If the video appears, JQuery is working correctly.
var default_video = "https://upload.wikimedia.org/wikipedia/commons/4/4d/Wikipedia_Edit_2014.webm"
default_video = "http://fat.gfycat.com/BaggyJollyCaribou.webm"
default_video = "CreativeCommons.webm"
$( "#source_tag_for_video" ).attr( "src", default_video );

//My modification:
jsonUrl = "http://www.reddit.com/r/gifs.json?jsonp=jQuery"
$.ajax({
  url: jsonUrl,
  dataType: 'jsonp',
  success: function(data){console.log("success:",data);},
  error: function(error){console.log("error:",error);},
  404: function(error){console.log("404 failed AJAX:",error);},
  timeout: 5000
})
-->