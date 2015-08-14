var currentComicId = 0;

document.addEventListener('DOMContentLoaded', function() {
  currentComicId = parseInt( GetQueryStringParams('id') );
  document.getElementById("comic_id").innerHTML = currentComicId;
  if(isNaN(currentComicId)) {
    currentComicId = 0;
    next(currentComicId);
  }
  document.getElementById("content").innerHTML = "<img style=\x22width: 100%; max-width: 800px\x22 src=" + comic_urls[currentComicId] + ">";
}, false);

function next() {
  document.location = "./index.html" + "?id=" + (currentComicId + 1);
}

function back() {
  document.location = "./index.html" + "?id=" + (currentComicId - 1);
}

function GetQueryStringParams(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

// Using an indexedDB to store viewed comic IDs. Based on http://blog.teamtreehouse.com/create-your-own-to-do-app-with-html5-and-indexeddb
// Code is stored in ./comic_ids_database.js
window.onload = function() {
  // app code goes here
  /* console.log("window.onload ran");
  console.log(comicIdsDb);
  comicIdsDb().open(loadComicsIdsFromDb);
  console.log(comicIdsDb.fetchComicIds;
  comicIdsDb().fetchComicIds(function(x) { console.log(x)});
  // currentComicId*/
};

function loadComicsIdsFromDb() {
  console.log("loadComicsIdsFromDb ran");
}

function storeCurrentComicIdInIndexeddb () {

}
