import{ee as i,jx as r}from"./index-rQblpct7.js";function u(){return new Promise(e=>i(()=>import("./lyr3DMain-TtkphfEA.js"),__vite__mapDeps([0,1,2])).then(t=>t.l).then(({default:t})=>{const n=t({locateFile:o,onRuntimeInitialized:()=>e(n)})})).catch(e=>{throw e})}function _(){return new Promise(e=>i(()=>import("./lyr3DWorker-hqXfKYb2.js"),__vite__mapDeps([3,1,2])).then(t=>t.l).then(({default:t})=>{const n=t({locateFile:o,onRuntimeInitialized:()=>e(n)})})).catch(e=>{throw e})}function o(e){return r(`esri/libs/lyr3d/${e}`)}export{_ as e,u as n};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/lyr3DMain-TtkphfEA.js","assets/index-rQblpct7.js","assets/index-69fO1gDf.css","assets/lyr3DWorker-hqXfKYb2.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}