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

const calculateTimeAndRate = (size, startTime, endTime) => { // Return the time elapsed and bps rate.
  let seconds = (endTime - startTime) / 1000;
  let sizeMap = {
    '1 kilobit.zip': 1,
    '1 kilobyte.bin': 8,
    '10 kilobits.zip': 10,
    '10 kilobytes.bin': 80,
    '100 kilobits.zip': 100,
    '100 kilobytes.bin': 800,
    '1 megabit.zip': 1000,
    '1 megabyte.bin': 8000,
    '10 megabits.zip': 10000,
    '10 megabytes.bin': 80000
  }
  let rate = (sizeMap[size] / seconds);
  if (rate > 1000) {
    rate = (rate / 1000).toLocaleString('en-us') + ` mbps`;
  } else {
    rate = rate.toLocaleString('en-us') + ` kbps`;
  }
  return { 'seconds': seconds, 'rate': rate }
}

const runTests = async () => {
  let shouldNotify = document.getElementById(`notify`).checked;
  if (shouldNotify) await askNotificationPermission();
  let outputElement = document.createElement(`div`);
  outputElement.textContent = 'runTests ran.';
  let outputText = ``;
  document.getElementById(`output`).appendChild(outputElement);
  const filesToCheck = [`1 kilobit.zip`, `1 kilobyte.bin`, `10 kilobits.zip`, `10 kilobytes.bin`, `100 kilobits.zip`, `100 kilobytes.bin`, `1 megabit.zip`, `1 megabyte.bin`, `10 megabits.zip`, `10 megabytes.bin`];
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
        const timeAndRate = calculateTimeAndRate(path, startTime, endTime);
        //outputText = `${path.split(`.`, 1)[0]} succeeded in ${timeAndRate['seconds']} seconds for an effective rate of ${timeAndRate['rate']}.`;
        const wrapperSpan = document.createElement(`span`);
        wrapperSpan.classList.add(`flexRow`);
        const firstSpan = document.createElement(`span`);
        firstSpan.textContent = `${path.split(`.`, 1)[0]}`;
        firstSpan.style.width = `18%`;
        const secondSpan = document.createElement(`span`);
        secondSpan.textContent = `succeeded in ${timeAndRate['seconds']} seconds`;
        secondSpan.style.width = `34%`;
        const thirdSpan = document.createElement(`span`);
        thirdSpan.textContent = `for an effective rate of ${timeAndRate['rate']}.`
        thirdSpan.style.width = `47%`;
        thirdSpan.style.textAlign = `right`;
        wrapperSpan.appendChild(firstSpan);
        wrapperSpan.appendChild(secondSpan);
        wrapperSpan.appendChild(thirdSpan);
        document.getElementById(`output`).appendChild(wrapperSpan);
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

document.addEventListener(`DOMContentLoaded`, () => {
  document.getElementById(`button`).addEventListener(`click`, runTests);
});