module.exports = {  
  // Choose Size function
  chooseSizes: (event) => {
    var i, sizes;
    
    // Get all classes size
    sizes = document.getElementsByClassName("size");

    // Remove all active class in sizes
    for(i = 0; i < sizes.length; i++) {
      sizes[i].className = sizes[i].className.replace(" active", "");
    }
    
    // Add class active into object
    event.currentTarget.className += " active";
  },
  //--------------------------------
  // Tab link function
  changeTabs : (event, idName) => {
    const tab = document.getElementsByClassName(event.currentTarget.className.replace(" active", ""));
    for (let i = 0; i < tab.length; i++) {
      tab[i].className = tab[i].className.replace(" active", "");
    }
    event.currentTarget.className += " active";
    
    const content = document.getElementsByClassName("tab-content");
    for (let i = 0; i < content.length; i++) {
      if(content[i].className.replace("tab-content ","") !== "hide") {
        content[i].className += " hide";
      }
    }
    document.getElementById(idName).className = document.getElementById(idName).className.replace(" hide", "");
  },
  //--------------------------------
  // Quantity input
  quantityFunc : (e) => {
    const btn = e.currentTarget;
    const quan = document.getElementsByClassName("quantity")[0];
    if(btn.className.replace("button ", "") === "dec") {
      if(!isNaN(Number(quan.value)) && quan.value !== "") {
        if(quan.value > 1)
          quan.value -= 1;
        else quan.value = 1;
      } else {
        quan.value = "1";
      }
    } else if(btn.className.replace("button ", "") === "inc") {
      if(!isNaN(Number(quan.value)) && quan.value !== "") {
        if(quan.value >= 1)
          quan.value = Number(quan.value) + 1;
        else quan.value = 1;
      } else {
        quan.value = "1";
      }
    }
  },
  //--------------------------------
  // getScrollPosition: () => {
  //   const main = document.getElementsByClassName("container");
  //   const prod = document.getElementsByClassName("product");
  //   const docEl = document.documentElement;
  //   document.body.onscroll = () => {
  //     // Set the scroll event
  //     if(docEl.scrollTop >= 200) {
  //       // Loop Element Product
  //       for(let i = 0; i < prod.length; i++) {
  //         // Check if display none
  //         if(prod[i].className.replace("product ", "") === "d-none") {
  //           console.log(prod[i])
  //           prod[i].className = prod[i].className.replace(" d-none ", "");
  //           // prod[i].animate([
  //           //   {top: "150px", filter: "blur(30px)"},
  //           //   {top: "0", filter: "blur(0)"}
  //           // ], 500)
  //         }

  //       }
  //     }
  //   }
    
    
  // }
}
