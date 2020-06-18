// https://github.com/YunYouJun/hexo-theme-yun
// function random(min, max) {
//   return Math.random() * (max - min) + min;
// }

// function generateBanner(title) {
//   let sumH = 0;
//   let lineTop = document.querySelector(".vertical-line-top");
//   let lineBottom = document.querySelector(".vertical-line-bottom");
//   for (let i = 0; i < title.length; i++) {
//     let charBox = document.createElement("div");
//     let rn = random(1.5, 3.5);
//     charBox.innerHTML = "<span class='char'>" + title[i] + "</span>";
//     let charSize = rn + "rem";
//     banner.insertBefore(charBox, lineBottom);
//     if (i % 2 == 0) {
//       charBox.classList.add("char-left");
//       charBox.style.setProperty("--banner-char-size", charSize);
//       charBox.style.animationName = "char-move-left";
//     } else {
//       charBox.classList.add("char-right");
//       charBox.style.setProperty("--banner-char-size", charSize);
//       charBox.style.animationName = "char-move-right";
//     }

//     sumH += rn;
//   }
//   let height = "calc(50vh - " + sumH / 2 + "rem)";
//   lineTop.style.setProperty("--banner-line-height", height);
//   lineBottom.style.setProperty("--banner-line-height", height);

//   // set animation name
//   lineTop.style.animationName = "extend-line";
//   lineBottom.style.animationName = "extend-line";
// }

// window.wheeling = false;
// window.addEventListener("wheel", function(e) {
//   if (window.banner) {
//     if (window.scrollY < banner.clientHeight && e.deltaY > 0 && !wheeling) {
//       wheeling = true;
//       window.scrollTo(0, banner.clientHeight);
//       setTimeout(function() {
//         wheeling = false;
//       }, 200);
//     }
//   }
// });

const generateBanner = () => {
  // let lineBottom = document.querySelector('.vertical-line-bottom')
  // let imgUrl = document.createElement('img')
  // imgUrl.src =
  //   'https://firebasestorage.googleapis.com/v0/b/pinboard-25.appspot.com/o/10.jpg?alt=media&token=238c5a33-ec89-4a9f-bd04-0f0285027952'
  // imgUrl.style.width = '100vw'

  // banner.insertBefore(imgUrl, lineBottom)
  banner.style.backgroundImage =
    "url('https://firebasestorage.googleapis.com/v0/b/pinboard-25.appspot.com/o/10.jpg?alt=media&token=238c5a33-ec89-4a9f-bd04-0f0285027952')"
  //   "width": "100%",
  //   "height": "100vh",
  //   "background-position": "center",
  //   "background-repeat": "no-repeat",
  //   "background-size": "cover",
  //   "background-attachment": "fixed",
  banner.style.width = '100%'
  banner.style.height = '100vh'
  banner.style.backgroundPosition = 'center'
  banner.style.backgroundRepeat = 'no-repeat'
  banner.style.backgroundSize = 'cover'
  banner.style.backgroundAttachment = 'fixed'
}

function initBanner() {
  if (window.banner) {
    setTimeout(() => {
      // generateBanner(CONFIG.title);
      generateBanner()
    }, 100)
  }
}

initBanner()
