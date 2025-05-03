import{iW as c,ee as u,iX as _,iY as f}from"./index-bAmN2aA2.js";import{s as l}from"./SimpleGeometryCursor-mcLrWF5q.js";let n;function m(){return!!n&&c()}async function d(){if(!m()){const[t,r]=await Promise.all([u(()=>import("./OperatorGeodesicBuffer-q1BXmDj2.js"),__vite__mapDeps([0,1,2,3,4,5,6])),u(()=>import("./ProjectionTransformation-bgMRW0kj.js").then(e=>e.aW),__vite__mapDeps([3,2,1,4,5])).then(e=>e.aG).then(({injectPe:e})=>e),_()]);n=new t.OperatorGeodesicBuffer,r(f)}}function v(t,r,e,o,i){return n.execute(t,r,e,o,i,!1,null)}function E(t,r,e,o,i,a){const s=n.executeMany(new l(t),r,e,o,i,!1,a,null);return Array.from(s)}function h(){return n.supportsCurves()}export{h as a,E as c,v as i,m as s,d as u};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/OperatorGeodesicBuffer-q1BXmDj2.js","assets/SimpleGeometryCursor-mcLrWF5q.js","assets/Transformation2D-xpGMitgC.js","assets/ProjectionTransformation-bgMRW0kj.js","assets/index-bAmN2aA2.js","assets/index-69fO1gDf.css","assets/GeometryCleaner-BEJM7I4l-OG6dR56H.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}