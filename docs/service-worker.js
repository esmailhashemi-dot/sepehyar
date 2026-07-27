/* =================================
   Sepehyar v1.0.2
   Service Worker
================================= */


const CACHE_NAME = "sepehyar-v1.0.2";



const APP_FILES = [

"./",

"./index.html",

"./calculator.html",

"./customers.html",

"./dashboard.html",

"./settings.html",

"./contact.html",

"./style.css",

"./app.js",

"./manifest.json"

];





// نصب اولیه

self.addEventListener(
"install",

event => {


event.waitUntil(

caches.open(CACHE_NAME)

.then(cache => {


return cache.addAll(APP_FILES);


})


);


self.skipWaiting();


});







// فعال‌سازی و حذف نسخه‌های قدیمی

self.addEventListener(
"activate",

event => {


event.waitUntil(


caches.keys()

.then(keys =>{


return Promise.all(

keys.map(key=>{


if(key !== CACHE_NAME){

return caches.delete(key);

}


})


);


})


);


self.clients.claim();


});







// دریافت فایل‌ها

self.addEventListener(
"fetch",

event => {


event.respondWith(


caches.match(event.request)

.then(response=>{


return response ||

fetch(event.request)

.then(networkResponse=>{


return networkResponse;


});


})


);


});