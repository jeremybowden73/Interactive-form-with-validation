// select all elements with class="hideIfJavaScriptEnabled"
const hideIfJavaScriptEnabled = document.getElementsByClassName(
  "hideIfJavaScriptEnabled"
);
// hide them all by setting display to "none"
Array.prototype.forEach.call(hideIfJavaScriptEnabled, function(eachElement) {
  eachElement.style.display = "none";
});
