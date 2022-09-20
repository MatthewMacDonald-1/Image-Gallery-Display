"use strict";

/** Some images */
let images = [new ImageDataStruct("Seal (Pixabay)", "Seal (Pixabay)", 960, 720, "https://cdn.pixabay.com/photo/2022/09/05/10/36/grey-seal-7433843_960_720.jpg"), new ImageDataStruct("Path (Pixabay)", "Path (Pixabay)", 960, 640, "https://cdn.pixabay.com/photo/2019/07/16/16/41/path-4342242_960_720.jpg"), new ImageDataStruct("Ribblehead Viaduct (Pixabay)", "Ribblehead Viaduct (Pixabay)", 960, 355, "https://cdn.pixabay.com/photo/2017/06/26/08/43/ribblehead-viaduct-2443085_960_720.jpg"), new ImageDataStruct("Bridge (Pixabay)", "Bridge (Pixabay)", 960, 640, "https://cdn.pixabay.com/photo/2013/10/09/02/26/bridge-192982_960_720.jpg")];
/** Reference to HTML Element */

let galleryElement = document.getElementById("gallery_demo");
/** ImageGalleryLayout reference */

let imageGallery = new ImageGalleryLayout(images, galleryElement);
imageGallery.loadIntoElement();
/** Call this function from the onresize attribute in the body tag of the HTML */

function forResizeCall() {
  imageGallery.resizeGalleryImages();
}