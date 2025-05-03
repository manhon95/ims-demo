import{ee as o,iX as a,iY as s,iW as c}from"./index-BxBRPJgz.js";import{s as _}from"./SimpleGeometryCursor-mcLrWF5q.js";let r;function f(){return!!r&&c()}async function p(){if(!f()){const[t,n]=await Promise.all([o(()=>import("./OperatorGeodeticDensifyByLength-y0n2F9iy.js"),__vite__mapDeps([0,1,2,3,4,5])),o(()=>import("./ProjectionTransformation-Xhe8ILPs.js").then(e=>e.aW),__vite__mapDeps([3,2,1,4,5])).then(e=>e.aG).then(({injectPe:e})=>e),a()]);r=new t.OperatorGeodeticDensifyByLength,n(s)}}function y(t,n,e,i){return r.execute(t,n,e,i,null)}function P(t,n,e,i){const u=r.executeMany(new _(t),n,e,i,null);return Array.from(u)}function d(){return r.supportsCurves()}export{d as a,P as c,p as i,f as s,y as u};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/OperatorGeodeticDensifyByLength-y0n2F9iy.js","assets/SimpleGeometryCursor-mcLrWF5q.js","assets/Transformation2D-xpGMitgC.js","assets/ProjectionTransformation-Xhe8ILPs.js","assets/index-BxBRPJgz.js","assets/index-69fO1gDf.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}