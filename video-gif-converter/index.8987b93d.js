// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jX0JV":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "9c17119d8987b93d";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"6rimH":[function(require,module,exports,__globalThis) {
// From the actual documentation
var _ffmpeg = require("@ffmpeg/ffmpeg");
var _util = require("@ffmpeg/util");
ffmpeg = new (0, _ffmpeg.FFmpeg)();
//ffmpeg.on("log", ({ message }) => { console.log(message); }); // If ffmpeg calls its log method, log that to the console.
ffmpeg.on("progress", ({ progress, time })=>{
    document.getElementById('progress').textContent = `${(progress * 100).toFixed(2)} %, time: ${(time / 1000000).toFixed(2)} s`;
}); // Show progress on the page.
const transcode = async ()=>{
    /*  const baseURL = './';
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}ffmpeg-core.wasm`, 'application/wasm')
    });*/ const baseURL = 'https://unpkg.com/@ffmpeg/core/dist/umd';
    //const baseURL = "."
    await ffmpeg.load({
        coreURL: await (0, _util.toBlobURL)(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await (0, _util.toBlobURL)(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
    });
    // const file = await document.getElementById("fileInput").files[0] ? await document.getElementById("fileInput").files[0] : await processFetchedFile(); // With a default file for easy testing.
    const file = await document.getElementById("fileInput").files[0];
    if (!file) return;
    const { name } = file;
    const outputFileType = document.getElementById('outputType').value;
    document.getElementById('output').firstChild.replaceWith(document.createElement('span'));
    await ffmpeg.writeFile(name, await (0, _util.fetchFile)(file));
    document.getElementById('progress').textContent = 'Transcoding started';
    console.log(`${new Date().toLocaleTimeString()} Transcoding started`);
    await ffmpeg.exec([
        '-i',
        name,
        `output.${outputFileType}`
    ]);
    document.getElementById('progress').textContent = 'Transcoding ended';
    console.log(`${new Date().toLocaleTimeString()} Transcoding ended`);
    const data = await ffmpeg.readFile(`output.${outputFileType}`);
    if (outputFileType == 'gif') {
        const imgTag = document.createElement('img');
        imgTag.src = URL.createObjectURL(new Blob([
            data.buffer
        ], {
            type: 'image/gif'
        }));
        imgTag.classList.add('outputImg');
        document.getElementById('output').firstChild.replaceWith(imgTag);
    } else {
        const sourceTag = document.createElement('source');
        sourceTag.src = URL.createObjectURL(new Blob([
            data.buffer
        ], {
            type: `video/${outputFileType}`
        }));
        const videoTag = document.createElement('video');
        videoTag.setAttribute('controls', '');
        videoTag.appendChild(sourceTag);
        videoTag.classList.add('outputVideo');
        document.getElementById('output').firstChild.replaceWith(videoTag);
    }
};
async function createFileFromUrl(url, filename, mimeType) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([
            blob
        ], filename, {
            type: mimeType
        });
    } catch (error) {
        console.error("Error fetching or creating file:", error);
        return null;
    }
}
// For testing only - useful if I want to have a default video so I don't have to select one every time.
async function processFetchedFile() {
    const fileUrl = "./thanks-i-hate-it.mp4";
    const fileName = "thanks-i-hate-it.mp4";
    const fileMimeType = "video/mp4";
    const myFile = await createFileFromUrl(fileUrl, fileName, fileMimeType);
    return myFile;
}
const handleInput = ()=>{
    const file = document.getElementById('fileInput').files[0];
    document.getElementById('output').firstChild.replaceWith(document.createElement('span'));
    if (file.type == 'image/gif') {
        const imgTag = document.createElement('img');
        imgTag.src = URL.createObjectURL(file);
        imgTag.classList.add('inputImg');
        document.getElementById('originalFile').firstChild.replaceWith(imgTag);
    } else {
        const sourceTag = document.createElement('source');
        sourceTag.src = URL.createObjectURL(file);
        const videoTag = document.createElement('video');
        videoTag.setAttribute('controls', '');
        videoTag.appendChild(sourceTag);
        videoTag.classList.add('inputVideo');
        document.getElementById('originalFile').firstChild.replaceWith(videoTag);
    }
};
document.addEventListener('DOMContentLoaded', async ()=>{
    document.getElementById('startTranscode').addEventListener('click', transcode);
    document.getElementById('chooseFile').addEventListener('click', ()=>{
        document.getElementById('fileInput').click();
    });
    document.getElementById('fileInput').addEventListener('change', handleInput);
});

},{"@ffmpeg/ffmpeg":"hi6K2","@ffmpeg/util":"bYM2r"}],"hi6K2":[function(require,module,exports,__globalThis) {
!function(e, t) {
    module.exports = t();
}(self, ()=>(()=>{
        "use strict";
        var e = {
            m: {},
            d: (t, s)=>{
                for(var r in s)e.o(s, r) && !e.o(t, r) && Object.defineProperty(t, r, {
                    enumerable: !0,
                    get: s[r]
                });
            },
            u: (e)=>e + ".ffmpeg.js"
        };
        e.g = function() {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if ("object" == typeof window) return window;
            }
        }(), e.o = (e, t)=>Object.prototype.hasOwnProperty.call(e, t), e.r = (e)=>{
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }, (()=>{
            var t;
            e.g.importScripts && (t = e.g.location + "");
            var s = e.g.document;
            if (!t && s && (s.currentScript && (t = s.currentScript.src), !t)) {
                var r = s.getElementsByTagName("script");
                if (r.length) for(var a = r.length - 1; a > -1 && !t;)t = r[a--].src;
            }
            if (!t) throw new Error("Automatic publicPath is not supported in this browser");
            t = t.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), e.p = t;
        })(), e.b = document.baseURI || self.location.href;
        var t, s = {};
        e.r(s), e.d(s, {
            FFFSType: ()=>n,
            FFmpeg: ()=>i
        }), function(e) {
            e.LOAD = "LOAD", e.EXEC = "EXEC", e.FFPROBE = "FFPROBE", e.WRITE_FILE = "WRITE_FILE", e.READ_FILE = "READ_FILE", e.DELETE_FILE = "DELETE_FILE", e.RENAME = "RENAME", e.CREATE_DIR = "CREATE_DIR", e.LIST_DIR = "LIST_DIR", e.DELETE_DIR = "DELETE_DIR", e.ERROR = "ERROR", e.DOWNLOAD = "DOWNLOAD", e.PROGRESS = "PROGRESS", e.LOG = "LOG", e.MOUNT = "MOUNT", e.UNMOUNT = "UNMOUNT";
        }(t || (t = {}));
        const r = (()=>{
            let e = 0;
            return ()=>e++;
        })(), a = (new Error("unknown message type"), new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first")), o = new Error("called FFmpeg.terminate()");
        new Error("failed to import ffmpeg-core.js");
        class i {
            #e = null;
            #t = {};
            #s = {};
            #r = [];
            #a = [];
            loaded = !1;
            #o = ()=>{
                this.#e && (this.#e.onmessage = ({ data: { id: e, type: s, data: r } })=>{
                    switch(s){
                        case t.LOAD:
                            this.loaded = !0, this.#t[e](r);
                            break;
                        case t.MOUNT:
                        case t.UNMOUNT:
                        case t.EXEC:
                        case t.FFPROBE:
                        case t.WRITE_FILE:
                        case t.READ_FILE:
                        case t.DELETE_FILE:
                        case t.RENAME:
                        case t.CREATE_DIR:
                        case t.LIST_DIR:
                        case t.DELETE_DIR:
                            this.#t[e](r);
                            break;
                        case t.LOG:
                            this.#r.forEach((e)=>e(r));
                            break;
                        case t.PROGRESS:
                            this.#a.forEach((e)=>e(r));
                            break;
                        case t.ERROR:
                            this.#s[e](r);
                    }
                    delete this.#t[e], delete this.#s[e];
                });
            };
            #i = ({ type: e, data: t }, s = [], o)=>this.#e ? new Promise((a, i)=>{
                    const n = r();
                    this.#e && this.#e.postMessage({
                        id: n,
                        type: e,
                        data: t
                    }, s), this.#t[n] = a, this.#s[n] = i, o?.addEventListener("abort", ()=>{
                        i(new DOMException(`Message # ${n} was aborted`, "AbortError"));
                    }, {
                        once: !0
                    });
                }) : Promise.reject(a);
            on(e, t) {
                "log" === e ? this.#r.push(t) : "progress" === e && this.#a.push(t);
            }
            off(e, t) {
                "log" === e ? this.#r = this.#r.filter((e)=>e !== t) : "progress" === e && (this.#a = this.#a.filter((e)=>e !== t));
            }
            load = ({ classWorkerURL: s, ...r } = {}, { signal: a } = {})=>(this.#e || (this.#e = s ? new Worker(new URL(s, "file:///Users/focus/Projects/ffmpeg.wasm/packages/ffmpeg/dist/esm/classes.js"), {
                    type: "module"
                }) : new Worker(new URL(e.p + e.u(814), e.b), {
                    type: void 0
                }), this.#o()), this.#i({
                    type: t.LOAD,
                    data: r
                }, void 0, a));
            exec = (e, s = -1, { signal: r } = {})=>this.#i({
                    type: t.EXEC,
                    data: {
                        args: e,
                        timeout: s
                    }
                }, void 0, r);
            ffprobe = (e, s = -1, { signal: r } = {})=>this.#i({
                    type: t.FFPROBE,
                    data: {
                        args: e,
                        timeout: s
                    }
                }, void 0, r);
            terminate = ()=>{
                const e = Object.keys(this.#s);
                for (const t of e)this.#s[t](o), delete this.#s[t], delete this.#t[t];
                this.#e && (this.#e.terminate(), this.#e = null, this.loaded = !1);
            };
            writeFile = (e, s, { signal: r } = {})=>{
                const a = [];
                return s instanceof Uint8Array && a.push(s.buffer), this.#i({
                    type: t.WRITE_FILE,
                    data: {
                        path: e,
                        data: s
                    }
                }, a, r);
            };
            mount = (e, s, r)=>this.#i({
                    type: t.MOUNT,
                    data: {
                        fsType: e,
                        options: s,
                        mountPoint: r
                    }
                }, []);
            unmount = (e)=>this.#i({
                    type: t.UNMOUNT,
                    data: {
                        mountPoint: e
                    }
                }, []);
            readFile = (e, s = "binary", { signal: r } = {})=>this.#i({
                    type: t.READ_FILE,
                    data: {
                        path: e,
                        encoding: s
                    }
                }, void 0, r);
            deleteFile = (e, { signal: s } = {})=>this.#i({
                    type: t.DELETE_FILE,
                    data: {
                        path: e
                    }
                }, void 0, s);
            rename = (e, s, { signal: r } = {})=>this.#i({
                    type: t.RENAME,
                    data: {
                        oldPath: e,
                        newPath: s
                    }
                }, void 0, r);
            createDir = (e, { signal: s } = {})=>this.#i({
                    type: t.CREATE_DIR,
                    data: {
                        path: e
                    }
                }, void 0, s);
            listDir = (e, { signal: s } = {})=>this.#i({
                    type: t.LIST_DIR,
                    data: {
                        path: e
                    }
                }, void 0, s);
            deleteDir = (e, { signal: s } = {})=>this.#i({
                    type: t.DELETE_DIR,
                    data: {
                        path: e
                    }
                }, void 0, s);
        }
        var n;
        return function(e) {
            e.MEMFS = "MEMFS", e.NODEFS = "NODEFS", e.NODERAWFS = "NODERAWFS", e.IDBFS = "IDBFS", e.WORKERFS = "WORKERFS", e.PROXYFS = "PROXYFS";
        }(n || (n = {})), s;
    })());

},{}],"bYM2r":[function(require,module,exports,__globalThis) {
"use strict";
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toBlobURL = exports.downloadWithProgress = exports.importScript = exports.fetchFile = void 0;
const errors_js_1 = require("32907c8e74497a26");
const const_js_1 = require("d1b99249047ab730");
const readFromBlobOrFile = (blob)=>new Promise((resolve, reject)=>{
        const fileReader = new FileReader();
        fileReader.onload = ()=>{
            const { result } = fileReader;
            if (result instanceof ArrayBuffer) resolve(new Uint8Array(result));
            else resolve(new Uint8Array());
        };
        fileReader.onerror = (event)=>{
            var _a, _b;
            reject(Error(`File could not be read! Code=${((_b = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.code) || -1}`));
        };
        fileReader.readAsArrayBuffer(blob);
    });
/**
 * An util function to fetch data from url string, base64, URL, File or Blob format.
 *
 * Examples:
 * ```ts
 * // URL
 * await fetchFile("http://localhost:3000/video.mp4");
 * // base64
 * await fetchFile("data:<type>;base64,wL2dvYWwgbW9yZ...");
 * // URL
 * await fetchFile(new URL("video.mp4", import.meta.url));
 * // File
 * fileInput.addEventListener('change', (e) => {
 *   await fetchFile(e.target.files[0]);
 * });
 * // Blob
 * const blob = new Blob(...);
 * await fetchFile(blob);
 * ```
 */ const fetchFile = (file)=>__awaiter(void 0, void 0, void 0, function*() {
        let data;
        if (typeof file === "string") {
            /* From base64 format */ if (/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(file)) data = atob(file.split(",")[1]).split("").map((c)=>c.charCodeAt(0));
            else data = yield (yield fetch(file)).arrayBuffer();
        } else if (file instanceof URL) data = yield (yield fetch(file)).arrayBuffer();
        else if (file instanceof File || file instanceof Blob) data = yield readFromBlobOrFile(file);
        else return new Uint8Array();
        return new Uint8Array(data);
    });
exports.fetchFile = fetchFile;
/**
 * importScript dynamically import a script, useful when you
 * want to use different versions of ffmpeg.wasm based on environment.
 *
 * Example:
 *
 * ```ts
 * await importScript("http://localhost:3000/ffmpeg.js");
 * ```
 */ const importScript = (url)=>__awaiter(void 0, void 0, void 0, function*() {
        return new Promise((resolve)=>{
            const script = document.createElement("script");
            const eventHandler = ()=>{
                script.removeEventListener("load", eventHandler);
                resolve();
            };
            script.src = url;
            script.type = "text/javascript";
            script.addEventListener("load", eventHandler);
            document.getElementsByTagName("head")[0].appendChild(script);
        });
    });
exports.importScript = importScript;
/**
 * Download content of a URL with progress.
 *
 * Progress only works when Content-Length is provided by the server.
 *
 */ const downloadWithProgress = (url, cb)=>__awaiter(void 0, void 0, void 0, function*() {
        var _a;
        const resp = yield fetch(url);
        let buf;
        try {
            // Set total to -1 to indicate that there is not Content-Type Header.
            const total = parseInt(resp.headers.get(const_js_1.HeaderContentLength) || "-1");
            const reader = (_a = resp.body) === null || _a === void 0 ? void 0 : _a.getReader();
            if (!reader) throw errors_js_1.ERROR_RESPONSE_BODY_READER;
            const chunks = [];
            let received = 0;
            for(;;){
                const { done, value } = yield reader.read();
                const delta = value ? value.length : 0;
                if (done) {
                    if (total != -1 && total !== received) throw errors_js_1.ERROR_INCOMPLETED_DOWNLOAD;
                    cb && cb({
                        url,
                        total,
                        received,
                        delta,
                        done
                    });
                    break;
                }
                chunks.push(value);
                received += delta;
                cb && cb({
                    url,
                    total,
                    received,
                    delta,
                    done
                });
            }
            const data = new Uint8Array(received);
            let position = 0;
            for (const chunk of chunks){
                data.set(chunk, position);
                position += chunk.length;
            }
            buf = data.buffer;
        } catch (e) {
            console.log(`failed to send download progress event: `, e);
            // Fetch arrayBuffer directly when it is not possible to get progress.
            buf = yield resp.arrayBuffer();
            cb && cb({
                url,
                total: buf.byteLength,
                received: buf.byteLength,
                delta: 0,
                done: true
            });
        }
        return buf;
    });
exports.downloadWithProgress = downloadWithProgress;
/**
 * toBlobURL fetches data from an URL and return a blob URL.
 *
 * Example:
 *
 * ```ts
 * await toBlobURL("http://localhost:3000/ffmpeg.js", "text/javascript");
 * ```
 */ const toBlobURL = (url, mimeType, progress = false, cb)=>__awaiter(void 0, void 0, void 0, function*() {
        const buf = progress ? yield (0, exports.downloadWithProgress)(url, cb) : yield (yield fetch(url)).arrayBuffer();
        const blob = new Blob([
            buf
        ], {
            type: mimeType
        });
        return URL.createObjectURL(blob);
    });
exports.toBlobURL = toBlobURL;

},{"32907c8e74497a26":"2CjXZ","d1b99249047ab730":"5sv4p"}],"2CjXZ":[function(require,module,exports,__globalThis) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ERROR_INCOMPLETED_DOWNLOAD = exports.ERROR_RESPONSE_BODY_READER = void 0;
exports.ERROR_RESPONSE_BODY_READER = new Error("failed to get response body reader");
exports.ERROR_INCOMPLETED_DOWNLOAD = new Error("failed to complete download");

},{}],"5sv4p":[function(require,module,exports,__globalThis) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeaderContentLength = void 0;
exports.HeaderContentLength = "Content-Length";

},{}]},["jX0JV","6rimH"], "6rimH", "parcelRequire94c2")

//# sourceMappingURL=index.8987b93d.js.map
