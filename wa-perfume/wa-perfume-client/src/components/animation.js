const inputAnimation = () => {
  var test = document.querySelectorAll(".c-input-eff");
  if ( test ) {
    test.forEach(function(item) {
      item.children[0].addEventListener("change", function() {
        let child = item.children;
        if(child[0].value !== "") {
          child[1].style.cssText = "top: -1px; color: #ee2d7a; font-size: 15px; font-weight: 700px";
        } else {
          child[1].style.cssText = "";
        }
      });
    });
  }
}

export default {
  inputAnimation
};