const cursorAnimation = () => {
  const cursor = document.querySelector(".cursor");
  let mouseX = 0,
      mouseY = 0;

  const setCursorAtt = () => cursor.setAttribute("style", "top: " + (mouseY - 15) + "px; left: " + (mouseX - 15) + "px");
  const setCordinate = (x, y) => {
    mouseX = x;
    mouseY = y;
    setCursorAtt();
  }
  
  if ( cursor ) {
    window.addEventListener("mousemove", e => setCordinate(e.pageX, e.pageY));
    window.addEventListener("scroll", () => setCordinate(mouseX, mouseY + document.body.scrollTop));
  }
}

export default cursorAnimation;
