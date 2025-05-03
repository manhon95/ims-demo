import{q7 as Q,q8 as P,q9 as J,qa as X,qb as K,qc as ee,qd as te,d6 as r,qe as re,qf as ie,qg as c,qh as ae,qi as H,qj as se,qk as ne,ql as g,qm as oe,qn as ce,qo as le,qp as pe,qq as de,qr as he,qs as k,qt as ve,qu as ue,qv as me,qw as fe,qx as Se,ee as Te,qy as y,qz as q,qA as ge,qB as Pe,qC as _e,qD as I,qE as Oe,qF as Ae,qG as x,qH as U,qI as W,qJ as Ee,qK as M,qL as j,qM as we,qN as ye,qO as Re,qP as xe,qQ as S,qR as $e,qS as qe,qT as $,cX as R,qU as Ie,qV as F,qW as G,qX as ze,dI as Ce,qY as De,qZ as Le,dx as B,q_ as Ne,hC as V,d2 as Z}from"./index-BxBRPJgz.js";function be(l){const e=new Q,{space:t,anchor:p,hasTip:T}=l,m=t===P.World;e.include(J,l),e.include(X,l),e.include(K,l);const{vertex:i,fragment:d}=e;d.include(ee),te(i,l),e.attributes.add(r.POSITION,"vec3"),e.attributes.add(r.PREVPOSITION,"vec3"),e.attributes.add(r.UV0,"vec2"),e.varyings.add("vColor","vec4"),e.varyings.add("vpos","vec3"),e.varyings.add("vUV","vec2"),e.varyings.add("vSize","float"),T&&e.varyings.add("vLineWidth","float"),i.uniforms.add(new re("nearFar",({camera:o})=>o.nearFar),new ie("viewport",({camera:o})=>o.fullViewport)),i.code.add(c`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),i.code.add(c`void clip(vec4 pos, inout vec4 prev) {
float vnp = nearFar[0] * 0.99;
if (prev.z > -nearFar[0]) {
float interpolation = (-vnp - pos.z) / (prev.z - pos.z);
prev = mix(pos, prev, interpolation);
}
}`),m?(e.attributes.add(r.NORMAL,"vec3"),ae(i),i.constants.add("tiltThreshold","float",.7),i.code.add(c`vec3 perpendicular(vec3 v) {
vec3 n = (viewNormal * vec4(normal.xyz, 1.0)).xyz;
vec3 n2 = cross(v, n);
vec3 forward = vec3(0.0, 0.0, 1.0);
float tiltDot = dot(forward, n);
return abs(tiltDot) < tiltThreshold ? n : n2;
}`)):i.code.add(c`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}`);const h=m?"vec3":"vec2";return i.code.add(c`
      ${h} normalizedSegment(${h} pos, ${h} prev) {
        ${h} segment = pos - prev;
        float segmentLen = length(segment);

        // normalize or zero if too short
        return (segmentLen > 0.001) ? segment / segmentLen : ${m?"vec3(0.0, 0.0, 0.0)":"vec2(0.0, 0.0)"};
      }

      ${h} displace(${h} pos, ${h} prev, float displacementLen) {
        ${h} segment = normalizedSegment(pos, prev);

        ${h} displacementDirU = perpendicular(segment);
        ${h} displacementDirV = segment;

        ${p===H.Tip?"pos -= 0.5 * displacementLen * displacementDirV;":""}

        return pos + displacementLen * (uv0.x * displacementDirU + uv0.y * displacementDirV);
      }
    `),t===P.Screen&&(i.uniforms.add(new se("inverseProjectionMatrix",({camera:o})=>o.inverseProjectionMatrix)),i.code.add(c`vec3 inverseProject(vec4 posScreen) {
posScreen.xy = (posScreen.xy / viewport.zw) * posScreen.w;
return (inverseProjectionMatrix * posScreen).xyz;
}`),i.code.add(c`bool rayIntersectPlane(vec3 rayDir, vec3 planeOrigin, vec3 planeNormal, out vec3 intersection) {
float cos = dot(rayDir, planeNormal);
float t = dot(planeOrigin, planeNormal) / cos;
intersection = t * rayDir;
return abs(cos) > 0.001 && t > 0.0;
}`),i.uniforms.add(new ne("perScreenPixelRatio",({camera:o})=>o.perScreenPixelRatio)),i.code.add(c`
      vec4 toFront(vec4 displacedPosScreen, vec3 posLeft, vec3 posRight, vec3 prev, float lineWidth) {
        // Project displaced position back to camera space
        vec3 displacedPos = inverseProject(displacedPosScreen);

        // Calculate the plane that we want the marker to lie in. Note that this will always be an approximation since ribbon lines are generally
        // not planar and we do not know the actual position of the displaced prev vertices (they are offset in screen space, too).
        vec3 planeNormal = normalize(cross(posLeft - posRight, posLeft - prev));
        vec3 planeOrigin = posLeft;

        ${g(l.hasCap,`if(prev.z > posLeft.z) {
                vec2 diff = posLeft.xy - posRight.xy;
                planeOrigin.xy += perpendicular(diff) / 2.0;
             }`)};

        // Move the plane towards the camera by a margin dependent on the line width (approximated in world space). This tolerance corrects for the
        // non-planarity in most cases, but sharp joins can place the prev vertices at arbitrary positions so markers can still clip.
        float offset = lineWidth * perScreenPixelRatio;
        planeOrigin *= (1.0 - offset);

        // Intersect camera ray with the plane and make sure it is within clip space
        vec3 rayDir = normalize(displacedPos);
        vec3 intersection;
        if (rayIntersectPlane(rayDir, planeOrigin, planeNormal, intersection) && intersection.z < -nearFar[0] && intersection.z > -nearFar[1]) {
          return vec4(intersection.xyz, 1.0);
        }

        // Fallback: use depth of pos or prev, whichever is closer to the camera
        float minDepth = planeOrigin.z > prev.z ? length(planeOrigin) : length(prev);
        displacedPos *= minDepth / length(displacedPos);
        return vec4(displacedPos.xyz, 1.0);
      }
  `)),oe(i),i.main.add(c`
    // Check for special value of uv0.y which is used by the Renderer when graphics
    // are removed before the VBO is recompacted. If this is the case, then we just
    // project outside of clip space.
    if (uv0.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      float lineWidth = getLineWidth();
      float screenMarkerSize = getScreenMarkerSize();

      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      clip(pos, prev);

      ${m?c`${g(l.hideOnShortSegments,c`
                if (areWorldMarkersHidden(pos, prev)) {
                  // Project out of clip space
                  gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
                  return;
                }`)}
            pos.xyz = displace(pos.xyz, prev.xyz, getWorldMarkerSize(pos));
            vec4 displacedPosScreen = projectAndScale(pos);`:c`
            vec4 posScreen = projectAndScale(pos);
            vec4 prevScreen = projectAndScale(prev);
            vec4 displacedPosScreen = posScreen;

            displacedPosScreen.xy = displace(posScreen.xy, prevScreen.xy, screenMarkerSize);
            ${g(t===P.Screen,c`
                vec2 displacementDirU = perpendicular(normalizedSegment(posScreen.xy, prevScreen.xy));

                // We need three points of the ribbon line in camera space to calculate the plane it lies in
                // Note that we approximate the third point, since we have no information about the join around prev
                vec3 lineRight = inverseProject(posScreen + lineWidth * vec4(displacementDirU.xy, 0.0, 0.0));
                vec3 lineLeft = pos.xyz + (pos.xyz - lineRight);

                pos = toFront(displacedPosScreen, lineLeft, lineRight, prev.xyz, lineWidth);
                displacedPosScreen = projectAndScale(pos);`)}`}
      forwardViewPosDepth(pos.xyz);
      // Convert back into NDC
      displacedPosScreen.xy = (displacedPosScreen.xy / viewport.zw) * displacedPosScreen.w;

      // Convert texture coordinate into [0,1]
      vUV = (uv0 + 1.0) / 2.0;
      ${g(!m,"vUV *= displacedPosScreen.w;")}
      ${g(T,"vLineWidth = lineWidth;")}

      vSize = screenMarkerSize;
      vColor = getColor();

      // Use camera space for slicing
      vpos = pos.xyz;

      gl_Position = displacedPosScreen;
    }`),e.fragment.include(ce,l),e.include(le,l),d.uniforms.add(new pe("intrinsicColor",o=>o.color),new de("tex",o=>o.markerTexture)),d.include(he),d.constants.add("texelSize","float",1/k),d.code.add(c`float markerAlpha(vec2 samplePos) {
samplePos += vec2(0.5, -0.5) * texelSize;
float sdf = rgbaTofloat(texture(tex, samplePos)) - 0.5;
float distance = sdf * vSize;
distance -= 0.5;
return clamp(0.5 - distance, 0.0, 1.0);
}`),T&&d.constants.add("relativeMarkerSize","float",ve/k).constants.add("relativeTipLineWidth","float",ue).code.add(c`
    float tipAlpha(vec2 samplePos) {
      // Convert coordinates s.t. they are in pixels and relative to the tip of an arrow marker
      samplePos -= vec2(0.5, 0.5 + 0.5 * relativeMarkerSize);
      samplePos *= vSize;

      float halfMarkerSize = 0.5 * relativeMarkerSize * vSize;
      float halfTipLineWidth = 0.5 * max(1.0, relativeTipLineWidth * vLineWidth);

      ${g(m,"halfTipLineWidth *= fwidth(samplePos.y);")}

      float distance = max(abs(samplePos.x) - halfMarkerSize, abs(samplePos.y) - halfTipLineWidth);
      return clamp(0.5 - distance, 0.0, 1.0);
    }
  `),e.include(me,l),d.main.add(c`
    discardBySlice(vpos);
    discardByTerrainDepth();

    vec4 finalColor = intrinsicColor * vColor;

    // Cancel out perspective correct interpolation if in screen space or draped
    vec2 samplePos = vUV ${g(!m,"* gl_FragCoord.w")};
    finalColor.a *= ${T?"max(markerAlpha(samplePos), tipAlpha(samplePos))":"markerAlpha(samplePos)"};
    outputColorHighlightOID(finalColor, vpos);`),e}const ke=Object.freeze(Object.defineProperty({__proto__:null,build:be},Symbol.toStringTag,{value:"Module"}));class Ue extends fe{constructor(e,t){super(e,t,new Se(ke,()=>Te(()=>import("./LineMarker.glsl-LNMjeAQJ.js"),__vite__mapDeps([0,1,2]))),Y)}_makePipelineState(e,t){const{output:p,oitPass:T,space:m,hasOccludees:i}=e;return y({blending:q(p)?ge(T):null,depthTest:m===P.Draped?null:{func:Pe(T)},depthWrite:_e(e),drawBuffers:p===I.Depth?{buffers:[Oe.NONE]}:Ae(T,p),colorWrite:x,stencilWrite:i?U:null,stencilTest:i?t?W:Ee:null,polygonOffset:{factor:0,units:-10}})}initializePipeline(e){return e.occluder?(this._occluderPipelineTransparent=y({blending:M,depthTest:j,depthWrite:null,colorWrite:x,stencilWrite:null,stencilTest:we}),this._occluderPipelineOpaque=y({blending:M,depthTest:j,depthWrite:null,colorWrite:x,stencilWrite:ye,stencilTest:Re}),this._occluderPipelineMaskWrite=y({blending:null,depthTest:xe,depthWrite:null,colorWrite:null,stencilWrite:U,stencilTest:W})):this._occluderPipelineTransparent=this._occluderPipelineOpaque=this._occluderPipelineMaskWrite=null,this._occludeePipelineState=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t){return e?this._occludeePipelineState:t===S.TRANSPARENT_OCCLUDER_MATERIAL?this._occluderPipelineTransparent??super.getPipeline():t===S.OCCLUDER_MATERIAL?this._occluderPipelineOpaque??super.getPipeline():this._occluderPipelineMaskWrite??super.getPipeline()}}const Y=new Map([[r.POSITION,0],[r.PREVPOSITION,1],[r.UV0,2],[r.NORMAL,3],[r.COLOR,4],[r.COLORFEATUREATTRIBUTE,4],[r.SIZE,5],[r.SIZEFEATUREATTRIBUTE,5],[r.OPACITYFEATUREATTRIBUTE,6]]);class He extends $e{constructor(e){super(e,Me),this._configuration=new qe,this.vertexAttributeLocations=Y,this.produces=new Map([[S.OPAQUE_MATERIAL,t=>t===I.Highlight||$(t)&&this.parameters.renderOccluded===R.OccludeAndTransparentStencil],[S.OPAQUE_MATERIAL_WITHOUT_NORMALS,t=>Ie(t)],[S.OCCLUDER_MATERIAL,t=>F(t)&&this.parameters.renderOccluded===R.OccludeAndTransparentStencil],[S.TRANSPARENT_OCCLUDER_MATERIAL,t=>F(t)&&this.parameters.renderOccluded===R.OccludeAndTransparentStencil],[S.TRANSPARENT_MATERIAL,t=>$(t)&&this.parameters.writeDepth],[S.TRANSPARENT_MATERIAL_WITHOUT_DEPTH,t=>$(t)&&!this.parameters.writeDepth],[S.DRAPED_MATERIAL,t=>q(t)||t===I.Highlight]]),this._layout=this.createLayout()}getConfiguration(e,t){return this._configuration.output=e,this._configuration.space=t.slot===S.DRAPED_MATERIAL?P.Draped:this.parameters.worldSpace?P.World:P.Screen,this._configuration.hideOnShortSegments=this.parameters.hideOnShortSegments,this._configuration.hasCap=this.parameters.cap!==G.BUTT,this._configuration.anchor=this.parameters.anchor,this._configuration.hasTip=this.parameters.hasTip,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasOccludees=t.hasOccludees,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.vvOpacity=!!this.parameters.vvOpacity,this._configuration.occluder=this.parameters.renderOccluded===R.OccludeAndTransparentStencil,this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest&&q(e),this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration}get visible(){return this.parameters.color[3]>=ze}intersect(){}createLayout(){const e=Ce().vec3f(r.POSITION).vec3f(r.PREVPOSITION).vec2f(r.UV0);return this.parameters.worldSpace&&e.vec3f(r.NORMAL),this.parameters.vvSize?e.f32(r.SIZEFEATUREATTRIBUTE):e.f32(r.SIZE),this.parameters.vvColor?e.f32(r.COLORFEATUREATTRIBUTE):e.vec4f(r.COLOR),this.parameters.vvOpacity&&e.f32(r.OPACITYFEATUREATTRIBUTE),e}createBufferWriter(){return new je(this._layout,this.parameters)}createGLMaterial(e){return new We(e)}}class We extends De{constructor(){super(...arguments),this._markerPrimitive=null}dispose(){super.dispose(),this._markerTextures.release(this._markerPrimitive),this._markerPrimitive=null}beginSlot(e){const t=this._material.parameters.markerPrimitive;return t!==this._markerPrimitive&&(this._material.setParameters({markerTexture:this._markerTextures.swap(t,this._markerPrimitive)}),this._markerPrimitive=t),this._material.setParameters(this.textureBindParameters),this.getTechnique(Ue,e)}}class Me extends Le{constructor(){super(...arguments),this.width=0,this.color=[1,1,1,1],this.markerPrimitive="arrow",this.placement="end",this.cap=G.BUTT,this.anchor=H.Center,this.hasTip=!1,this.worldSpace=!1,this.hideOnShortSegments=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.markerTexture=null}}class je{constructor(e,t){this.vertexBufferLayout=e,this._parameters=t}elementCount(){return this._parameters.placement==="begin-end"?12:6}write(e,t,p,T,m,i){const d=p.get(r.POSITION).data,h=d.length/3;let o=[1,0,0];const z=p.get(r.NORMAL);this._parameters.worldSpace&&z!=null&&(o=z.data);let C=1,D=0;this._parameters.vvSize?D=p.get(r.SIZEFEATUREATTRIBUTE).data[0]:p.has(r.SIZE)&&(C=p.get(r.SIZE).data[0]);let _=[1,1,1,1],L=0;this._parameters.vvColor?L=p.get(r.COLORFEATUREATTRIBUTE).data[0]:p.has(r.COLOR)&&(_=p.get(r.COLOR).data);let N=0;this._parameters.vvOpacity&&(N=p.get(r.OPACITYFEATUREATTRIBUTE).data[0]);const a=new Float32Array(m.buffer);let s=i*(this.vertexBufferLayout.stride/4);const O=(n,A,v,u)=>{if(a[s++]=n[0],a[s++]=n[1],a[s++]=n[2],a[s++]=A[0],a[s++]=A[1],a[s++]=A[2],a[s++]=v[0],a[s++]=v[1],this._parameters.worldSpace&&(a[s++]=o[0],a[s++]=o[1],a[s++]=o[2]),this._parameters.vvSize?a[s++]=D:a[s++]=C,this._parameters.vvColor)a[s++]=L;else{const f=Math.min(4*u,_.length-4);a[s++]=_[f],a[s++]=_[f+1],a[s++]=_[f+2],a[s++]=_[f+3]}this._parameters.vvOpacity&&(a[s++]=N)};let E;(function(n){n[n.ASCENDING=1]="ASCENDING",n[n.DESCENDING=-1]="DESCENDING"})(E||(E={}));const b=(n,A)=>{const v=B(Fe,d[3*n],d[3*n+1],d[3*n+2]),u=Be;let f=n+A;do B(u,d[3*f],d[3*f+1],d[3*f+2]),f+=A;while(Ne(v,u)&&f>=0&&f<h);e&&(V(v,v,e),V(u,u,e)),O(v,u,[-1,-1],n),O(v,u,[1,-1],n),O(v,u,[1,1],n),O(v,u,[-1,-1],n),O(v,u,[1,1],n),O(v,u,[-1,1],n)},w=this._parameters.placement;w!=="begin"&&w!=="begin-end"||b(0,E.ASCENDING),w!=="end"&&w!=="begin-end"||b(h-1,E.DESCENDING)}}const Fe=Z(),Be=Z();export{be as L,He as S};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/LineMarker.glsl-LNMjeAQJ.js","assets/index-BxBRPJgz.js","assets/index-69fO1gDf.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}