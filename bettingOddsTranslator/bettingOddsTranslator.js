function calculateMoneyline() {
  try {
    let favoredTeamName = document.getElementById('favoredTeamName').value;
    let odds = parseFloat(document.getElementById('favoredTeamOdds').value);
    let impliedProbability = (odds / (odds + 100) * 100).toFixed(2);
    if (isNaN(impliedProbability)) {
      document.getElementById('moneylineOutput').innerHTML = '';
    } else {
      document.getElementById('moneylineOutput').innerHTML = impliedProbability + '% chance of ' + favoredTeamName + ' winning.';
    }
  } catch (e) {
    document.getElementById('moneylineOutput').innerHTML = '';
  }
}