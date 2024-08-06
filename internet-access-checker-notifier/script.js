navigator.serviceWorker.register('./sw.js');
const askNotificationPermission = () => {
  Notification.requestPermission().then((permission) => {
    console.log(permission);
  })
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
  navigator.serviceWorker.ready.then(function (registration) {
    registration.showNotification(title, {
      body: body,
      icon: `https://cdn.glitch.global/dadb644e-3b98-4740-8e10-b7a927f78326/signal-status.png?v=1722801357616`,
      badge: `https://cdn.glitch.global/dadb644e-3b98-4740-8e10-b7a927f78326/signal-status.png?v=1722801357616`
    });
  });
}

const runTests = async () => {
  let outputElement = document.createElement(`div`);
  outputElement.textContent = 'runTests ran.';
  document.getElementById(`output`).appendChild(outputElement);
  const filesToCheck = [`./1 kilobit.zip`, `./1 kilobyte.bin`, `./10 kilobits.zip`, `./10 kilobytes.bin`, `./100 kilobits.zip`, `./100 kilobytes.bin`, `./1 megabit.zip`, `./1 megabyte.bin`, `./10 megabits.zip`, `./10 megabytes.bin`]
  for (const path of filesToCheck) {
    const response = await fetch(path, { cache: "no-store" })
    console.log(response);
  }
  notify(`Title text`, `body text`);
}

document.addEventListener(`DOMContentLoaded`, () => {
  askNotificationPermission();
  document.getElementById(`button`).addEventListener(`click`, runTests);
});