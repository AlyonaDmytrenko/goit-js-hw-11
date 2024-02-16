import{i as l,S as f}from"./assets/vendor-5b791d57.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();function m(){const u=document.getElementById("searchForm"),n=document.getElementById("searchInput"),s=document.getElementById("loader"),i=document.getElementById("gallery");u.addEventListener("submit",function(r){r.preventDefault();const a=n.value.trim();if(a===""){l.error({title:"Error",message:"Please enter a search query"});return}s.style.display="block",i.innerHTML="",e(a)});function e(r){const c=`https://pixabay.com/api/?key=42375067-5abc1b4a099550ffbb458c60e&q=${r}&image_type=photo&orientation=horizontal&safesearch=true`;fetch(c).then(o=>{if(!o.ok)throw new Error("Network response was not ok");return o.json()}).then(o=>{s.style.display="none",o.hits.length===0?l.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}):t(o.hits)}).catch(o=>{s.style.display="none",l.error({title:"Error",message:o.message})})}function t(r){const a=r.map(c=>`
    <a href="${c.largeImageURL}" data-lightbox="gallery">
      <img src="${c.webformatURL}" alt="${c.tags}">
    </a>
  `).join("");i.innerHTML=a,f.refresh()}}m();
//# sourceMappingURL=commonHelpers.js.map