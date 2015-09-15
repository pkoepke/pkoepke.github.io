// Using an indexedDB to store viewed comic IDs. Based on http://blog.vanamco.com/indexeddb-fundamentals-plus-a-indexeddb-example-tutorial/
/* Cross-browser compatibility code */
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.msIndexedDB;
var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
var openCopy = indexedDB && indexedDB.open;

var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

if (IDBTransaction)
{
    IDBTransaction.READ_WRITE = IDBTransaction.READ_WRITE || 'readwrite';
    IDBTransaction.READ_ONLY = IDBTransaction.READ_ONLY || 'readonly';
}

/***
 * Create database snippet
 * */
var request = indexedDB.open('todos');

request.onupgradeneeded = function(e)
{
    // e is an instance of IDBVersionChangeEvent
    var idb = e.target.result;

    if (idb.objectStoreNames.contains('todo'))
    {
        idb.deleteObjectStore('todo');
    }

    var store = idb.createObjectStore('todo', {keyPath: 'text', autoIncrement: true});
    // createIndex operations possible to be pefromed on store.createIndex
    store.createIndex('by_todo', 'todo', {unique: true, multiEntry: false});
};

request.onsuccess = function(e) {    /* add, update, delete, ... */ };
request.onerror = function(e) { /* handle error */ };

/***
 * Remove database snippet
 * */
var dropDatabase = function(name)
{
    var request = indexedDB.deleteDatabase(name);
    request.onsuccess = function() { /* drop succeeded */ };
    request.onerror = function() { /* drop failed */ };
};

/***
  * Creating records
  * */
  var request = indexedDB.open('todos');

  request.onsuccess = function(e)
  {
      var idb = e.target.result;
      var trans = idb.transaction('todo', IDBTransaction.READ_WRITE);
      var store = trans.objectStore('todo');

      // add
      var requestAdd = store.add({comicID: currentComicId, todo: 'Groceries'});

      requestAdd.onsuccess = function(e) {
          // do something
      };

      requestAdd.onfailure = function(e) {
          // failed
      };
  };
/***
  * Retrieving records
  * */
  var request = indexedDB.open('todos');
  request.onsuccess = function(e)
  {
      idb = e.target.result;
      var transaction = idb.transaction('todo', IDBTransaction.READ_ONLY);
      var objectStore = transaction.objectStore('todo');

      objectStore.openCursor().onsuccess = function(event)
      {
          var cursor = event.target.result;
          if (cursor)
          {
              console.log('Cursor data', cursor.value);
              cursor.continue();
          }
          else
          {
              console.log('Entries all displayed.');
          }
      };
  };
