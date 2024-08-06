navigator.serviceWorker.register('sw.js');
const askNotificationPermission = () => {
  console.log(Notification.permission)
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
    return;
  } else if (Notification.permission === 'denied') {
    console.log(`Notification permission already denied.`)
    return;
  } else if (Notification.permission === 'granted') {
    console.log(`Notification permission already granted.`)
    return;
  } else {
    Notification.requestPermission().then((permission) => {
      console.log(permission);
    })
  }
}

const notify = (title, body) => {
  navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(title, { 
          body: body, 
          icon: `https://cdn.glitch.global/dadb644e-3b98-4740-8e10-b7a927f78326/signal-status.png?v=1722801357616`,
          badge: `https://cdn.glitch.global/dadb644e-3b98-4740-8e10-b7a927f78326/signal-status.png?v=1722801357616`
        });
      });
}

const runTests = () => {
  let outputElement = document.createElement(`div`);
  outputElement.textContent = 'runTests ran.';
  document.getElementById(`output`).appendChild(outputElement);
  notify(`Title text`, `body text`);
  //const notification = new Notification("Internet Connectivity Test", { body: `test notification`, icon: `https://cdn.glitch.global/dadb644e-3b98-4740-8e10-b7a927f78326/signal-status.png?v=1722801357616` });
  /*Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Notification with ServiceWorker');
      });
    }
  });*/
}

document.addEventListener(`DOMContentLoaded`,() => {
  askNotificationPermission();
  document.getElementById(`button`).addEventListener(`click`,runTests);
});