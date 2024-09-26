// try { navigator.serviceWorker.register('./sw.js'); } catch (e) { console.log(`Error registering Service Worker.`); }

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
    '1 kbit.zip': 1,
    '1 kbyte.bin': 8,
    '10 kbits.zip': 10,
    '10 kbytes.bin': 80,
    '100 kbits.zip': 100,
    '100 kbytes.bin': 800,
    '1 mbit.zip': 1000,
    '1 mbyte.bin': 8000,
    '10 mbits.zip': 10000,
    '10 mbytes.bin': 80000
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
  console.log('runTests() ran.');
  let outputText = ``;
  const filesToCheck = [`1 kbit.zip`, `1 kbyte.bin`, `10 kbits.zip`, `10 kbytes.bin`, `100 kbits.zip`, `100 kbytes.bin`, `1 mbit.zip`, `1 mbyte.bin`, `10 mbits.zip`, `10 mbytes.bin`];
  for (const path of filesToCheck) {
    let outputElement = document.createElement(`div`);
    outputElement.textContent = `Trying ${path.split(`.`, 1)[0]}...`;
    document.getElementById(`output`).appendChild(outputElement);
    const startTime = new Date();
    try {
      const response = await fetch(`test-files/${path}`, { cache: "no-store" })
      await response.text(); // Necessary so the script waits until the entire response has been received, not just started.
      if (response.ok) {
        const endTime = new Date();
        const timeAndRate = calculateTimeAndRate(path, startTime, endTime);
        //outputText = `${path.split(`.`, 1)[0]} succeeded in ${timeAndRate['seconds']} seconds for an effective rate of ${timeAndRate['rate']}.`;
        const wrapperSpan = document.createElement(`span`);
        wrapperSpan.classList.add(`flexRow`);
        const firstSpan = document.createElement(`span`);
        firstSpan.textContent = `${path.split(`.`, 1)[0]}`;
        //firstSpan.style.width = `18%`;
        firstSpan.style.width = `5.5rem`;
        firstSpan.style.textAlign = `left`;
        const secondSpan = document.createElement(`span`);
        secondSpan.textContent = `${timeAndRate['seconds']} secs`;
        //secondSpan.style.width = `34%`;
        secondSpan.style.width = `6rem`;
        secondSpan.style.textAlign = `right`;
        const thirdSpan = document.createElement(`span`);
        thirdSpan.textContent = `@`;
        thirdSpan.style.width = `2rem`;
        thirdSpan.style.textAlign = `center`;
        const fourthSpan = document.createElement(`span`);
        fourthSpan.textContent = `${timeAndRate['rate']}`
        //fourthSpan.style.width = `47%`;
        fourthSpan.style.width = `7rem`;
        fourthSpan.style.textAlign = `right`;
        wrapperSpan.appendChild(firstSpan);
        wrapperSpan.appendChild(secondSpan);
        wrapperSpan.appendChild(thirdSpan);
        wrapperSpan.appendChild(fourthSpan);
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

const changeFont = () => {
  let newFont = document.getElementById(`font`).value;
  document.getElementsByTagName(`main`)[0].style.fontFamily = newFont;
}

const changeFontSize = () => {
  let newFontSize = document.getElementById(`fontSize`).value;
  document.getElementsByTagName(`main`)[0].style.fontSize = newFontSize + `rem`;
}

document.addEventListener(`DOMContentLoaded`, () => {
  document.getElementById(`button`).addEventListener(`click`, runTests);
  document.getElementById(`font`).addEventListener(`change`, changeFont);
  document.getElementById(`fontSize`).addEventListener(`change`, changeFontSize);

});