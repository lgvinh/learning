let animation = () => {
  let header = document.getElementsByTagName("header")[0],
      body = document.body,
      arrowDown = document.getElementsByClassName("arrow-down"),
      mainBanner = document.getElementsByClassName("main-banner");


  let scrollDown = () => {
    if ( body.offsetWidth > 1023 ) {
      window.scroll({
        top: mainBanner[0].offsetHeight + header.offsetHeight - 49,
        behavior: "smooth"
      })
    } else {
      window.scroll({
        top: mainBanner[0].offsetHeight,
        behavior: "smooth"
      })
    }
  }

  if ( arrowDown && arrowDown.length > 0 ) {
    arrowDown[0].addEventListener("click", () => scrollDown());
    arrowDown[0].addEventListener("tounchend", () => scrollDown());
  }
}

export default animation;