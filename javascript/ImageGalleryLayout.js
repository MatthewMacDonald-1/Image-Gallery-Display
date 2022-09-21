"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * An image gallery layout class.
 * @author Matthew MacDonald https://github.com/MatthewMacDonald-1
 */
class ImageGalleryLayout {
  // Config

  /** Image margin in px */

  /** Image max target height in pixels */

  /** Image min target height in pixels */

  /** Max image height in terms of percentage of view port height */

  /**
   * Make a new image gallery
   * @param images List of images for gallery
   * @param parentElement Image gallery's parent (if null is set to document.body)
   */
  constructor(images, parentElement) {
    _defineProperty(this, "imageMargin", 3);

    _defineProperty(this, "imageMaxTargetHeight", 500);

    _defineProperty(this, "imageMinTargetHeight", 375);

    _defineProperty(this, "absolutMaxImageHeight", 0.8);

    _defineProperty(this, "hasBeenGenerated", false);

    this.images = images;
    if (parentElement == null) parentElement = document.body;
    this.parentElement = parentElement;
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    this.GalleryId = "_";

    for (let i = 0; i < 30; i++) {
      this.GalleryId += chars.charAt(Math.floor(Math.random() * chars.length - 1));
    }

    this.GalleryId += "_";
  }

  /**
   * Generates the image gallery in the parent element
   */
  loadIntoElement() {
    if (this.hasBeenGenerated) return;
    this.parentElement.innerHTML = this.generateGalleryHTML(); // put in HTML

    this.resizeGalleryImages(); // resize images to fit
  }
  /**
   * Resize the images in the gallery to fit page
   * @param offset This is used mainly of the first call where the images end up consitently about 16px short of the width
   */


  resizeGalleryImages() {
    let parentWidth = this.parentElement.getBoundingClientRect().width;
    let viewPortHeight = window.innerHeight;

    let i = 0;

    while (i < this.images.length) {
      let fitsBounds = false;
      let selectedImages = [];
      let j = i;
      let adjustedWidthPercent = 1;

      while (!fitsBounds) {
        selectedImages.push(this.images[j]); // add image

        selectedImages.forEach(element => {
          // adjust to a preset hieght for all images
          let scaleBy = 1000 / element.getHeight();
          element.setHeight(Math.floor(element.getHeight() * scaleBy));
          element.setWidth(Math.floor(element.getWidth() * scaleBy));
        });
        let parentWidthAdjustedForMargin = Math.floor(parentWidth - 2 * this.imageMargin * selectedImages.length);
        adjustedWidthPercent = parentWidthAdjustedForMargin / this.sumWidthOfImages(selectedImages);

        if (Math.floor(this.images[i].getHeight() * adjustedWidthPercent) <= (viewPortHeight * this.absolutMaxImageHeight < this.imageMaxTargetHeight + 150 ? viewPortHeight * this.absolutMaxImageHeight : this.imageMaxTargetHeight) && Math.floor(this.images[i].getHeight() * adjustedWidthPercent) >= this.imageMinTargetHeight) {
          fitsBounds = true;
        } else if (i + (j - i) + 1 >= this.images.length) {
          fitsBounds = true; // it doesn't but otherwise the loop could go on infinitly
        } else if (Math.floor(this.images[i].getWidth() * adjustedWidthPercent) <= this.imageMinTargetHeight) {
          fitsBounds = true;
        } else {
          j++;
        }
      }

      for (let k = 0; k < selectedImages.length; k++) {
        let element = document.getElementById(this.GalleryId + (i + k));

        if (element != null) {
          element.style.width = Math.floor(adjustedWidthPercent * selectedImages[k].getWidth()) + "px";
          element.style.height = Math.floor(adjustedWidthPercent * selectedImages[k].getHeight()) + "px";

          if (k == 0 && i == this.images.length - 1 && Math.floor(adjustedWidthPercent * selectedImages[k].getWidth()) >= parentWidth - 2 * this.imageMargin) {
            element.style.maxHeight = this.imageMaxTargetHeight + "px";
            element.style.width = "auto";
            element.style.display = "block";
            element.style.margin = "0 auto";
          }
        } else {
          break;
        }
      }

      i += selectedImages.length;
    }
  }
  /** 
   * Sums the width of images passed to the function
   * @param images
   */


  sumWidthOfImages(images) {
    let sum = 0;
    images.forEach(element => {
      sum += element.getWidth();
    });
    return sum;
  }
  /**
   * Generates the HTML for all the images
   * @returns The HTML as a string
   */


  generateGalleryHTML() {
    let code = "";

    for (let i = 0; i < this.images.length; i++) {
      code += this.generateImageHTML(this.images[i], this.GalleryId + i);
    }

    return code;
  }
  /**
   * Generates HTML for individual images
   * @param imageData The images data
   * @param id The images unique id made from the galleryId and the image's index in images
   * @returns The HTML for individual images as a string
   */


  generateImageHTML(imageData, id) {
    return '<img src="' + imageData.getUrl() + '" title="' + imageData.getTitle() + '" alt="' + imageData.getAltText() + '" id="' + id + '">';
  }

}
/**
 * Class to hold image information
 */


class ImageDataStruct {
  /**
   * Create image data
   * @param title Image title
   * @param alt Image alternate text
   * @param width The width in pixels of the image source
   * @param height The height in pixels of the image source
   * @param url The absolute url of the image
   */
  constructor(title, altText, width, height, url) {
    this.title = title;
    this.altText = altText;
    this.width = width;
    this.height = height;
    this.url = url;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  getAltText() {
    return this.altText;
  }

  setAltText(altText) {
    this.altText = altText;
  }

  getUrl() {
    return this.url;
  }

  setUrl(url) {
    this.url = url;
  }

  getWidth() {
    return this.width;
  }

  setWidth(width) {
    this.width = width;
  }

  getHeight() {
    return this.height;
  }

  setHeight(height) {
    this.height = height;
  }

}