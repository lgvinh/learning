const headerAnimation = () => {
    let header = document.getElementsByTagName("header")[0],
        hiddenImg = document.getElementById("hidden-img"),
        headerContent = document.getElementsByClassName("header-content"),
        body = document.body,
        iconMenu = document.getElementById("icon-menu-mobile"),
        darkBg = document.getElementById("dark-bg"),
        mobileMenu = document.getElementById("mobile-menu"),
        cart = document.getElementsByClassName("shopping-cart");

    let scrollPosition = 0;

    let headerAnimate = () => {
        if ( window.scrollY > 50 && body.offsetWidth > 1023 ) {
          header.style.top = '-50px';
          hiddenImg.style.cssText = (
            `opacity: 1;
            pointer-events: initial;`
          );
          headerContent[0].style.cssText = (
            `opacity: 0;
            pointer-events: none;`
          );
        } else {
          header.style.cssText = "";
          hiddenImg.style.cssText = (
            `opacity: 0;
            pointer-events: none;`
          );
          headerContent[0].style.cssText = (
            `opacity: 1;
            pointer-events: initial;`
          );
        }
    }

    let hamburgerMenu = () => {
      if ( iconMenu.className === "show" ) {
        setTimeout(() => {
          iconMenu.className = "";
          darkBg.className = "";
          mobileMenu.className = "";
        }, 50);
      } else {
        scrollPosition = window.scrollY;
        iconMenu.className = "show";
        darkBg.className = "show";
        mobileMenu.className = "show";
      }
    }

    window.addEventListener("scroll", e => {
      if ( iconMenu.className === "show" ) {
        window.scrollTo(0, scrollPosition);
      } else {
        headerAnimate();
      }
    });
    window.addEventListener("resize", () => {
      headerAnimate();
      if ( iconMenu.className === "show" && body.offsetWidth > 1023 ) {
        iconMenu.className = "";
        darkBg.className = "";
        mobileMenu.className = "";
      } else {
        setTimeout(() => {
          mobileMenu.style.top = header.offsetHeight + "px";
        }, 500);
      }
    });
    header.addEventListener("mouseover", () => {
      if ( window.scrollY !== 0 && body.offsetWidth > 1023 ) {
        header.style.top = 0;
        headerContent[0].style.cssText = (
          `opacity: 1;
          pointer-events: initial;`
        );
        hiddenImg.style.cssText = (
          `opacity: 0;
          pointer-events: none;`
        );
      }
    });
    header.addEventListener("mouseout", () => {
      if ( header.style.top === "0px" && window.scrollY !== 0 && body.offsetWidth > 1023 ) {
        header.style.top = "-50px";
        headerContent[0].style.cssText = (
          `opacity: 0;
          pointer-events: none;`
        );
        hiddenImg.style.cssText = (
          `opacity: 1;
          pointer-events: initial;`
        );
      }
    });

    iconMenu.addEventListener("click", () => hamburgerMenu());
    darkBg.addEventListener("click", () => hamburgerMenu());
    darkBg.addEventListener("touchend", () => hamburgerMenu());
    mobileMenu.style.top = header.offsetHeight + "px";

    window.onload = () => {
      if ( body.offsetWidth > 1023 ) {
        if ( cart[0].className.replace("shopping-cart ", "") !== "show" )
          cart[0].className += " show";
      }
    };

    window.onresize = () => {
      if ( body.offsetWidth <= 1023 ) {
        if ( cart[0].className.replace("shopping-cart ", "") === "show" )
          cart[0].className = cart[0].className.replace(" show", "");
      } else {
        if ( cart[0].className.replace("shopping-cart ", "") !== "show" )
          cart[0].className += " show";
      }
    }
  }

  export default headerAnimation;