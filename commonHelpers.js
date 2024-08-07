import{S as f,i as d}from"./assets/vendor-8c59ed88.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&e(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();function m(n){return fetch(`https://pixabay.com/api/?key=45254861-458f9554e62e34626fe81458f&q=${n}&image_type=photo&orientation=horizontal&safesearch=true`).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()})}function p(n,s){const o=s.map(e=>`
      <a href="${e.largeImageURL}" class="gallery-item">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        <div class="info">
          <p>Likes: ${e.likes}</p>
          <p>Views: ${e.views}</p>
          <p>Comments: ${e.comments}</p>
          <p>Downloads: ${e.downloads}</p>
        </div>
      </a>
    `).join("");return n.insertAdjacentHTML("beforeend",o)}function a(n){n.innerHTML=""}const c=document.querySelector(".gallery");document.querySelector("#button");const h=document.querySelector("#input"),y=document.querySelector("#search-form"),u=document.querySelector(".loader");function g(){u.classList.add("is-visible")}function l(){u.classList.remove("is-visible")}const L=new f(".gallery a",{});y.addEventListener("submit",b);function b(n){n.preventDefault(),a(c);const s=h.value;g(),m(s).then(o=>{if(console.log(o),o.hits.length===0){d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),a(c),l();return}const e=o.hits;p(c,e),console.log(e),l(),L.refresh()}).catch(o=>{console.log(o),l()})}
//# sourceMappingURL=commonHelpers.js.map
