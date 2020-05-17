
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})


var a = document.querySelectorAll('#linkmenu');
var cbox = document.querySelector('#openSidebarMenu');
for (i = 0; i < a.length; i++) {
a[i].addEventListener('click',function(){
  cbox.checked = false;

})};

function submitForm() {
  // Get the first form with the name
  // Usually the form name is not repeated
  // but duplicate names are possible in HTML
  // Therefore to work around the issue, enforce the correct index
  var frm = document.getElementsByTagName("FORM");

  frm.submit(); // Submit the form
  frm.reset(); // Reset all form data
  return false;
}
function myFunction() {
  let page = document.body.scrollTop;
  if (page >= 300) {
    document.querySelector(".itemactive").classList.add("scroll");
  } else {
    document.querySelector(".itemactive").classList.remove("scroll");
  }
}
setInterval(() => {
  window.addEventListener("scroll", myFunction());
}, 100);
/*var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
console.log("s");*/
