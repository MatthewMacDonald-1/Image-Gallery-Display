# Image Gallery Layout
This is a template for my image gallery layout for HTML websites written in TypeScript and compiled to JavaScript using [Babel](https://babeljs.io/).

![Preview of image gallery](media/preview.png)

## Known bugs
- Images aren't initially scaled across the width of the page when first loaded. Although this isn't a problem when the page is resized. This cuased by an incorrect value being returned by ```this.parentElement.getBoundingClientRect().width``` on line 57 in the intitial call of the ```loadIntoElement()``` function.
