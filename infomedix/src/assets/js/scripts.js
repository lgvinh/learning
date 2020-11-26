new WOW().init();

let submenu = document.getElementsByClassName("have-submenu"),
    submenuMobile = document.getElementsByClassName("have-submenu-mobile"),
    submenuMobileMenu = document.getElementsByClassName("submenu-mobile");

let iconMobile = document.getElementById("icon-mobile"),
    html = document.documentElement,
    mobileMenu = document.getElementById("mobile-menu"),
    darkBg = document.getElementById("dark-bg");
for ( let item of submenu ) {
  item.addEventListener("click", function(e) {
    let { currentTarget } = e;
    if ( currentTarget.className.replace("have-submenu", "") !== " show" ) {
      for ( let item of submenu ) {
        item.className = item.className.replace(" show", "");
      }
      currentTarget.className += " show";
    } else {
      for ( let item of submenu ) {
        item.className = item.className.replace(" show", "");
      }
      currentTarget.className = currentTarget.className.replace(" show", "");
    }
  });
  item.parentElement.addEventListener("mouseover", () => {
    darkBg.className = "show";
  });
  item.parentElement.addEventListener("mouseout", () => {
    darkBg.className = "";
  })
}

for ( let item of submenuMobile) {
  item.parentElement.addEventListener("click", () => {
    if ( item.className.replace("have-submenu-mobile", "") === "" ) {
      for ( let i = 0; i < submenuMobile.length -1; i++) {
        submenuMobile[i].className = submenuMobile[i].className.replace(" show", "");
      }
      item.className += " show";
    }
    else item.className = item.className.replace(" show", "");
  });
}


function slickHandle() {
  var contentBox = $(".have-slider");
  if ( document.body.offsetWidth < 1024 ) {
    contentBox.not('.slick-initialized').slick({
      dots: true,
      arrows : false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      centerMode: true,
      slidesToShow: 1,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 578,
          settings: {
            variableWidth: true,
            // centerPadding: '60px'
          }
        }
      ]
    });
  } else {
    if ( contentBox.hasClass("slick-slider") ) {
      contentBox.slick("unslick")
    }
  }
}
window.onresize = function() {
  if ( document.body.offsetWidth < 1024 ) {
    for ( let item of submenu ) {
      item.className = item.className.replace(" show", "");
    }
    slickHandle();
  } else {
    iconMobile.className = "";
    mobileMenu.className = "";
    html.className = "";
    slickHandle();
  }
}

window.onload = function() {
  if ( document.body.offsetWidth < 1024 ) {
    slickHandle();
  } else {
    slickHandle();
  }
}

iconMobile.onclick = function() {
  if ( mobileMenu.className !== "show" ) {
    iconMobile.className = "show";
    html.className = "disable";
    mobileMenu.className = "show";
  } else {
    iconMobile.className = "";
    mobileMenu.className = "";
    html.className = "";
  }
}