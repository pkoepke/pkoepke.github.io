// ==UserScript==
// @name        Sort MetaFilter Comments
// @version     11
// @grant       none
// @match       *://*.metafilter.com/*
// @run-at      document-idle
// @description Adds a Sort by Favorites button. Also keeps the anchor tags in the right place, and allows restoring the original sort order.
// @locale      en-us
// @namespace   https://greasyfork.org/users/324881
// ==/UserScript==

/*  At a high level, this script treats the name of each anchor element as an identifier for the comment, as the anchor's name seems to be MetaFilter's ID for the comment.
    By storing arrays with the anchors in original order and sorted-by-favorites order, as well as an object that stores each comment and maps from its ID/anchor name, we can easily loop over the comments in either order.
    I tried moving the comment divs and related nodes instead of wiping them out and starting over, but the delete + add method was substantially faster.
    In theory we could avoid the objects by giving each comment div an ID based on its associated anchor name and use getElementById and getElementsByName to access the divs and anchors, but accessing them via  objects is much faster.
*/
var allAnchorNamesInOriginalOrder = []; // Create empty array to hold anchor names in original order.
var anchorNamesSortedByFavorites = []; // Create empty array to hold anchor names in sorted-by-favorites order.
var allCommentDivsObject = {}; // Create empty object to hold comment Divs addressed by Anchor number.
var allAnchors = {}; // Create empty object to hold anchor elements addressed by Anchor number.
var t1; // For testing only. Use with t1 = performance.now(); and console.log('That took ' + (performance.now() - t1) + ' miliseconds');

function getAllDivsAndAnchors() { // Gathers all data we need and does the sort so the only thing the button has to do is
  t1 = performance.now();
  let allCommentDivs = document.getElementsByClassName('comments'); // Get all divs with className 'comments'
  allCommentDivs = Array.from(allCommentDivs).filter( function(div) { return div.previousSibling.tagName == 'A'; }); // Some "comment" divs are not actually comments. All comments, and only comments, are preceeded by an anchor tag. So this filters down to only real comment divs.
  for (let [i, currentDiv] of allCommentDivs.entries()) { // Loop over the remaining divs to create the original order array, the anchor name-to-div object, and the anchor name-to-anchor object.
    let currentAnchor = currentDiv.previousSibling
    let anchorName = currentAnchor.name;
    allAnchorNamesInOriginalOrder.push(anchorName);
    allCommentDivsObject[anchorName] = currentDiv;
    allAnchors[anchorName] = currentAnchor;
  }

  // Create an array of the anchors sorted by favorites.
  anchorNamesSortedByFavorites = allAnchorNamesInOriginalOrder.slice(); // first duplicate the array since Array.sort mutates the array.
  anchorNamesSortedByFavorites.sort(getFavoritesAndSort);  // Sort the new array.

  console.log('getAllDivsAndAnchors() took ' + (performance.now() - t1) + ' miliseconds');
}

function createWrapperSpan() { // Wrap everything that we will modify in a span. This makes deleting faster because wiping out the innerHTML of a single element is much faster than deleting thousands of elements one-by-one. String replacement is a bit slow on page load but it's the simplest way to wrap elements.
  t1 = performance.now();
  let postsDiv = document.getElementById('posts');
  let postsDivInnerHTML = postsDiv.innerHTML;
  postsDivInnerHTML = postsDivInnerHTML.replace(allAnchors[allAnchorNamesInOriginalOrder[0]].outerHTML, '<span id="tehhundSortMetaFilterCommentsWrapperSpan"><br>' + allAnchors[allAnchorNamesInOriginalOrder[0]].outerHTML)
  let newCommentsDiv = document.getElementById('newcomments');
  postsDivInnerHTML = postsDivInnerHTML.replace(newCommentsDiv.outerHTML, '</span>' + newCommentsDiv.outerHTML)
  postsDiv.innerHTML = postsDivInnerHTML;
  console.log('createWrapperSpan() took ' + (performance.now() - t1) + ' miliseconds');
}

