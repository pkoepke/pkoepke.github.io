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
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _ffmpeg = require("@ffmpeg/ffmpeg");
var _util = require("@ffmpeg/util");
var _mediainfoJs = require("mediainfo.js");
var _mediainfoJsDefault = parcelHelpers.interopDefault(_mediainfoJs);
ffmpeg = new (0, _ffmpeg.FFmpeg)();
//ffmpeg.on("log", ({ message }) => { console.log(message); }); // If ffmpeg calls its log method, log that to the console.
ffmpeg.on("log", getVideoFps); // ffmpeg.wasm doesn't provide a good way to get FPS, so we have to parse its logs for that info.
ffmpeg.on("progress", ({ progress, time })=>{
    if (progress > 1) return;
     // Prevent strange flash of several million percent progress. Progress can't be more than 100% anyway.
    document.getElementById('progress').textContent = `${(progress * 100).toFixed(2)} %, time: ${(time / 1000000).toFixed(2)}s`;
}); // Show progress on the page.
let mediainfo = '';
(async ()=>{
    try {
        const baseURL = './umd/';
        await ffmpeg.load({
            coreURL: await (0, _util.toBlobURL)(`${baseURL}ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await (0, _util.toBlobURL)(`${baseURL}ffmpeg-core.wasm`, 'application/wasm')
        });
        console.log(`ffmpeg: ${ffmpeg}`);
        //const mediainfo = await mediaInfoFactory();
        mediainfo = await (0, _mediainfoJsDefault.default)({
            locateFile: function(path, scriptDirectory) {
                // Customize the path here.
                return "./MediaInfoModule.wasm"; // Replace with your actual path.
            }
        });
    } catch (e) {
        console.log(`Error loading ffmpeg: ${e}`);
    /*const baseURL = 'https://unpkg.com/@ffmpeg/core/dist/umd'
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    mediainfo = await mediaInfoFactory(({
      locateFile: function (path, scriptDirectory) {
        // Customize the path here.
        return "./MediaInfoModule.wasm"; // Replace with your actual path.
      }
    }));*/ }
})();
const transcode = async ()=>{
    const file = await document.getElementById("fileInput").files[0] ? await document.getElementById("fileInput").files[0] : await processFetchedFile(); // With a default file for easy testing.
    //const file = await document.getElementById("fileInput").files[0];
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
        '-pix_fmt',
        'yuv420p',
        `output.${outputFileType}`
    ]); // Adding -pix_fmt yuv420p so Firefox can play the video.
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
        imgTag.id = 'outputImg';
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
        videoTag.id = 'outputVideo';
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
    //const fileUrl = "./thanks-i-hate-it.mp4";
    const fileUrl = "./lindsay-ellis-thanks-i-hate-it-reencoded.mp4";
    const fileName = "thanks-i-hate-it.mp4";
    const fileMimeType = "video/mp4";
    const myFile = await createFileFromUrl(fileUrl, fileName, fileMimeType);
    handleInput(new Event('noFileProvided'), myFile);
    return myFile;
}
const handleInput = (event, file)=>{
    if (!file) file = document.getElementById('fileInput').files[0];
    document.getElementById('output').firstChild.replaceWith(document.createElement('span'));
    //if (file.type == 'image/gif') {
    if (getFileType(file) == 'image') {
        const imgTag = document.createElement('img');
        imgTag.src = URL.createObjectURL(file);
        imgTag.id = 'inputImg';
        imgTag.classList.add('centered');
        imgTag.classList.add('centereText');
        document.getElementById('originalFile').firstChild.replaceWith(imgTag);
    } else {
        const sourceTag = document.createElement('source');
        sourceTag.src = URL.createObjectURL(file);
        const videoTag = document.createElement('video');
        videoTag.setAttribute('controls', '');
        videoTag.appendChild(sourceTag);
        videoTag.id = 'inputVideo';
        videoTag.classList.add('centered');
        videoTag.classList.add('centereText');
        document.getElementById('originalFile').firstChild.replaceWith(videoTag);
        videoTag.addEventListener('loadedmetadata', getInputDetails);
    }
};
const getInputDetails = async (e)=>{
    const videoTag = e.target;
    document.getElementById('inputLength').textContent = `${videoTag.duration}s`;
    document.getElementById('inputResolution').textContent = `${videoTag.videoHeight} x ${videoTag.videoWidth}`;
};
async function getVideoFps(message) {
    if (message.message.includes("fps,")) {
        let fps = message.message.split(',');
        fps = fps.filter((str)=>{
            return str.includes('fps');
        });
        console.log(fps);
        document.getElementById('inputFps').textContent = `${fps}`;
    }
}
function getFileType(file) {
    if (!file) return null; // Or throw an error, depending on your needs
    const type = file.type;
    if (!type) {
        // If MIME type is unavailable, try to infer from the file extension.
        const fileName = file.name;
        if (!fileName) return null;
        const extension = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2); // Get the extension
        if (!extension) return null;
        const imageExtensions = [
            'jpg',
            'jpeg',
            'png',
            'gif',
            'bmp',
            'webp',
            'svg',
            'tiff',
            'tif'
        ];
        const videoExtensions = [
            'mp4',
            'webm',
            'ogg',
            'avi',
            'mov',
            'mkv'
        ];
        if (imageExtensions.includes(extension.toLowerCase())) return 'image';
        else if (videoExtensions.includes(extension.toLowerCase())) return 'video';
        else return 'unknown';
    }
    if (type.startsWith('image/')) return 'image';
    else if (type.startsWith('video/')) return 'video';
    else return 'unknown';
}
document.addEventListener('DOMContentLoaded', async ()=>{
    document.getElementById('startTranscode').addEventListener('click', transcode);
    document.getElementById('chooseFile').addEventListener('click', ()=>{
        document.getElementById('fileInput').click();
    });
    document.getElementById('fileInput').addEventListener('change', (e)=>{
        handleInput(e);
    });
});

},{"@ffmpeg/ffmpeg":"hi6K2","@ffmpeg/util":"bYM2r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","mediainfo.js":"9ypmJ"}],"hi6K2":[function(require,module,exports,__globalThis) {
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

},{}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"9ypmJ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>m);
parcelHelpers.export(exports, "isTrackType", ()=>h);
parcelHelpers.export(exports, "mediaInfoFactory", ()=>m);
function e(e, t, r) {
    return (t = function(e) {
        var t = function(e, t) {
            if ("object" != typeof e || !e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
                var n = r.call(e, t || "default");
                if ("object" != typeof n) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === t ? String : Number)(e);
        }(e, "string");
        return "symbol" == typeof t ? t : t + "";
    }(t)) in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}
function t(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t && (n = n.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), r.push.apply(r, n);
    }
    return r;
}
function r(r) {
    for(var n = 1; n < arguments.length; n++){
        var a = null != arguments[n] ? arguments[n] : {};
        n % 2 ? t(Object(a), !0).forEach(function(t) {
            e(r, t, a[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(a)) : t(Object(a)).forEach(function(e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(a, e));
        });
    }
    return r;
}
function n(e) {
    return function(e) {
        return null !== e && "object" == typeof e && Object.prototype.hasOwnProperty.call(e, "message");
    }(e) ? e : new Error("string" == typeof e ? e : "Unknown error");
}
const a = [
    "Active_Height",
    "Active_Width",
    "AudioCount",
    "Audio_Channels_Total",
    "BitDepth_Detected",
    "BitDepth",
    "BitDepth_Stored",
    "Channels",
    "Channels_Original",
    "Chapters_Pos_Begin",
    "Chapters_Pos_End",
    "Comic_Position_Total",
    "Count",
    "DataSize",
    "ElementCount",
    "EPG_Positions_Begin",
    "EPG_Positions_End",
    "FirstPacketOrder",
    "FooterSize",
    "Format_Settings_GMC",
    "Format_Settings_RefFrames",
    "Format_Settings_SliceCount",
    "FrameCount",
    "FrameRate_Den",
    "FrameRate_Num",
    "GeneralCount",
    "HeaderSize",
    "Height_CleanAperture",
    "Height",
    "Height_Offset",
    "Height_Original",
    "ImageCount",
    "Lines_MaxCharacterCount",
    "Lines_MaxCountPerEvent",
    "Matrix_Channels",
    "MenuCount",
    "OtherCount",
    "Part_Position",
    "Part_Position_Total",
    "Played_Count",
    "Reel_Position",
    "Reel_Position_Total",
    "Resolution",
    "Sampled_Height",
    "Sampled_Width",
    "SamplingCount",
    "Season_Position",
    "Season_Position_Total",
    "Source_FrameCount",
    "Source_SamplingCount",
    "Source_StreamSize_Encoded",
    "Source_StreamSize",
    "Status",
    "Stored_Height",
    "Stored_Width",
    "StreamCount",
    "StreamKindID",
    "StreamKindPos",
    "StreamSize_Demuxed",
    "StreamSize_Encoded",
    "StreamSize",
    "TextCount",
    "Track_Position",
    "Track_Position_Total",
    "Video0_Delay",
    "VideoCount",
    "Width_CleanAperture",
    "Width",
    "Width_Offset",
    "Width_Original"
], i = [
    "Active_DisplayAspectRatio",
    "BitRate_Encoded",
    "BitRate_Maximum",
    "BitRate_Minimum",
    "BitRate",
    "BitRate_Nominal",
    "Bits-Pixel_Frame",
    "BitsPixel_Frame",
    "Compression_Ratio",
    "Delay",
    "Delay_Original",
    "DisplayAspectRatio_CleanAperture",
    "DisplayAspectRatio",
    "DisplayAspectRatio_Original",
    "Duration_End_Command",
    "Duration_End",
    "Duration_FirstFrame",
    "Duration_LastFrame",
    "Duration",
    "Duration_Start2End",
    "Duration_Start_Command",
    "Duration_Start",
    "Events_MinDuration",
    "FrameRate_Maximum",
    "FrameRate_Minimum",
    "FrameRate",
    "FrameRate_Nominal",
    "FrameRate_Original_Den",
    "FrameRate_Original",
    "FrameRate_Original_Num",
    "FrameRate_Real",
    "Interleave_Duration",
    "Interleave_Preload",
    "Interleave_VideoFrames",
    "OverallBitRate_Maximum",
    "OverallBitRate_Minimum",
    "OverallBitRate",
    "OverallBitRate_Nominal",
    "PixelAspectRatio_CleanAperture",
    "PixelAspectRatio",
    "PixelAspectRatio_Original",
    "SamplesPerFrame",
    "SamplingRate",
    "Source_Duration_FirstFrame",
    "Source_Duration_LastFrame",
    "Source_Duration",
    "TimeStamp_FirstFrame",
    "Video_Delay"
], o = 2 ** 32, s = {
    coverData: !1,
    chunkSize: 262144,
    format: "object",
    full: !1
};
class u {
    constructor(e, t){
        this.mediainfoModule = e, this.options = t, this.mediainfoModuleInstance = new e.MediaInfo("object" === t.format ? "JSON" : t.format, t.coverData, t.full);
    }
    analyzeData(e, t, r) {
        if (void 0 === r) return new Promise((r, a)=>{
            this.analyzeData(e, t, (e, t)=>{
                t || !e ? a(n(t)) : r(e);
            });
        });
        const a = ()=>{
            this.openBufferFinalize();
            const e = this.inform();
            "object" === this.options.format ? r(this.parseResultJson(e)) : r(e);
        };
        let i = 0;
        const o = (e)=>{
            const o = (e)=>{
                u(e) ? s() : a();
            }, s = ()=>{
                let a;
                try {
                    const r = Math.min(this.options.chunkSize, e - i);
                    a = t(r, i);
                } catch (e) {
                    return void r("", n(e));
                }
                a instanceof Promise ? a.then(o).catch((e)=>{
                    r("", n(e));
                }) : o(a);
            }, u = (t)=>{
                if (0 === t.length || this.openBufferContinue(t, t.length)) return !1;
                const r = this.openBufferContinueGotoGet();
                return -1 === r ? i += t.length : (i = r, this.openBufferInit(e, r)), !0;
            };
            this.openBufferInit(e, i), s();
        }, s = e instanceof Function ? e() : e;
        s instanceof Promise ? s.then(o).catch((e)=>{
            r(null, n(e));
        }) : o(s);
    }
    close() {
        "function" == typeof this.mediainfoModuleInstance.close && this.mediainfoModuleInstance.close(), "function" == typeof this.mediainfoModule.destroy && this.mediainfoModule.destroy(this.mediainfoModuleInstance);
    }
    inform() {
        return this.mediainfoModuleInstance.inform();
    }
    openBufferContinue(e, t) {
        return !!(8 & this.mediainfoModuleInstance.open_buffer_continue(e, t));
    }
    openBufferContinueGotoGet() {
        let e = -1;
        const t = this.mediainfoModuleInstance.open_buffer_continue_goto_get_lower(), r = this.mediainfoModuleInstance.open_buffer_continue_goto_get_upper();
        return e = -1 == t && -1 == r ? -1 : t < 0 ? t + o + r * o : t + r * o, e;
    }
    openBufferFinalize() {
        this.mediainfoModuleInstance.open_buffer_finalize();
    }
    openBufferInit(e, t) {
        this.mediainfoModuleInstance.open_buffer_init(e, t);
    }
    parseResultJson(e) {
        const t = a, n = i, o = JSON.parse(e);
        if (o.media) {
            const e = r(r({}, o.media), {}, {
                track: []
            });
            if (Array.isArray(o.media.track)) for (const a of o.media.track){
                let i = {
                    "@type": a["@type"]
                };
                for (const [e, o] of Object.entries(a))"@type" !== e && (i = "string" == typeof o && t.includes(e) ? r(r({}, i), {}, {
                    [e]: Number.parseInt(o, 10)
                }) : "string" == typeof o && n.includes(e) ? r(r({}, i), {}, {
                    [e]: Number.parseFloat(o)
                }) : r(r({}, i), {}, {
                    [e]: o
                }));
                e.track.push(i);
            }
            return r(r({}, o), {}, {
                media: e
            });
        }
        return o;
    }
}
var l, c = (l = "undefined" != typeof document ? document.currentScript?.src : void 0, function(e = {}) {
    var t, r, n = Object.assign({}, e), a = new Promise((e, n)=>{
        t = e, r = n;
    }), i = Object.assign({}, n), o = "";
    "undefined" != typeof document && document.currentScript && (o = document.currentScript.src), l && (o = l), o = o.startsWith("blob:") ? "" : o.substr(0, o.replace(/[?#].*/, "").lastIndexOf("/") + 1), console.log.bind(console);
    var s, u = console.error.bind(console);
    Object.assign(n, i), i = null;
    var c, d, f, p, m, h, y, g, v = !1;
    function _() {
        var e = s.buffer;
        n.HEAP8 = c = new Int8Array(e), n.HEAP16 = f = new Int16Array(e), n.HEAPU8 = d = new Uint8Array(e), n.HEAPU16 = p = new Uint16Array(e), n.HEAP32 = m = new Int32Array(e), n.HEAPU32 = h = new Uint32Array(e), n.HEAPF32 = y = new Float32Array(e), n.HEAPF64 = g = new Float64Array(e);
    }
    var b = [], $ = [], C = [], w = 0, P = null;
    function T(e) {
        u(e = "Aborted(" + e + ")"), v = !0, e += ". Build with -sASSERTIONS for more info.";
        var t = new WebAssembly.RuntimeError(e);
        throw r(t), t;
    }
    var S, O = (e)=>e.startsWith("data:application/octet-stream;base64,");
    function F() {
        var e, t = "MediaInfoModule.wasm";
        return O(t) ? t : (e = t, n.locateFile ? n.locateFile(e, o) : o + e);
    }
    function A(e) {
        throw "both async and sync fetching of the wasm failed";
    }
    function D(e, t, r) {
        return (function(e) {
            return "function" == typeof fetch ? fetch(e, {
                credentials: "same-origin"
            }).then((t)=>{
                if (!t.ok) throw `failed to load wasm binary file at '${e}'`;
                return t.arrayBuffer();
            }).catch(()=>A()) : Promise.resolve().then(()=>A());
        })(e).then((e)=>WebAssembly.instantiate(e, t)).then(r, (e)=>{
            u(`failed to asynchronously prepare wasm: ${e}`), T(e);
        });
    }
    var j, E, M, R = (e)=>{
        for(; e.length > 0;)e.shift()(n);
    }, W = (e)=>{
        for(var t = "", r = e; d[r];)t += j[d[r++]];
        return t;
    }, k = {}, I = {}, B = {}, x = (e)=>{
        throw new E(e);
    }, U = (e)=>{
        throw new M(e);
    }, H = (e, t, r)=>{
        function n(t) {
            var n = r(t);
            n.length !== e.length && U("Mismatched type converter count");
            for(var a = 0; a < e.length; ++a)z(e[a], n[a]);
        }
        e.forEach(function(e) {
            B[e] = t;
        });
        var a = new Array(t.length), i = [], o = 0;
        t.forEach((e, t)=>{
            I.hasOwnProperty(e) ? a[t] = I[e] : (i.push(e), k.hasOwnProperty(e) || (k[e] = []), k[e].push(()=>{
                a[t] = I[e], ++o === i.length && n(a);
            }));
        }), 0 === i.length && n(a);
    };
    function z(e, t, r = {}) {
        if (!("argPackAdvance" in t)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
        return function(e, t, r = {}) {
            var n = t.name;
            if (e || x(`type "${n}" must have a positive integer typeid pointer`), I.hasOwnProperty(e)) {
                if (r.ignoreDuplicateRegistrations) return;
                x(`Cannot register type '${n}' twice`);
            }
            if (I[e] = t, delete B[e], k.hasOwnProperty(e)) {
                var a = k[e];
                delete k[e], a.forEach((e)=>e());
            }
        }(e, t, r);
    }
    var N, Y = (e)=>{
        x(e.$$.ptrType.registeredClass.name + " instance already deleted");
    }, V = !1, G = (e)=>{}, L = (e)=>{
        e.count.value -= 1, 0 === e.count.value && ((e)=>{
            e.smartPtr ? e.smartPtrType.rawDestructor(e.smartPtr) : e.ptrType.registeredClass.rawDestructor(e.ptr);
        })(e);
    }, J = (e, t, r)=>{
        if (t === r) return e;
        if (void 0 === r.baseClass) return null;
        var n = J(e, t, r.baseClass);
        return null === n ? null : r.downcast(n);
    }, Z = {}, q = ()=>Object.keys(te).length, K = ()=>{
        var e = [];
        for(var t in te)te.hasOwnProperty(t) && e.push(te[t]);
        return e;
    }, X = [], Q = ()=>{
        for(; X.length;){
            var e = X.pop();
            e.$$.deleteScheduled = !1, e.delete();
        }
    }, ee = (e)=>{
        N = e, X.length && N && N(Q);
    }, te = {}, re = (e, t)=>(t = ((e, t)=>{
            for(void 0 === t && x("ptr should not be undefined"); e.baseClass;)t = e.upcast(t), e = e.baseClass;
            return t;
        })(e, t), te[t]), ne = (e, t)=>(t.ptrType && t.ptr || U("makeClassHandle requires ptr and ptrType"), !!t.smartPtrType != !!t.smartPtr && U("Both smartPtrType and smartPtr must be specified"), t.count = {
            value: 1
        }, ie(Object.create(e, {
            $$: {
                value: t,
                writable: !0
            }
        })));
    function ae(e) {
        var t = this.getPointee(e);
        if (!t) return this.destructor(e), null;
        var r = re(this.registeredClass, t);
        if (void 0 !== r) {
            if (0 === r.$$.count.value) return r.$$.ptr = t, r.$$.smartPtr = e, r.clone();
            var n = r.clone();
            return this.destructor(e), n;
        }
        function a() {
            return this.isSmartPointer ? ne(this.registeredClass.instancePrototype, {
                ptrType: this.pointeeType,
                ptr: t,
                smartPtrType: this,
                smartPtr: e
            }) : ne(this.registeredClass.instancePrototype, {
                ptrType: this,
                ptr: e
            });
        }
        var i, o = this.registeredClass.getActualType(t), s = Z[o];
        if (!s) return a.call(this);
        i = this.isConst ? s.constPointerType : s.pointerType;
        var u = J(t, this.registeredClass, i.registeredClass);
        return null === u ? a.call(this) : this.isSmartPointer ? ne(i.registeredClass.instancePrototype, {
            ptrType: i,
            ptr: u,
            smartPtrType: this,
            smartPtr: e
        }) : ne(i.registeredClass.instancePrototype, {
            ptrType: i,
            ptr: u
        });
    }
    var ie = (e)=>"undefined" == typeof FinalizationRegistry ? (ie = (e)=>e, e) : (V = new FinalizationRegistry((e)=>{
            L(e.$$);
        }), ie = (e)=>{
            var t = e.$$;
            if (t.smartPtr) {
                var r = {
                    $$: t
                };
                V.register(e, r, e);
            }
            return e;
        }, G = (e)=>V.unregister(e), ie(e));
    function oe() {}
    var se = (e, t)=>Object.defineProperty(t, "name", {
            value: e
        }), ue = (e, t, r)=>{
        if (void 0 === e[t].overloadTable) {
            var n = e[t];
            e[t] = function(...n) {
                return e[t].overloadTable.hasOwnProperty(n.length) || x(`Function '${r}' called with an invalid number of arguments (${n.length}) - expects one of (${e[t].overloadTable})!`), e[t].overloadTable[n.length].apply(this, n);
            }, e[t].overloadTable = [], e[t].overloadTable[n.argCount] = n;
        }
    };
    function le(e, t, r, n, a, i, o, s) {
        this.name = e, this.constructor = t, this.instancePrototype = r, this.rawDestructor = n, this.baseClass = a, this.getActualType = i, this.upcast = o, this.downcast = s, this.pureVirtualFunctions = [];
    }
    var ce = (e, t, r)=>{
        for(; t !== r;)t.upcast || x(`Expected null or instance of ${r.name}, got an instance of ${t.name}`), e = t.upcast(e), t = t.baseClass;
        return e;
    };
    function de(e, t) {
        if (null === t) return this.isReference && x(`null is not a valid ${this.name}`), 0;
        t.$$ || x(`Cannot pass "${ke(t)}" as a ${this.name}`), t.$$.ptr || x(`Cannot pass deleted object as a pointer of type ${this.name}`);
        var r = t.$$.ptrType.registeredClass;
        return ce(t.$$.ptr, r, this.registeredClass);
    }
    function fe(e, t) {
        var r;
        if (null === t) return this.isReference && x(`null is not a valid ${this.name}`), this.isSmartPointer ? (r = this.rawConstructor(), null !== e && e.push(this.rawDestructor, r), r) : 0;
        t && t.$$ || x(`Cannot pass "${ke(t)}" as a ${this.name}`), t.$$.ptr || x(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && t.$$.ptrType.isConst && x(`Cannot convert argument of type ${t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name} to parameter type ${this.name}`);
        var n = t.$$.ptrType.registeredClass;
        if (r = ce(t.$$.ptr, n, this.registeredClass), this.isSmartPointer) switch(void 0 === t.$$.smartPtr && x("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy){
            case 0:
                t.$$.smartPtrType === this ? r = t.$$.smartPtr : x(`Cannot convert argument of type ${t.$$.smartPtrType ? t.$$.smartPtrType.name : t.$$.ptrType.name} to parameter type ${this.name}`);
                break;
            case 1:
                r = t.$$.smartPtr;
                break;
            case 2:
                if (t.$$.smartPtrType === this) r = t.$$.smartPtr;
                else {
                    var a = t.clone();
                    r = this.rawShare(r, Re.toHandle(()=>a.delete())), null !== e && e.push(this.rawDestructor, r);
                }
                break;
            default:
                x("Unsupporting sharing policy");
        }
        return r;
    }
    function pe(e, t) {
        if (null === t) return this.isReference && x(`null is not a valid ${this.name}`), 0;
        t.$$ || x(`Cannot pass "${ke(t)}" as a ${this.name}`), t.$$.ptr || x(`Cannot pass deleted object as a pointer of type ${this.name}`), t.$$.ptrType.isConst && x(`Cannot convert argument of type ${t.$$.ptrType.name} to parameter type ${this.name}`);
        var r = t.$$.ptrType.registeredClass;
        return ce(t.$$.ptr, r, this.registeredClass);
    }
    function me(e) {
        return this.fromWireType(h[e >> 2]);
    }
    function he(e, t, r, n, a, i, o, s, u, l, c) {
        this.name = e, this.registeredClass = t, this.isReference = r, this.isConst = n, this.isSmartPointer = a, this.pointeeType = i, this.sharingPolicy = o, this.rawGetPointee = s, this.rawConstructor = u, this.rawShare = l, this.rawDestructor = c, a || void 0 !== t.baseClass ? this.toWireType = fe : n ? (this.toWireType = de, this.destructorFunction = null) : (this.toWireType = pe, this.destructorFunction = null);
    }
    var ye, ge, ve = [], _e = (e)=>{
        var t = ve[e];
        return t || (e >= ve.length && (ve.length = e + 1), ve[e] = t = ye.get(e)), t;
    }, be = (e, t, r = [])=>e.includes("j") ? ((e, t, r)=>(e = e.replace(/p/g, "i"), (0, n["dynCall_" + e])(t, ...r)))(e, t, r) : _e(t)(...r), $e = (e, t)=>{
        var r, n, a = (e = W(e)).includes("j") ? (r = e, n = t, (...e)=>be(r, n, e)) : _e(t);
        return "function" != typeof a && x(`unknown function pointer with signature ${e}: ${t}`), a;
    }, Ce = (e)=>{
        var t = st(e), r = W(t);
        return lt(t), r;
    }, we = (e, t)=>{
        var r = [], n = {};
        throw t.forEach(function e(t) {
            n[t] || I[t] || (B[t] ? B[t].forEach(e) : (r.push(t), n[t] = !0));
        }), new ge(`${e}: ` + r.map(Ce).join([
            ", "
        ]));
    }, Pe = (e, t)=>{
        for(var r = [], n = 0; n < e; n++)r.push(h[t + 4 * n >> 2]);
        return r;
    }, Te = (e)=>{
        for(; e.length;){
            var t = e.pop();
            e.pop()(t);
        }
    };
    function Se(e) {
        for(var t = 1; t < e.length; ++t)if (null !== e[t] && void 0 === e[t].destructorFunction) return !0;
        return !1;
    }
    function Oe(e, t, r, n, a, i) {
        var o = t.length;
        o < 2 && x("argTypes array size mismatch! Must at least get return value and 'this' types!");
        for(var s = null !== t[1] && null !== r, u = Se(t), l = "void" !== t[0].name, c = [
            e,
            x,
            n,
            a,
            Te,
            t[0],
            t[1]
        ], d = 0; d < o - 2; ++d)c.push(t[d + 2]);
        if (!u) for(d = s ? 1 : 2; d < t.length; ++d)null !== t[d].destructorFunction && c.push(t[d].destructorFunction);
        let [f, p] = function(e, t, r, n) {
            for(var a = Se(e), i = e.length, o = "", s = "", u = 0; u < i - 2; ++u)o += (0 !== u ? ", " : "") + "arg" + u, s += (0 !== u ? ", " : "") + "arg" + u + "Wired";
            var l = `\n        return function (${o}) {\n        if (arguments.length !== ${i - 2}) {\n          throwBindingError('function ' + humanName + ' called with ' + arguments.length + ' arguments, expected ${i - 2}');\n        }`;
            a && (l += "var destructors = [];\n");
            var c = a ? "destructors" : "null", d = [
                "humanName",
                "throwBindingError",
                "invoker",
                "fn",
                "runDestructors",
                "retType",
                "classParam"
            ];
            for(t && (l += "var thisWired = classParam['toWireType'](" + c + ", this);\n"), u = 0; u < i - 2; ++u)l += "var arg" + u + "Wired = argType" + u + "['toWireType'](" + c + ", arg" + u + ");\n", d.push("argType" + u);
            if (t && (s = "thisWired" + (s.length > 0 ? ", " : "") + s), l += (r || n ? "var rv = " : "") + "invoker(fn" + (s.length > 0 ? ", " : "") + s + ");\n", a) l += "runDestructors(destructors);\n";
            else for(u = t ? 1 : 2; u < e.length; ++u){
                var f = 1 === u ? "thisWired" : "arg" + (u - 2) + "Wired";
                null !== e[u].destructorFunction && (l += `${f}_dtor(${f});\n`, d.push(`${f}_dtor`));
            }
            return r && (l += "var ret = retType['fromWireType'](rv);\nreturn ret;\n"), [
                d,
                l += "}\n"
            ];
        }(t, s, l, i);
        f.push(p);
        var m = (function(e, t) {
            if (!(e instanceof Function)) throw new TypeError(`new_ called with constructor type ${typeof e} which is not a function`);
            var r = se(e.name || "unknownFunctionName", function() {});
            r.prototype = e.prototype;
            var n = new r, a = e.apply(n, t);
            return a instanceof Object ? a : n;
        })(Function, f)(...c);
        return se(e, m);
    }
    var Fe, Ae, De, je = [], Ee = [], Me = ()=>Ee.length / 2 - 5 - je.length, Re = {
        toValue: (e)=>(e || x("Cannot use deleted val. handle = " + e), Ee[e]),
        toHandle: (e)=>{
            switch(e){
                case void 0:
                    return 2;
                case null:
                    return 4;
                case !0:
                    return 6;
                case !1:
                    return 8;
                default:
                    {
                        const t = je.pop() || Ee.length;
                        return Ee[t] = e, Ee[t + 1] = 1, t;
                    }
            }
        }
    }, We = {
        name: "emscripten::val",
        fromWireType: (e)=>{
            var t = Re.toValue(e);
            return ((e)=>{
                e > 9 && 0 == --Ee[e + 1] && (Ee[e] = void 0, je.push(e));
            })(e), t;
        },
        toWireType: (e, t)=>Re.toHandle(t),
        argPackAdvance: 8,
        readValueFromPointer: me,
        destructorFunction: null
    }, ke = (e)=>{
        if (null === e) return "null";
        var t = typeof e;
        return "object" === t || "array" === t || "function" === t ? e.toString() : "" + e;
    }, Ie = (e, t)=>{
        switch(t){
            case 4:
                return function(e) {
                    return this.fromWireType(y[e >> 2]);
                };
            case 8:
                return function(e) {
                    return this.fromWireType(g[e >> 3]);
                };
            default:
                throw new TypeError(`invalid float width (${t}): ${e}`);
        }
    }, Be = (e, t, r)=>{
        switch(t){
            case 1:
                return r ? (e)=>c[e] : (e)=>d[e];
            case 2:
                return r ? (e)=>f[e >> 1] : (e)=>p[e >> 1];
            case 4:
                return r ? (e)=>m[e >> 2] : (e)=>h[e >> 2];
            default:
                throw new TypeError(`invalid integer width (${t}): ${e}`);
        }
    }, xe = (e, t, r, n)=>{
        if (!(n > 0)) return 0;
        for(var a = r, i = r + n - 1, o = 0; o < e.length; ++o){
            var s = e.charCodeAt(o);
            if (s >= 55296 && s <= 57343 && (s = 65536 + ((1023 & s) << 10) | 1023 & e.charCodeAt(++o)), s <= 127) {
                if (r >= i) break;
                t[r++] = s;
            } else if (s <= 2047) {
                if (r + 1 >= i) break;
                t[r++] = 192 | s >> 6, t[r++] = 128 | 63 & s;
            } else if (s <= 65535) {
                if (r + 2 >= i) break;
                t[r++] = 224 | s >> 12, t[r++] = 128 | s >> 6 & 63, t[r++] = 128 | 63 & s;
            } else {
                if (r + 3 >= i) break;
                t[r++] = 240 | s >> 18, t[r++] = 128 | s >> 12 & 63, t[r++] = 128 | s >> 6 & 63, t[r++] = 128 | 63 & s;
            }
        }
        return t[r] = 0, r - a;
    }, Ue = (e, t, r)=>xe(e, d, t, r), He = (e)=>{
        for(var t = 0, r = 0; r < e.length; ++r){
            var n = e.charCodeAt(r);
            n <= 127 ? t++ : n <= 2047 ? t += 2 : n >= 55296 && n <= 57343 ? (t += 4, ++r) : t += 3;
        }
        return t;
    }, ze = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, Ne = (e, t)=>e ? ((e, t, r)=>{
            for(var n = t + r, a = t; e[a] && !(a >= n);)++a;
            if (a - t > 16 && e.buffer && ze) return ze.decode(e.subarray(t, a));
            for(var i = ""; t < a;){
                var o = e[t++];
                if (128 & o) {
                    var s = 63 & e[t++];
                    if (192 != (224 & o)) {
                        var u = 63 & e[t++];
                        if ((o = 224 == (240 & o) ? (15 & o) << 12 | s << 6 | u : (7 & o) << 18 | s << 12 | u << 6 | 63 & e[t++]) < 65536) i += String.fromCharCode(o);
                        else {
                            var l = o - 65536;
                            i += String.fromCharCode(55296 | l >> 10, 56320 | 1023 & l);
                        }
                    } else i += String.fromCharCode((31 & o) << 6 | s);
                } else i += String.fromCharCode(o);
            }
            return i;
        })(d, e, t) : "", Ye = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, Ve = (e, t)=>{
        for(var r = e, n = r >> 1, a = n + t / 2; !(n >= a) && p[n];)++n;
        if ((r = n << 1) - e > 32 && Ye) return Ye.decode(d.subarray(e, r));
        for(var i = "", o = 0; !(o >= t / 2); ++o){
            var s = f[e + 2 * o >> 1];
            if (0 == s) break;
            i += String.fromCharCode(s);
        }
        return i;
    }, Ge = (e, t, r)=>{
        if (r ??= 2147483647, r < 2) return 0;
        for(var n = t, a = (r -= 2) < 2 * e.length ? r / 2 : e.length, i = 0; i < a; ++i){
            var o = e.charCodeAt(i);
            f[t >> 1] = o, t += 2;
        }
        return f[t >> 1] = 0, t - n;
    }, Le = (e)=>2 * e.length, Je = (e, t)=>{
        for(var r = 0, n = ""; !(r >= t / 4);){
            var a = m[e + 4 * r >> 2];
            if (0 == a) break;
            if (++r, a >= 65536) {
                var i = a - 65536;
                n += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i);
            } else n += String.fromCharCode(a);
        }
        return n;
    }, Ze = (e, t, r)=>{
        if (r ??= 2147483647, r < 4) return 0;
        for(var n = t, a = n + r - 4, i = 0; i < e.length; ++i){
            var o = e.charCodeAt(i);
            if (o >= 55296 && o <= 57343 && (o = 65536 + ((1023 & o) << 10) | 1023 & e.charCodeAt(++i)), m[t >> 2] = o, (t += 4) + 4 > a) break;
        }
        return m[t >> 2] = 0, t - n;
    }, qe = (e)=>{
        for(var t = 0, r = 0; r < e.length; ++r){
            var n = e.charCodeAt(r);
            n >= 55296 && n <= 57343 && ++r, t += 4;
        }
        return t;
    }, Ke = (e)=>{
        var t = (e - s.buffer.byteLength + 65535) / 65536;
        try {
            return s.grow(t), _(), 1;
        } catch (e) {}
    }, Xe = {}, Qe = ()=>{
        if (!Qe.strings) {
            var e = {
                USER: "web_user",
                LOGNAME: "web_user",
                PATH: "/",
                PWD: "/",
                HOME: "/home/web_user",
                LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                _: "./this.program"
            };
            for(var t in Xe)void 0 === Xe[t] ? delete e[t] : e[t] = Xe[t];
            var r = [];
            for(var t in e)r.push(`${t}=${e[t]}`);
            Qe.strings = r;
        }
        return Qe.strings;
    }, et = (e)=>e % 4 == 0 && (e % 100 != 0 || e % 400 == 0), tt = [
        31,
        29,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ], rt = [
        31,
        28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ], nt = (e, t, r, n)=>{
        var a = h[n + 40 >> 2], i = {
            tm_sec: m[n >> 2],
            tm_min: m[n + 4 >> 2],
            tm_hour: m[n + 8 >> 2],
            tm_mday: m[n + 12 >> 2],
            tm_mon: m[n + 16 >> 2],
            tm_year: m[n + 20 >> 2],
            tm_wday: m[n + 24 >> 2],
            tm_yday: m[n + 28 >> 2],
            tm_isdst: m[n + 32 >> 2],
            tm_gmtoff: m[n + 36 >> 2],
            tm_zone: a ? Ne(a) : ""
        }, o = Ne(r), s = {
            "%c": "%a %b %d %H:%M:%S %Y",
            "%D": "%m/%d/%y",
            "%F": "%Y-%m-%d",
            "%h": "%b",
            "%r": "%I:%M:%S %p",
            "%R": "%H:%M",
            "%T": "%H:%M:%S",
            "%x": "%m/%d/%y",
            "%X": "%H:%M:%S",
            "%Ec": "%c",
            "%EC": "%C",
            "%Ex": "%m/%d/%y",
            "%EX": "%H:%M:%S",
            "%Ey": "%y",
            "%EY": "%Y",
            "%Od": "%d",
            "%Oe": "%e",
            "%OH": "%H",
            "%OI": "%I",
            "%Om": "%m",
            "%OM": "%M",
            "%OS": "%S",
            "%Ou": "%u",
            "%OU": "%U",
            "%OV": "%V",
            "%Ow": "%w",
            "%OW": "%W",
            "%Oy": "%y"
        };
        for(var u in s)o = o.replace(new RegExp(u, "g"), s[u]);
        var l = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ], d = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        function f(e, t, r) {
            for(var n = "number" == typeof e ? e.toString() : e || ""; n.length < t;)n = r[0] + n;
            return n;
        }
        function p(e, t) {
            return f(e, t, "0");
        }
        function y(e, t) {
            function r(e) {
                return e < 0 ? -1 : e > 0 ? 1 : 0;
            }
            var n;
            return 0 === (n = r(e.getFullYear() - t.getFullYear())) && 0 === (n = r(e.getMonth() - t.getMonth())) && (n = r(e.getDate() - t.getDate())), n;
        }
        function g(e) {
            switch(e.getDay()){
                case 0:
                    return new Date(e.getFullYear() - 1, 11, 29);
                case 1:
                    return e;
                case 2:
                    return new Date(e.getFullYear(), 0, 3);
                case 3:
                    return new Date(e.getFullYear(), 0, 2);
                case 4:
                    return new Date(e.getFullYear(), 0, 1);
                case 5:
                    return new Date(e.getFullYear() - 1, 11, 31);
                case 6:
                    return new Date(e.getFullYear() - 1, 11, 30);
            }
        }
        function v(e) {
            var t = ((e, t)=>{
                for(var r = new Date(e.getTime()); t > 0;){
                    var n = et(r.getFullYear()), a = r.getMonth(), i = (n ? tt : rt)[a];
                    if (!(t > i - r.getDate())) return r.setDate(r.getDate() + t), r;
                    t -= i - r.getDate() + 1, r.setDate(1), a < 11 ? r.setMonth(a + 1) : (r.setMonth(0), r.setFullYear(r.getFullYear() + 1));
                }
                return r;
            })(new Date(e.tm_year + 1900, 0, 1), e.tm_yday), r = new Date(t.getFullYear(), 0, 4), n = new Date(t.getFullYear() + 1, 0, 4), a = g(r), i = g(n);
            return y(a, t) <= 0 ? y(i, t) <= 0 ? t.getFullYear() + 1 : t.getFullYear() : t.getFullYear() - 1;
        }
        var _ = {
            "%a": (e)=>l[e.tm_wday].substring(0, 3),
            "%A": (e)=>l[e.tm_wday],
            "%b": (e)=>d[e.tm_mon].substring(0, 3),
            "%B": (e)=>d[e.tm_mon],
            "%C": (e)=>p((e.tm_year + 1900) / 100 | 0, 2),
            "%d": (e)=>p(e.tm_mday, 2),
            "%e": (e)=>f(e.tm_mday, 2, " "),
            "%g": (e)=>v(e).toString().substring(2),
            "%G": v,
            "%H": (e)=>p(e.tm_hour, 2),
            "%I": (e)=>{
                var t = e.tm_hour;
                return 0 == t ? t = 12 : t > 12 && (t -= 12), p(t, 2);
            },
            "%j": (e)=>p(e.tm_mday + ((e, t)=>{
                    for(var r = 0, n = 0; n <= t; r += e[n++]);
                    return r;
                })(et(e.tm_year + 1900) ? tt : rt, e.tm_mon - 1), 3),
            "%m": (e)=>p(e.tm_mon + 1, 2),
            "%M": (e)=>p(e.tm_min, 2),
            "%n": ()=>"\n",
            "%p": (e)=>e.tm_hour >= 0 && e.tm_hour < 12 ? "AM" : "PM",
            "%S": (e)=>p(e.tm_sec, 2),
            "%t": ()=>"\t",
            "%u": (e)=>e.tm_wday || 7,
            "%U": (e)=>{
                var t = e.tm_yday + 7 - e.tm_wday;
                return p(Math.floor(t / 7), 2);
            },
            "%V": (e)=>{
                var t = Math.floor((e.tm_yday + 7 - (e.tm_wday + 6) % 7) / 7);
                if ((e.tm_wday + 371 - e.tm_yday - 2) % 7 <= 2 && t++, t) {
                    if (53 == t) {
                        var r = (e.tm_wday + 371 - e.tm_yday) % 7;
                        4 == r || 3 == r && et(e.tm_year) || (t = 1);
                    }
                } else {
                    t = 52;
                    var n = (e.tm_wday + 7 - e.tm_yday - 1) % 7;
                    (4 == n || 5 == n && et(e.tm_year % 400 - 1)) && t++;
                }
                return p(t, 2);
            },
            "%w": (e)=>e.tm_wday,
            "%W": (e)=>{
                var t = e.tm_yday + 7 - (e.tm_wday + 6) % 7;
                return p(Math.floor(t / 7), 2);
            },
            "%y": (e)=>(e.tm_year + 1900).toString().substring(2),
            "%Y": (e)=>e.tm_year + 1900,
            "%z": (e)=>{
                var t = e.tm_gmtoff, r = t >= 0;
                return t = (t = Math.abs(t) / 60) / 60 * 100 + t % 60, (r ? "+" : "-") + String("0000" + t).slice(-4);
            },
            "%Z": (e)=>e.tm_zone,
            "%%": ()=>"%"
        };
        for(var u in o = o.replace(/%%/g, "\0\0"), _)o.includes(u) && (o = o.replace(new RegExp(u, "g"), _[u](i)));
        o = o.replace(/\0\0/g, "%");
        var b, $, C, w, P, T = ($ = He(b = o) + 1, C = new Array($), xe(b, C, 0, C.length), C);
        return T.length > t ? 0 : (w = T, P = e, c.set(w, P), T.length - 1);
    };
    (()=>{
        for(var e = new Array(256), t = 0; t < 256; ++t)e[t] = String.fromCharCode(t);
        j = e;
    })(), E = n.BindingError = class extends Error {
        constructor(e){
            super(e), this.name = "BindingError";
        }
    }, M = n.InternalError = class extends Error {
        constructor(e){
            super(e), this.name = "InternalError";
        }
    }, Object.assign(oe.prototype, {
        isAliasOf (e) {
            if (!(this instanceof oe)) return !1;
            if (!(e instanceof oe)) return !1;
            var t = this.$$.ptrType.registeredClass, r = this.$$.ptr;
            e.$$ = e.$$;
            for(var n = e.$$.ptrType.registeredClass, a = e.$$.ptr; t.baseClass;)r = t.upcast(r), t = t.baseClass;
            for(; n.baseClass;)a = n.upcast(a), n = n.baseClass;
            return t === n && r === a;
        },
        clone () {
            if (this.$$.ptr || Y(this), this.$$.preservePointerOnDelete) return this.$$.count.value += 1, this;
            var e, t = ie(Object.create(Object.getPrototypeOf(this), {
                $$: {
                    value: (e = this.$$, {
                        count: e.count,
                        deleteScheduled: e.deleteScheduled,
                        preservePointerOnDelete: e.preservePointerOnDelete,
                        ptr: e.ptr,
                        ptrType: e.ptrType,
                        smartPtr: e.smartPtr,
                        smartPtrType: e.smartPtrType
                    })
                }
            }));
            return t.$$.count.value += 1, t.$$.deleteScheduled = !1, t;
        },
        delete () {
            this.$$.ptr || Y(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && x("Object already scheduled for deletion"), G(this), L(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
        },
        isDeleted () {
            return !this.$$.ptr;
        },
        deleteLater () {
            return this.$$.ptr || Y(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && x("Object already scheduled for deletion"), X.push(this), 1 === X.length && N && N(Q), this.$$.deleteScheduled = !0, this;
        }
    }), n.getInheritedInstanceCount = q, n.getLiveInheritedInstances = K, n.flushPendingDeletes = Q, n.setDelayFunction = ee, Object.assign(he.prototype, {
        getPointee (e) {
            return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
        },
        destructor (e) {
            this.rawDestructor?.(e);
        },
        argPackAdvance: 8,
        readValueFromPointer: me,
        fromWireType: ae
    }), ge = n.UnboundTypeError = (Fe = Error, (De = se(Ae = "UnboundTypeError", function(e) {
        this.name = Ae, this.message = e;
        var t = new Error(e).stack;
        void 0 !== t && (this.stack = this.toString() + "\n" + t.replace(/^Error(:[^\n]*)?\n/, ""));
    })).prototype = Object.create(Fe.prototype), De.prototype.constructor = De, De.prototype.toString = function() {
        return void 0 === this.message ? this.name : `${this.name}: ${this.message}`;
    }, De), Ee.push(0, 1, void 0, 1, null, 1, !0, 1, !1, 1), n.count_emval_handles = Me;
    var at, it = {
        _abort_js: ()=>{
            T("");
        },
        _embind_register_bigint: (e, t, r, n, a)=>{},
        _embind_register_bool: (e, t, r, n)=>{
            z(e, {
                name: t = W(t),
                fromWireType: function(e) {
                    return !!e;
                },
                toWireType: function(e, t) {
                    return t ? r : n;
                },
                argPackAdvance: 8,
                readValueFromPointer: function(e) {
                    return this.fromWireType(d[e]);
                },
                destructorFunction: null
            });
        },
        _embind_register_class: (e, t, r, a, i, o, s, u, l, c, d, f, p)=>{
            d = W(d), o = $e(i, o), u &&= $e(s, u), c &&= $e(l, c), p = $e(f, p);
            var m = ((e)=>{
                if (void 0 === e) return "_unknown";
                var t = (e = e.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
                return t >= 48 && t <= 57 ? `_${e}` : e;
            })(d);
            ((e, t, r)=>{
                n.hasOwnProperty(e) ? (x(`Cannot register public name '${e}' twice`), ue(n, e, e), n.hasOwnProperty(r) && x(`Cannot register multiple overloads of a function with the same number of arguments (${r})!`), n[e].overloadTable[r] = t) : n[e] = t;
            })(m, function() {
                we(`Cannot construct ${d} due to unbound types`, [
                    a
                ]);
            }), H([
                e,
                t,
                r
            ], a ? [
                a
            ] : [], (t)=>{
                var r, i;
                t = t[0], i = a ? (r = t.registeredClass).instancePrototype : oe.prototype;
                var s = se(d, function(...e) {
                    if (Object.getPrototypeOf(this) !== l) throw new E("Use 'new' to construct " + d);
                    if (void 0 === f.constructor_body) throw new E(d + " has no accessible constructor");
                    var t = f.constructor_body[e.length];
                    if (void 0 === t) throw new E(`Tried to invoke ctor of ${d} with invalid number of parameters (${e.length}) - expected (${Object.keys(f.constructor_body).toString()}) parameters instead!`);
                    return t.apply(this, e);
                }), l = Object.create(i, {
                    constructor: {
                        value: s
                    }
                });
                s.prototype = l;
                var f = new le(d, s, l, p, r, o, u, c);
                f.baseClass && (f.baseClass.__derivedClasses ??= [], f.baseClass.__derivedClasses.push(f));
                var h = new he(d, f, !0, !1, !1), y = new he(d + "*", f, !1, !1, !1), g = new he(d + " const*", f, !1, !0, !1);
                return Z[e] = {
                    pointerType: y,
                    constPointerType: g
                }, ((e, t, r)=>{
                    n.hasOwnProperty(e) || U("Replacing nonexistent public symbol"), void 0 !== n[e].overloadTable && void 0 !== r ? n[e].overloadTable[r] = t : (n[e] = t, n[e].argCount = r);
                })(m, s), [
                    h,
                    y,
                    g
                ];
            });
        },
        _embind_register_class_constructor: (e, t, r, n, a, i)=>{
            var o = Pe(t, r);
            a = $e(n, a), H([], [
                e
            ], (e)=>{
                var r = `constructor ${(e = e[0]).name}`;
                if (void 0 === e.registeredClass.constructor_body && (e.registeredClass.constructor_body = []), void 0 !== e.registeredClass.constructor_body[t - 1]) throw new E(`Cannot register multiple constructors with identical number of parameters (${t - 1}) for class '${e.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
                return e.registeredClass.constructor_body[t - 1] = ()=>{
                    we(`Cannot construct ${e.name} due to unbound types`, o);
                }, H([], o, (n)=>(n.splice(1, 0, null), e.registeredClass.constructor_body[t - 1] = Oe(r, n, null, a, i), [])), [];
            });
        },
        _embind_register_class_function: (e, t, r, n, a, i, o, s, u)=>{
            var l = Pe(r, n);
            t = ((e)=>{
                const t = (e = e.trim()).indexOf("(");
                return -1 !== t ? e.substr(0, t) : e;
            })(t = W(t)), i = $e(a, i), H([], [
                e
            ], (e)=>{
                var n = `${(e = e[0]).name}.${t}`;
                function a() {
                    we(`Cannot call ${n} due to unbound types`, l);
                }
                t.startsWith("@@") && (t = Symbol[t.substring(2)]), s && e.registeredClass.pureVirtualFunctions.push(t);
                var c = e.registeredClass.instancePrototype, d = c[t];
                return void 0 === d || void 0 === d.overloadTable && d.className !== e.name && d.argCount === r - 2 ? (a.argCount = r - 2, a.className = e.name, c[t] = a) : (ue(c, t, n), c[t].overloadTable[r - 2] = a), H([], l, (a)=>{
                    var s = Oe(n, a, e, i, o, u);
                    return void 0 === c[t].overloadTable ? (s.argCount = r - 2, c[t] = s) : c[t].overloadTable[r - 2] = s, [];
                }), [];
            });
        },
        _embind_register_emval: (e)=>z(e, We),
        _embind_register_float: (e, t, r)=>{
            z(e, {
                name: t = W(t),
                fromWireType: (e)=>e,
                toWireType: (e, t)=>t,
                argPackAdvance: 8,
                readValueFromPointer: Ie(t, r),
                destructorFunction: null
            });
        },
        _embind_register_integer: (e, t, r, n, a)=>{
            t = W(t);
            var i = (e)=>e;
            if (0 === n) {
                var o = 32 - 8 * r;
                i = (e)=>e << o >>> o;
            }
            var s = t.includes("unsigned");
            z(e, {
                name: t,
                fromWireType: i,
                toWireType: s ? function(e, t) {
                    return this.name, t >>> 0;
                } : function(e, t) {
                    return this.name, t;
                },
                argPackAdvance: 8,
                readValueFromPointer: Be(t, r, 0 !== n),
                destructorFunction: null
            });
        },
        _embind_register_memory_view: (e, t, r)=>{
            var n = [
                Int8Array,
                Uint8Array,
                Int16Array,
                Uint16Array,
                Int32Array,
                Uint32Array,
                Float32Array,
                Float64Array
            ][t];
            function a(e) {
                var t = h[e >> 2], r = h[e + 4 >> 2];
                return new n(c.buffer, r, t);
            }
            z(e, {
                name: r = W(r),
                fromWireType: a,
                argPackAdvance: 8,
                readValueFromPointer: a
            }, {
                ignoreDuplicateRegistrations: !0
            });
        },
        _embind_register_std_string: (e, t)=>{
            var r = "std::string" === (t = W(t));
            z(e, {
                name: t,
                fromWireType (e) {
                    var t, n = h[e >> 2], a = e + 4;
                    if (r) for(var i = a, o = 0; o <= n; ++o){
                        var s = a + o;
                        if (o == n || 0 == d[s]) {
                            var u = Ne(i, s - i);
                            void 0 === t ? t = u : (t += String.fromCharCode(0), t += u), i = s + 1;
                        }
                    }
                    else {
                        var l = new Array(n);
                        for(o = 0; o < n; ++o)l[o] = String.fromCharCode(d[a + o]);
                        t = l.join("");
                    }
                    return lt(e), t;
                },
                toWireType (e, t) {
                    var n;
                    t instanceof ArrayBuffer && (t = new Uint8Array(t));
                    var a = "string" == typeof t;
                    a || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Int8Array || x("Cannot pass non-string to std::string"), n = r && a ? He(t) : t.length;
                    var i = ut(4 + n + 1), o = i + 4;
                    if (h[i >> 2] = n, r && a) Ue(t, o, n + 1);
                    else if (a) for(var s = 0; s < n; ++s){
                        var u = t.charCodeAt(s);
                        u > 255 && (lt(o), x("String has UTF-16 code units that do not fit in 8 bits")), d[o + s] = u;
                    }
                    else for(s = 0; s < n; ++s)d[o + s] = t[s];
                    return null !== e && e.push(lt, i), i;
                },
                argPackAdvance: 8,
                readValueFromPointer: me,
                destructorFunction (e) {
                    lt(e);
                }
            });
        },
        _embind_register_std_wstring: (e, t, r)=>{
            var n, a, i, o;
            r = W(r), 2 === t ? (n = Ve, a = Ge, o = Le, i = (e)=>p[e >> 1]) : 4 === t && (n = Je, a = Ze, o = qe, i = (e)=>h[e >> 2]), z(e, {
                name: r,
                fromWireType: (e)=>{
                    for(var r, a = h[e >> 2], o = e + 4, s = 0; s <= a; ++s){
                        var u = e + 4 + s * t;
                        if (s == a || 0 == i(u)) {
                            var l = n(o, u - o);
                            void 0 === r ? r = l : (r += String.fromCharCode(0), r += l), o = u + t;
                        }
                    }
                    return lt(e), r;
                },
                toWireType: (e, n)=>{
                    "string" != typeof n && x(`Cannot pass non-string to C++ string type ${r}`);
                    var i = o(n), s = ut(4 + i + t);
                    return h[s >> 2] = i / t, a(n, s + 4, i + t), null !== e && e.push(lt, s), s;
                },
                argPackAdvance: 8,
                readValueFromPointer: me,
                destructorFunction (e) {
                    lt(e);
                }
            });
        },
        _embind_register_void: (e, t)=>{
            z(e, {
                isVoid: !0,
                name: t = W(t),
                argPackAdvance: 0,
                fromWireType: ()=>{},
                toWireType: (e, t)=>{}
            });
        },
        _emscripten_memcpy_js: (e, t, r)=>d.copyWithin(e, t, t + r),
        _gmtime_js: function(e, t, r) {
            var n, a, i = (a = t) + 2097152 >>> 0 < 4194305 - !!(n = e) ? (n >>> 0) + 4294967296 * a : NaN, o = new Date(1e3 * i);
            m[r >> 2] = o.getUTCSeconds(), m[r + 4 >> 2] = o.getUTCMinutes(), m[r + 8 >> 2] = o.getUTCHours(), m[r + 12 >> 2] = o.getUTCDate(), m[r + 16 >> 2] = o.getUTCMonth(), m[r + 20 >> 2] = o.getUTCFullYear() - 1900, m[r + 24 >> 2] = o.getUTCDay();
            var s = Date.UTC(o.getUTCFullYear(), 0, 1, 0, 0, 0, 0), u = (o.getTime() - s) / 864e5 | 0;
            m[r + 28 >> 2] = u;
        },
        _tzset_js: (e, t, r, n)=>{
            var a = (new Date).getFullYear(), i = new Date(a, 0, 1), o = new Date(a, 6, 1), s = i.getTimezoneOffset(), u = o.getTimezoneOffset(), l = Math.max(s, u);
            h[e >> 2] = 60 * l, m[t >> 2] = Number(s != u);
            var c = (e)=>e.toLocaleTimeString(void 0, {
                    hour12: !1,
                    timeZoneName: "short"
                }).split(" ")[1], d = c(i), f = c(o);
            u < s ? (Ue(d, r, 17), Ue(f, n, 17)) : (Ue(d, n, 17), Ue(f, r, 17));
        },
        emscripten_date_now: ()=>Date.now(),
        emscripten_resize_heap: (e)=>{
            var t = d.length, r = 2147483648;
            if ((e >>>= 0) > r) return !1;
            for(var n, a, i = 1; i <= 4; i *= 2){
                var o = t * (1 + .2 / i);
                o = Math.min(o, e + 100663296);
                var s = Math.min(r, (n = Math.max(e, o)) + ((a = 65536) - n % a) % a);
                if (Ke(s)) return !0;
            }
            return !1;
        },
        environ_get: (e, t)=>{
            var r = 0;
            return Qe().forEach((n, a)=>{
                var i = t + r;
                h[e + 4 * a >> 2] = i, ((e, t)=>{
                    for(var r = 0; r < e.length; ++r)c[t++] = e.charCodeAt(r);
                    c[t] = 0;
                })(n, i), r += n.length + 1;
            }), 0;
        },
        environ_sizes_get: (e, t)=>{
            var r = Qe();
            h[e >> 2] = r.length;
            var n = 0;
            return r.forEach((e)=>n += e.length + 1), h[t >> 2] = n, 0;
        },
        strftime_l: (e, t, r, n, a)=>nt(e, t, r, n)
    }, ot = function() {
        var e, t, n, a = {
            env: it,
            wasi_snapshot_preview1: it
        };
        function i(e, t) {
            var r;
            return ot = e.exports, s = ot.memory, _(), ye = ot.__indirect_function_table, r = ot.__wasm_call_ctors, $.unshift(r), function() {
                if (0 == --w && P) {
                    var e = P;
                    P = null, e();
                }
            }(), ot;
        }
        return w++, S || (S = F()), (e = S, t = a, n = function(e) {
            i(e.instance);
        }, "function" != typeof WebAssembly.instantiateStreaming || O(e) || "function" != typeof fetch ? D(e, t, n) : fetch(e, {
            credentials: "same-origin"
        }).then((r)=>WebAssembly.instantiateStreaming(r, t).then(n, function(r) {
                return u(`wasm streaming compile failed: ${r}`), u("falling back to ArrayBuffer instantiation"), D(e, t, n);
            }))).catch(r), {};
    }(), st = (e)=>(st = ot.__getTypeName)(e), ut = (e)=>(ut = ot.malloc)(e), lt = (e)=>(lt = ot.free)(e);
    function ct() {
        w > 0 || (R(b), w > 0 || at || (at = !0, n.calledRun = !0, v || (R($), t(n), R(C))));
    }
    return n.dynCall_iiijj = (e, t, r, a, i, o, s)=>(n.dynCall_iiijj = ot.dynCall_iiijj)(e, t, r, a, i, o, s), n.dynCall_viijii = (e, t, r, a, i, o, s)=>(n.dynCall_viijii = ot.dynCall_viijii)(e, t, r, a, i, o, s), n.dynCall_iiiiij = (e, t, r, a, i, o, s)=>(n.dynCall_iiiiij = ot.dynCall_iiiiij)(e, t, r, a, i, o, s), n.dynCall_iiiiijj = (e, t, r, a, i, o, s, u, l)=>(n.dynCall_iiiiijj = ot.dynCall_iiiiijj)(e, t, r, a, i, o, s, u, l), n.dynCall_iiiiiijj = (e, t, r, a, i, o, s, u, l, c)=>(n.dynCall_iiiiiijj = ot.dynCall_iiiiiijj)(e, t, r, a, i, o, s, u, l, c), P = function e() {
        at || ct(), at || (P = e);
    }, ct(), a;
});
const d = [
    "locateFile"
], f = ()=>{};
function p(e, t) {
    try {
        if ("/" === new URL(t).pathname) return "".concat(t, "mediainfo.js/dist/").concat(e);
    } catch (e) {}
    return "".concat(t, "../").concat(e);
}
function m() {
    var e;
    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0, a = arguments.length > 2 ? arguments[2] : void 0;
    if (void 0 === n) return new Promise((e, r)=>{
        m(t, e, r);
    });
    const i = r(r(r({}, s), t), {}, {
        format: null !== (e = t.format) && void 0 !== e ? e : s.format
    }), { locateFile: o } = i, l = function(e, t) {
        if (null == e) return {};
        var r, n, a = function(e, t) {
            if (null == e) return {};
            var r = {};
            for(var n in e)if (({}).hasOwnProperty.call(e, n)) {
                if (t.includes(n)) continue;
                r[n] = e[n];
            }
            return r;
        }(e, t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for(n = 0; n < i.length; n++)r = i[n], t.includes(r) || ({}).propertyIsEnumerable.call(e, r) && (a[r] = e[r]);
        }
        return a;
    }(i, d);
    c({
        print: f,
        printErr: f,
        locateFile: null != o ? o : p,
        onAbort: (e)=>{
            a && a(e);
        }
    }).then((e)=>{
        n(new u(e, l));
    }).catch((e)=>{
        a && a(e);
    });
}
function h(e, t) {
    return null !== e && "object" == typeof e && e["@type"] === t;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["jX0JV","6rimH"], "6rimH", "parcelRequire94c2")

//# sourceMappingURL=index.8987b93d.js.map
