// Setting Box
const colorsLi = document.querySelectorAll(".colors-list li");
let mainColor = localStorage.getItem("color_option");
const landingPage = document.querySelector(".landing-page");
const randombg = document.querySelectorAll(".random-background span");
let bgOption = true;
let bgInterval;
let bgLocalItem = localStorage.getItem("bg_option");

// Make Gear Spin when click on it
document.querySelector(".setting-box .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");

  // Open Setting Box when click on Gear Icon
  document.querySelector(".setting-box").classList.toggle("open");
};

// Make list appear when click on it
document.querySelector(".bi-list").onclick = function () {
  document.querySelector(".offcanvas-end").classList.toggle("open-list");
};

// Create Handle event function
function HandleEvent(ev) {
  // remove active class from all list items
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add active class to selected list item
  ev.target.classList.add("active");
}

//  save colors in local storage
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  // remove active from all list items
  colorsLi.forEach((element) => {
    element.classList.remove("active");

    // add active to selected list item
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

//  save bg settings in local storage
if (bgLocalItem !== null) {
  if (bgLocalItem === "true") {
    bgOption = true;
  } else {
    bgOption = false;
  }

  // remove active class from all spans
  randombg.forEach((element) => {
    element.classList.remove("active");
  });

  // add active class to selected span
  if (bgLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

// Switch Colors using with Local Storage
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color_option", e.target.dataset.color);

    HandleEvent(e);
  });
});

randombg.forEach((span) => {
  span.addEventListener("click", (e) => {
    HandleEvent(e);

    if (e.target.dataset.bg === "yes") {
      bgOption = true;
      randomizebg();
      localStorage.setItem("bg_option", true);
    } else {
      bgOption = false;
      clearInterval(bgInterval);
      localStorage.setItem("bg_option", false);
    }
  });
});

// Get array of imgs
const imgsArr = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomizebg() {
  if (bgOption === true) {
    bgInterval = setInterval(() => {
      // Generate random number to swich bg randomly
      let ranNum = Math.floor(Math.random() * imgsArr.length);
      landingPage.style.backgroundImage =
        'url("../imgs/' + imgsArr[ranNum] + '")';
    }, 10000);
  }
}

// reset options
document.querySelector(".reset").onclick = function () {
  // clear all data in local storage
  localStorage.clear();

  // if i have data another colors and bg (remove items only)
  // localStorage.removeItem("color_option");
  // localStorage.removeItem("bg_option");

  // reload page
  window.location.reload();
};

// Trasition the progress when i reached My Skills section
const ourSkills = document.querySelector(".skills");
const allskills = document.querySelectorAll(".skills .skill-progress span");

window.onscroll = function () {
  let skillTop = ourSkills.offsetTop;
  let skillHeight = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;
  let windowScorll = this.pageYOffset;

  if (windowScorll >= skillTop + skillHeight - windowHeight) {
    allskills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create popup box
let ourGallery = document.querySelectorAll(".portfolio img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay
    let overlay = document.createElement("div");

    // add class name to overlay
    overlay.className = "popup-overlay";

    // add overlay to body
    document.body.appendChild(overlay);

    // create popup box
    let popupBox = document.createElement("div");

    // add class to popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3");

      // create text
      let imgText = document.createTextNode(img.alt);

      // add text to heading
      imgHeading.appendChild(imgText);

      // add imgHeading to popup box
      popupBox.appendChild(imgHeading);
    }

    // create img
    let popupImg = document.createElement("img");

    // set img source
    popupImg.src = img.src;

    // add popup img to popup box
    popupBox.appendChild(popupImg);

    // add popup box to body
    document.body.appendChild(popupBox);

    // close span
    let closeButton = document.createElement("span");

    // create span text
    let closeButtonText = document.createTextNode("X");

    // add close button text to close span
    closeButton.appendChild(closeButtonText);

    closeButton.className = "close-button";

    // add close button to popup box
    popupBox.appendChild(closeButton);
  });
});

// close popup
document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    // remove popup box
    e.target.parentNode.remove();
    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});
