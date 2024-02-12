import helloWorld from './module.js';

console.log(helloWorld());

addEventListener("DOMContentLoaded", (event) => {
    let elem = document.getElementById('output');
    elem.innerText = 'Output <p>';
});