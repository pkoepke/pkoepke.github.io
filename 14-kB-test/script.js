const calculateTimeAndRate = (size, startTime, endTime) => { // Return the time elapsed and bps rate.
  let seconds = (endTime - startTime) / 1000;
  let sizeMap = {
    '12kB': 12,
    '13kB': 13,
    '14kB': 14,
    '15kB': 15,
    '45kB': 45
  }
  let rate = (sizeMap[size] / seconds);
  if (rate > 1000) {
    rate = (rate / 1000).toLocaleString('en-us') + ` MBps`;
  } else {
    rate = rate.toLocaleString('en-us') + ` kBps`;
  }
  console.log({ 'seconds': seconds, 'rate': rate })
  return { 'seconds': seconds, 'rate': rate }
}

const createOneOutput = (fileSize, seconds, rate) => {
  const outputElement = document.createElement(`div`);
  outputElement.textContent = `${fileSize} succeeded in ${seconds} seconds for an effective rate of ${rate}.`;
  return outputElement;
}

const runTest = async (event) => {
  console.log(event);
  try {
    const startTime = new Date();
    const response = await fetch(`test-files/${event.target.id}.bin`, { cache: "no-store" })
    await response.text(); // Necessary so the script waits until the entire response has been received, not just started.
    if (response.ok) {
      const endTime = new Date();
      const timeAndRate = calculateTimeAndRate(event.target.id, startTime, endTime);
      document.getElementById(`output`).appendChild(createOneOutput(event.target.id, timeAndRate['seconds'], timeAndRate['rate']));
    } else {
      document.getElementById(`output`).appendChild(createOneOutput(event.target.id, `--`, `--`));
    }
  } catch (e) {
    document.getElementById(`output`).appendChild(createOneOutput(event.target.value, `--`, `--`));
  }
}

document.addEventListener(`DOMContentLoaded`, () => {
  for (const element of document.querySelectorAll('input[type="button"]')) {
    console.log(element);
    element.addEventListener(`click`, runTest);
  }
});