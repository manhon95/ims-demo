import{cd as o,ce as a,cs as r,ct as T,cu as n,a_ as c,cf as l}from"./index-bAmN2aA2.js";/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const f=o(class extends a{constructor(e){if(super(e),e.type!==r.PROPERTY&&e.type!==r.ATTRIBUTE&&e.type!==r.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!T(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===n||t===c)return t;const s=e.element,i=e.name;if(e.type===r.PROPERTY){if(t===s[i])return n}else if(e.type===r.BOOLEAN_ATTRIBUTE){if(!!t===s.hasAttribute(i))return n}else if(e.type===r.ATTRIBUTE&&s.getAttribute(i)===t+"")return n;return l(e),t}});export{f as l};
