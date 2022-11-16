var videoPlayer = document.getElementById("videoSource");
var tracks = document.querySelectorAll("#tracks li a");
var modes = document.querySelectorAll("#buttons");
var player = document.getElementsByTagName("video")[0];
var mode = 0;
var user;

// Stops links from moving away from page on click
window.onload = function() {
    var anchorElements = document.getElementsByTagName('a');
    for (var i in anchorElements)
        anchorElements[i].onclick = function() {
          return false;
        }
}

// Change video source and start playback
var changeSource = function() {
  player.pause();

  if (mode == 0){
    var newVideoSource = this.href
    var txt1 = newVideoSource.slice(-5, -4)
    var txt2 = newVideoSource.slice(0, -5)+"videos/"+"H/"+txt1+".mp4";
  }

  else if (mode == 1){
    var newVideoSource = this.href
    var txt1 = newVideoSource.slice(-5, -4)
    var txt2 = newVideoSource.slice(0, -5)+"videos/"+"T/"+txt1+".mp4";
  }

  else if (mode == 2){
    var newVideoSource = this.href
    var txt1 = newVideoSource.slice(-5, -4)
    var txt2 = newVideoSource.slice(0, -5)+"videos/"+"H/"+txt1+".mp4";
  }

  else if (mode == 3){
    var newVideoSource = this.href
    var txt1 = newVideoSource.slice(-5, -4)
    var txt2 = newVideoSource.slice(0, -5)+"videos/"+"C/"+txt1+".mp4";
  }

  else if (mode == 4){
    var newVideoSource = this.href
    var txt1 = newVideoSource.slice(-5, -4)
    var txt2 = newVideoSource.slice(0, -5)+"videos/"+"S/"+txt1+".mkv";
  }

  videoPlayer.setAttribute("src", txt2);
  player.load();
  player.play();
}

// Binds events to each playlist item
for(var i = 0; i < tracks.length; i++) {
  tracks[i].addEventListener("click", changeSource);
}


function t(click){
    mode=1;
}

function h(click){
    mode=2;
}

function c(click){
    mode=3;
}

function s(click){
    mode=4;
}
