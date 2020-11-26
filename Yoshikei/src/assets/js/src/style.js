var sliderIndex= 1;
showSlide(sliderIndex);

function plusDiv(n) {
  showSlide(sliderIndex+=n);
}

function showSlide(n) {
  var i;
  var x= document.getElementsByClassName("mySlider");
  if (n > x.length) {sliderIndex = 1};
  if (n < 1) {sliderIndex = x.length}
  for (i=0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[sliderIndex-1].style.display= "block";
}

/* auto change slide */
function carousel() {
  var i;
  var x= document.getElementsByClassName("mySlider");
  for(i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  sliderIndex++;
  if (n > x.length) {sliderIndex = 1};
  x[sliderIndex-1].style.display= "block";
  setTimeout(carosuel, 2000);
}

function scrollFunction() {
  var scrollStep = -window.scrollY / (400 / 15),
  scrollInterval = setInterval ( function() {
    if ( window.scrollY != 0 ) {
      window.scrollBy( 0, scrollStep );
    }
    else clearInterval(scrollInterval); 
  },15);
}

function openTabs(evt, page) {
  // Declare variables
  var i, tabcontent, tablinks;

  // Get all elements with class="content" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove class="active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active","");
  }

  // Show the current tab, and add "active" class to the button opening the tab
  document.getElementById(page).style.display = "block";
  evt.currentTarget.className += " active";
}

function changeTabs(evt) {
  var i, tablinks, tabcontent;

  // Get all elements with class="tablinks"
  tablinks = document.getElementsByClassName("tablinks");

  // Get all elements with class="tabcontent"
  tabcontent = document.getElementsByClassName("content");

  // Get index of class="active"
  for (i = 0; i < tablinks.length; i++) {
    if (tablinks[i].className == "tablinks active") {
      index = i;
      break;
    }
  }

  // Previous button
  if (evt == "previous") {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    tabcontent[i].style.display = "none";
    if (i == 0) {i = tablinks.length}
    tablinks[i-1].className += " active"
    tabcontent[i-1].style.display = "block"
  }

  // Next button
  if (evt == "next") {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    tabcontent[i].style.display = "none";
    if (i == tablinks.length-1) {i = -1}
    tablinks[i+1].className += " active"
    tabcontent[i+1].style.display = "block"
  }
}