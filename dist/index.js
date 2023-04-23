'use strict';

var a = require('fs/promises');
var cheerio = require('cheerio');
var A = require('node-fetch');
var crypto = require('crypto');
var path = require('path');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var a__default = /*#__PURE__*/_interopDefault(a);
var A__default = /*#__PURE__*/_interopDefault(A);

var O=(t,e)=>{let r=crypto.createHash(e).update(t).digest().toString("base64");return `${e.toLowerCase()}-${r}`},w=t=>{let e=Buffer.alloc(t.byteLength),r=new Uint8Array(t);for(let l=0;l<e.length;++l)e[l]=r[l];return e},d=(t,e)=>e.map(r=>O(t,r)).join(" "),y=t=>e=>path.resolve(t,e),B=t=>t.replace(/\s+/g," ");var S=t=>{let e=t?.selectors??["script","link[rel=stylesheet]"],r=t?.hashAlgorithms??["sha512"],l=t?.crossOriginPolicy??"anonymous",x=t?.indexHtmlPath??"/",F=t?.manifestsPaths??["manifest.json"],b=t?.augmentManifest??!1,h=t?.filesToIgnore??[],f;return {name:"vite-tiptop-rsi",enforce:"post",apply:"build",buildStart:()=>{let c=r.filter(i=>["sha1","md5"].includes(i.toLowerCase()));for(let i of c)console.error(`Insecure Hashing algorithm ${i} provided.`);},writeBundle:async c=>{if(f=c.dir,!(f&&b))return;let i=y(f);for await(let s of F){let m=i(s),o=await a__default.default.readFile(m,"utf-8").then(JSON.parse,()=>{});if(o){for await(let n of Object.values(o)){let u=n.file;if(h.includes(u))continue;let g=await a__default.default.readFile(i(u));n.integrity=d(g,r);}await a__default.default.writeFile(m,JSON.stringify(o,null,2));}}},closeBundle:async()=>{if(!f)return;let c=`${f}/index.html`,i=await a__default.default.readFile(c),s=cheerio.load(i),m=s(e.join()).get();for await(let o of m){let n=(s(o).attr("href")||s(o).attr("src"))?.replace(x,"");if(!n||h.includes(n))continue;let u,g=`${f}/${n}`;if(await a__default.default.stat(g)){let p=await a__default.default.readFile(g);u=Buffer.from(p);}else if(n.startsWith("http")){let v=await(await A__default.default(n)).arrayBuffer();u=w(v);}else {console.warn(`Unable resolve resource: ${n}`);continue}let I=d(u,r);s(o).attr("integrity",I),s(o).attr("crossorigin",l);}await a__default.default.writeFile(c,B(s.html()));}}},N=S;

module.exports = N;
