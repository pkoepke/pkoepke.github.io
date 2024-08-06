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
      icon: `https://cdn.glitch.global/dadb644e-3b98-4740-8e10-b7a927f78326/signal-status.png?v=1722801357616`,
      badge: `https://cdn.glitch.global/dadb644e-3b98-4740-8e10-b7a927f78326/signal-status.png?v=1722801357616`
    });
  });
}

const runTests = async () => {
  askNotificationPermission();
  let outputElement = document.createElement(`div`);
  outputElement.textContent = 'runTests ran.';
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
        outputElement.textContent = `${path.split(`.`, 1)[0]} succeeded in ${(endTime - startTime) / 1000} seconds.`;
      } else {
        outputElement.textContent = `${path.split(`.`, 1)[0]} failed.`;
      }
    } catch (e) {
      outputElement.textContent = `${path.split(`.`, 1)[0]} failed.`;
    }
  }
  notify(`Internet access check finished.`, ``);
}

const deleteAllCaches = () => {
  caches.keys().then(function (names) {
    for (let name of names)
      caches.delete(name);
  });
}

document.addEventListener(`DOMContentLoaded`, () => {
  document.getElementById(`button`).addEventListener(`click`, runTests);
});