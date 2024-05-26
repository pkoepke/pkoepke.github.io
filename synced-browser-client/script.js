const getMostRecentURL = () => {
  fetch("https://url-server.glitch.me/", {
    method: 'get',
  }).then(
    (response) => { return response.json() }
  ).then(
    (responseJson) => {
      console.log(responseJson);
      console.log(responseJson[0].url);
      document.getElementById("urlInput").value = responseJson[0].url;
    }
  );
}

const navigate = () => {
  setKey();
  window.location.assign(document.getElementById("urlInput").value);
}

const postUrl = async (response) => {
  setKey();
  let postBody = {
    "url": document.getElementById("urlInput").value,
    "key": localStorage.getItem("key"),
  }
  await fetch("https://url-server.glitch.me/storeurl", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postBody),
  }).then(
    (response) => {
      console.log("Got a response.")
      console.log(response)
    }
  )
}

const backgroundSyncPostUrl = () => { // TODO implement background sync in case initital POST doesn't work.

}

const setKey = () => {
  let key = document.getElementById("keyInput").value;
  if (key) {
    localStorage.setItem("key", key);
  }
}

// When the page is launched, try to grab the most recent URL from the server, and if it's found navigate there automatically.
// Must have the secret key stored for this to work.
const navigateAtLaunch = () => {
  // Get most recent URL
   console.log(getMostRecentURL()[0]);
  // If successful, navigate there.
}

const onDOMContentLoaded = () => { // Set listeners, get stored key, anything else that needs to wait for the page to load.
  navigateAtLaunch();
  document.getElementById("getMostRecentURL").addEventListener("click", getMostRecentURL);
  document.getElementById("navigate").addEventListener("click", navigate);
  document.getElementById("postUrl").addEventListener("click", postUrl);
}

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
