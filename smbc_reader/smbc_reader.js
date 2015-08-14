console.log(comic_urls);
var currentComicId = 0;

document.addEventListener('DOMContentLoaded', function() {
  currentComicId = parseInt( GetQueryStringParams('id') );
  document.getElementById("comic_id").innerHTML = currentComicId;
  console.log("currentComicId: " + currentComicId);
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
var comicIdsDb = (function() {
  var comicDb = {}; // module to store all of the database methods.
  var datastore = null; // stores a reference to the database.

  // Methods for interacting with the database.
  /**
  * Open a connection to the datastore.
  */
  comicDb.open = function(callback) {
    // Database version. Might need to version the database if I add new object stores or change the key for an object store.
    var version = 1;
    // Open a connection to the datastore.
    var request = indexedDB.open('comicIdsDb', version);
    // Handle datastore upgrades. If 'comicIds' does not exist or needs to be upgraded this is triggered.
    request.onupgradeneeded = function(e) {
      var db = e.target.result;
      e.target.transaction.onerror = tDB.onerror;
      // Delete the old datastore.
      if (db.objectStoreNames.contains('comicIds')) {
        db.deleteObjectStore('comicIds');
      }
      // Create a new datastore.
      var store = db.createObjectStore('comicIds', {
        keyPath: 'timestamp'
      });
    };
    // Handle successful datastore access.
    request.onsuccess = function(e) {
      // Get a reference to the DB.
      datastore = e.target.result;
      // Execute the callback.
      callback();
    };

    // Handle errors when opening the datastore.
    request.onerror = tDB.onerror;
  };

  /**
  * Fetch all of the comicIds items in the datastore.
  */
  tDB.fetchTodos = function(callback) {
    var db = datastore;
    var transaction = db.transaction(['comicIds'], 'readwrite');
    var objStore = transaction.objectStore('comicIds');

    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = objStore.openCursor(keyRange);

    var todos = [];

    transaction.oncomplete = function(e) {
      // Execute the callback function.
      callback(todos);
    };

    cursorRequest.onsuccess = function(e) {
      var result = e.target.result;

      if (!!result == false) {
        return;
      }

      todos.push(result.value);

      result.continue();
    };

    cursorRequest.onerror = tDB.onerror;
  };

  /**
  * Add a comicId to the dtabase.
  */
  tDB.addId = function(comicId, callback) {
    // Get a reference to the db.
    var db = datastore;

    // Initiate a new transaction.
    var transaction = db.transaction(['comicIds'], 'readwrite');

    // Get the datastore.
    var objStore = transaction.objectStore('comicIds');

    // Create a timestamp for the todo item.
    var timestamp = new Date().getTime();

    // Create an object for the todo item.
    var todo = {
      'comicId': comicId,
      'timestamp': timestamp
    };

    // Create the datastore request.
    var request = objStore.put(todo);

    // Handle a successful datastore put.
    request.onsuccess = function(e) {
      // Execute the callback function.
      callback(todo);
    };

    // Handle errors.
    request.onerror = tDB.onerror;
  };

  // Export the comicDB object.
  return comicDb;
});

window.onload = function() {
  // app code goes here
};

function storeCurrentComicIdInIndexeddb () {

}
