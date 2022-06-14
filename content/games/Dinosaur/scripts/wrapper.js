if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    new Runner('.interstitial-wrapper');
  } else {
    document.getElementById("main-frame-notchrome").style.display="";
  }