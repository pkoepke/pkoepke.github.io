function calculate() {
  const desiredWeight = parseInt(document.getElementById('desiredWeight').value);
  const barWeight = parseInt(document.getElementById('barWeight').value);
  const fifteensYesNo = document.getElementById('fifteensYesNo').checked;

  if (isNaN(desiredWeight)) {
    document.getElementById('output').innerHTML = "";
  } else if (desiredWeight < barWeight) {
    document.getElementById('output').innerHTML = "";
  } else {
    let remainingWeight = desiredWeight - barWeight;
    const a45s = parseInt(remainingWeight / 90) * 2;
    remainingWeight = remainingWeight - (a45s * 45);
    const a35s = parseInt(remainingWeight / 70) * 2;
    remainingWeight = remainingWeight - (a35s * 35);
    const a25s = parseInt(remainingWeight / 50) * 2;
    remainingWeight = remainingWeight - (a25s * 25);
    let a15s = 0
    if (fifteensYesNo) {
      a15s = parseInt(remainingWeight / 30) * 2;
      remainingWeight = remainingWeight - (a15s * 15);
    }
    const a10s = parseInt(remainingWeight / 20) * 2;
    remainingWeight = remainingWeight - (a10s * 10);
    const a5s = parseInt(remainingWeight / 10) * 2;
    remainingWeight = remainingWeight - (a5s * 5);
    const a2halfs = parseInt(remainingWeight / 5) * 2;
    remainingWeight = remainingWeight - (a2halfs * 2.5)

    let output = barWeight + 'lbs bar<br>'
    if (a45s) output += a45s + ' 45s, ' + a45s/2 + ' per side<br>'
    if (a35s) output += a35s + ' 35s, ' + a35s/2 + ' per side<br>'
    if (a25s) output += a25s + ' 25s, ' + a25s/2 + ' per side<br>'
    if (a15s) output += a15s + ' 15s, ' + a15s/2 + ' per side<br>'
    if (a10s) output += a10s + ' 10s, ' + a10s/2 + ' per side<br>'
    if (a5s) output += a5s + ' 5s, ' + a5s/2 + ' per side<br>'
    if (a2halfs) output += a2halfs + ' 2.5s, ' + a2halfs + ' per side'
    document.getElementById('output').innerHTML = output;
  }
}
