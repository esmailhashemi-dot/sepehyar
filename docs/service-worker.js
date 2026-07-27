const CACHE_NAME = "sepehyar-v1.0";


const APP_FILES = [

"./",

"./index.html",

"./calculator.html",

"./customers.html",

"./dashboard.html",

"./settings.html",

"./contact.html",

"./style.css",

"./app.js"

];



self.addEventListener(
"install",
event => {

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache => {

return cache.addAll(APP_FILES);

})

);

});




self.addEventListener(
"activate",
event => {

event.waitUntil(

caches.keys()

.then(keys =>

Promise.all(

keys.map(key => {

if(key !== CACHE_NAME){

return caches.delete(key);

}

})

)

)

);

});




self.addEventListener(
"fetch",
event => {

event.respondWith(

caches.match(event.request)

.then(response => {

return response || fetch(event.request);

})

);

});