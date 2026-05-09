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
      icon: `./material-symbols--signal-cellular-alt.png`,
      badge: `./material-symbols--signal-cellular-alt.png`
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
  //const shouldNotifySuccess = document.getElementById(`notifySuccess`).checked;
  //const shouldNotifyFailure = document.getElementById(`notifyFailure`).checked;
  //if (shouldNotifySuccess || shouldNotifyFailure) await askNotificationPermission();
  let outputText = ``;
  const filesToCheck = [`1 kbit.zip`, `1 kbyte.bin`, `10 kbits.zip`, `10 kbytes.bin`, `100 kbits.zip`, `100 kbytes.bin`, `1 mbit.zip`, `1 mbyte.bin`, `10 mbits.zip`, `10 mbytes.bin`];
  for (let path of filesToCheck) {
    if (document.getElementById(`forceFailure`).checked) { path = `./nonexistentURLfor404`; }
    let outputElement = document.createElement(`div`);
    outputElement.textContent = `Trying ${path.split(`.`, 1)[0]}...`;
    document.getElementById(`output`).appendChild(outputElement);
    const startTime = new Date();
    await doOneTest(path, startTime);
    outputElement.textContent = outputText;
    //if (shouldNotifyFailure) notify(outputText); // Any response except response.ok is a failure.
  }
  const wrapperSpan = document.createElement(`span`);
  wrapperSpan.classList.add(`flexRow`);
  wrapperSpan.textContent += `Tests finished.`;
  document.getElementById(`output`).appendChild(wrapperSpan);
  //if (shouldNotifySuccess || shouldNotifyFailure) notify(`Internet access check finished.`, ``);
}

const doOneTest = async (path, startTime) => {
  let outputText = ``;
  let response = ``;
  try { response = await fetch(`test-files/${path}`, { cache: "no-store" }) }
  catch (e) {
    console.log(`Error: ${e}`)
    handleFailure(path, startTime);
  }
  await response.text(); // Necessary so the script waits until the entire response has been received, not just started.
  if (response.ok) {
    document.getElementById(`output`).appendChild(handleSuccess(path, startTime));
  } else {
    console.log(`path: ${path}, startTime: ${startTime}`)
    console.log(`document.getElementById(\`output\`): ${document.getElementById(`output`)}`)
    document.getElementById(`output`).appendChild(handleFailure(path, startTime));
  }
  return outputText;
}

const handleFailure = (path, startTime) => {
  outputText = `${path.split(`.`, 1)[0]} failed.`;
  if (document.getElementById(`retryFailure`).checked) {
    setTimeout(60000, async () => {
      await doOneTest(path, startTime);;
    });
  }
}

const handleSuccess = (path, startTime) => {
  const endTime = new Date();
  const timeAndRate = calculateTimeAndRate(path, startTime, endTime);
  //outputText = `${path.split(`.`, 1)[0]} succeeded in ${timeAndRate['seconds']} seconds for an effective rate of ${timeAndRate['rate']}.`;
  const wrapperSpan = document.createElement(`span`);
  wrapperSpan.classList.add(`flexRow`);
  const firstSpan = document.createElement(`span`);
  firstSpan.textContent = `${path.split(`.`, 1)[0]}`;
  //firstSpan.style.width = `18%`;
  firstSpan.style.width = `5rem`;
  firstSpan.style.textAlign = `left`;
  const secondSpan = document.createElement(`span`);
  secondSpan.textContent = `${timeAndRate['seconds']} secs`;
  //secondSpan.style.width = `34%`;
  secondSpan.style.width = `5.5rem`;
  secondSpan.style.textAlign = `right`;
  const thirdSpan = document.createElement(`span`);
  thirdSpan.textContent = `@`;
  thirdSpan.style.width = `1.5rem`;
  thirdSpan.style.textAlign = `center`;
  const fourthSpan = document.createElement(`span`);
  fourthSpan.textContent = `${timeAndRate['rate']}`
  //fourthSpan.style.width = `47%`;
  fourthSpan.style.width = `6.5rem`;
  fourthSpan.style.textAlign = `right`;
  wrapperSpan.appendChild(firstSpan);
  wrapperSpan.appendChild(secondSpan);
  wrapperSpan.appendChild(thirdSpan);
  wrapperSpan.appendChild(fourthSpan);
  return wrapperSpan;
}

const loadGoogleFont = (fontName) => {
  // Format the name for the URL (replace spaces with plus signs)
  const formattedName = fontName.replace(/ /g, '+');
  const link = document.createElement('link');

  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css?family=${fontName}&display=swap`;

  document.head.appendChild(link);
}


const changeFont = () => {
  let newFont = document.getElementById(`font`).value;
  loadGoogleFont(newFont)
  document.getElementsByTagName(`main`)[0].style.fontFamily = newFont;
}

const changeFontSize = () => {
  let newFontSize = document.getElementById(`fontSize`).value;
  document.getElementsByTagName(`main`)[0].style.fontSize = newFontSize + `rem`;
}

document.addEventListener(`DOMContentLoaded`, () => {
  document.getElementById(`button`).addEventListener(`click`, runTests);
  try { document.getElementById(`font`).addEventListener(`change`, changeFont); } catch (e) { } // Not using this currently but may bring it back in the future.
  try { document.getElementById(`fontSize`).addEventListener(`change`, changeFontSize); } catch (e) { } // Not using this currently but may bring it back in the future.
});