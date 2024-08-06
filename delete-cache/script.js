const deleteAllCaches = () => {
  caches.keys().then(function (names) {
    for (let name of names)
      caches.delete(name);
  });
}

document.addEventListener(`DOMContentLoaded`, () => {
  document.getElementById(`clearCache`).addEventListener(`click`, deleteAllCaches);
});