function createWrapperSpanWithAdjacentHTML() { // Wrap everything that we will modify in a span. This makes deleting faster because wiping out the innerHTML of a single element is much faster than deleting thousands of elements one-by-one. String replacement is a bit slow on page load but it's the simplest way to wrap elements.
  t1 = performance.now();
  let postsDiv = document.getElementById('posts');
  let postsDivInnerHTML = postsDiv.innerHTML;
  postsDivInnerHTML = postsDivInnerHTML.replace(allAnchors[allAnchorNamesInOriginalOrder[0]].outerHTML, '<span id="tehhundSortMetaFilterCommentsWrapperSpan"><br>' + allAnchors[allAnchorNamesInOriginalOrder[0]].outerHTML)
  let newCommentsDiv = document.getElementById('newcomments');
  postsDivInnerHTML = postsDivInnerHTML.replace(newCommentsDiv.outerHTML, '</span>' + newCommentsDiv.outerHTML)
  postsDiv.innerHTML = postsDivInnerHTML;
  console.log('createWrapperSpanWithAdjacentHTML() took ' + (performance.now() - t1) + ' miliseconds');
}

function getFavoritesAndSort(a, b) { // from https://greasyfork.org/en/scripts/29857-metafilter-comments-sorter/code
  let aCommment = allCommentDivsObject[a];
  let bCommment = allCommentDivsObject[b];
  let getFavorites = 'a[href*="/favorited"]';
  var a_text = aCommment.querySelector(getFavorites),
    b_text = bCommment.querySelector(getFavorites),
    a_favorites = extractFavorites(a_text),
    b_favorites = extractFavorites(b_text);

  return b_favorites - a_favorites;
}

function extractFavorites(anchor) { // from https://greasyfork.org/en/scripts/29857-metafilter-comments-sorter/code
  if (anchor === null) { return 0; }
  let favorite = anchor.text.split(" ")[0];
  if (!isNaN(favorite)) { return Number(favorite); }
  else { return 0 }
}

function addButtonCss() { // borrowed and slightly modified from https://greasyfork.org/en/scripts/29857-metafilter-comments-sorter/code
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `.sortButton, .restoreButton {
    background-color: #88C2D8;
    color: #FFFFFF;
    display: block;
    float: left;
    font-size: 17px;
    height: 30px; }
    button[disabled] { background-color: #E6E6E6; }
    button {
    border:none;
    background-image:none;
    background-color:transparent;
    box-shadow: none; } `;
  document.querySelector('head').appendChild(style);
}

function addButtonToPage() { // This handles the initial load when there are zero existing buttons, and also handles error states where there is more than 1 button on the page.
  let previousButtonType = 'restoreButton'; // Assume we're adding the Sort button. Handles the inisial load where there's no button.
  let existingButtons = document.getElementsByClassName('sortButton'); // If the first button is already a Sort button, switch to adding a Restore button instead.
  if (existingButtons[0]) { previousButtonType = existingButtons[0].id; }
  for (let currentButton of existingButtons) { currentButton.remove() } // Just in case there's been an error and there is more than 1 button on the page, remove all of them.
  let newButton = document.createElement('button');
  newButton.className = 'sortButton';
  newButton.addEventListener('click', disableButtonAndStartSort);
  if (previousButtonType == 'restoreButton') {
    newButton.innerHTML = 'Sort by favorites';
    newButton.id = 'sortButton';
  } else {
    newButton.innerHTML = 'Restore original order';
    newButton.id = 'restoreButton';
  }
  document.querySelector('#threadside').appendChild(newButton);
}

function disableButtonAndStartSort(triggerEvent) { // First modify the button so it's clear to the user that something is happening.
  //t1 = performance.now();
  triggerEvent.target.disabled = true;
  triggerEvent.target.innerHTML = "Working...";
  window.requestAnimationFrame(function(timestamp) { waitUntilButtonDisabled(triggerEvent) }); // requestAnimationFrame's callback runs before the next frame, so wait 1 frame before doing all the work so the change to the button is visible.
}

