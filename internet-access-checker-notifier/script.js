navigator.serviceWorker.register('./sw.js');
const askNotificationPermission = () => {
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
      icon: `signal-font-awesome 512x512.png`,
      badge: `signal-font-awesome 512x512.png`
    });
  });
}

const runTests = async () => {
  let shouldNotify = document.getElementById(`notify`).value == `checked`;
  if (shouldNotify) askNotificationPermission();
  let outputElement = document.createElement(`div`);
  outputElement.textContent = 'runTests ran.';
  let outputText = ``;
  document.getElementById(`output`).appendChild(outputElement);
  const filesToCheck = [`1 kilobit.zip`, `1 kilobyte.bin`, `10 kilobits.zip`, `10 kilobytes.bin`, `100 kilobits.zip`, `100 kilobytes.bin`, `1 megabit.zip`, `1 megabyte.bin`, `10 megabits.zip`, `10 megabytes.bin`]
  for (const path of filesToCheck) {
    let outputElement = document.createElement(`div`);
    outputElement.textContent = `Trying ${path.split(`.`, 1)[0]}...`;
    document.getElementById(`output`).appendChild(outputElement);
    const startTime = new Date();
    try {
      const response = await fetch(path, { cache: "no-store" })
      await response.text(); // Necessary so the script waits until the entire response has been received, not just started.
      if (response.ok) {
        const endTime = new Date();
        outputText = `${path.split(`.`, 1)[0]} succeeded in ${(endTime - startTime) / 1000} seconds.`;

      } else {
        outputText = `${path.split(`.`, 1)[0]} failed.`;
      }
    } catch (e) {
      outputText = `${path.split(`.`, 1)[0]} failed.`;
    }
    outputElement.textContent = outputText;
    if (shouldNotify) notify(outputText);
  }
  if (shouldNotify) notify(`Internet access check finished.`, ``);
}

const deleteAllCaches = () => {
  caches.keys().then(function (names) {
    for (let name of names)
      caches.delete(name);
  });
}

document.addEventListener(`DOMContentLoaded`, () => {
  document.getElementById(`button`).addEventListener(`click`, runTests);
  document.getElementById(`clearCache`).addEventListener(`click`, deleteAllCaches);
});