function waitUntilButtonDisabled(triggerEvent) {
  window.requestAnimationFrame(function() {
    if (document.getElementsByClassName('sortButton')[0].innerHTML === 'Working...') { // Check whether the button has been updated, and only then run the sort.
      writeToPage(triggerEvent);
    } else {
      waitUntilButtonDisabled(triggerEvent);
    }
  });
}

function writeToPage(triggerEvent) { // Deletes all nodes and re-adds them.
  let currentArray = anchorNamesSortedByFavorites // Start by assuming we're sorting by favorites to avoid null issues.
  if (triggerEvent.target.id == 'restoreButton') { currentArray = allAnchorNamesInOriginalOrder; } // If the clicked button was the Restore Order one, switch to original order array.
  let wrapperSpan = document.getElementById('tehhundSortMetaFilterCommentsWrapperSpan');
  wrapperSpan.style.display = 'inline-block';
  wrapperSpan.style.height = wrapperSpan.offsetHeight + 'px'; // Maintain height during DOM manipulations.
  wrapperSpan.innerHTML = "<br>";  // wipe out the contents of the container span so we can add the nodes back in.
  //loopCurrentArray(currentArray, wrapperSpan);
  //addDivsFrameByFrame(currentArray, wrapperSpan);
  addDivsRecursiveSetTimeout(currentArray, wrapperSpan);
}

function loopCurrentArray(currentArray, wrapperSpan) { // Oddly, making this its own function instead of just looping within writeToPage() makes the whole thing run 8.7% faster in Firefox.
  for (let currentAnchorName of currentArray) {
     addComment(currentAnchorName, wrapperSpan); // Had setTimeout() here, but it didn't keep the page responseive and was 19% slower. Removing setTimeout() also prevents some script warnings on Android.
  }
  addButtonToPage();
  //console.log('That took ' + (performance.now() - t1) + ' miliseconds');
}

function addDivsFrameByFrame(currentArray, wrapperSpan, index = 0) { // Call this function over and over so Divs are added slowly, frame by frame.
  let throwaway = window.requestAnimationFrame(function() {
    addComment(currentArray[index], wrapperSpan);
    if (currentArray[index + 1] == undefined) { // If there are no more Divs, stop sorting, remove the temporary height of the wrapper span, and change the button.
      wrapperSpan.style.height = null; // revert height to default
      wrapperSpan.style.display = null;
      addButtonToPage();
      //console.log('That took ' + (performance.now() - t1) + ' miliseconds');
    } else { return addDivsFrameByFrame(currentArray, wrapperSpan, ++index); } // If there's another Div, keep going every frame.
  });
}

function addDivsRecursiveSetTimeout(currentArray, wrapperSpan, index = 0) { // Call this function over and over so Divs are added slowly, frame by frame.
  setTimeout(function() {
    addComment(currentArray[index], wrapperSpan);
    if (currentArray[index + 1] == undefined) { // If there are no more Divs, stop sorting, remove the temporary height of the wrapper span, and change the button.
      wrapperSpan.style.height = null; // revert height to default
      wrapperSpan.style.display = null;
      addButtonToPage();
      //console.log('That took ' + (performance.now() - t1) + ' miliseconds');
    } else { return addDivsRecursiveSetTimeout(currentArray, wrapperSpan, ++index); } // If there's another Div, keep going every frame.
  }, 0);
}

function addComment(currentAnchorName, wrapperSpan) {
  /* tried several ways to reduce DOM changes and speed this up, but none worked:
       String concatenation followed by a single big innerHTML change, but performance was inconsistent and ranged from 20% worse to an order of magnitude worse.
       Tried DocumentFragment to build the DOM and then replace the entire wrapper span at once, but performance was identical to or a little slower than just adding the nodes directly as below.
  */
  wrapperSpan.appendChild(allAnchors[currentAnchorName]);
  wrapperSpan.appendChild(allCommentDivsObject[currentAnchorName]);
  wrapperSpan.appendChild(document.createElement('br'));
  wrapperSpan.appendChild(document.createElement('br'));
}

getAllDivsAndAnchors();
createWrapperSpan();
addButtonCss();
addButtonToPage();
