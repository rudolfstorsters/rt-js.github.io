
window.onload = function () {
  function renderVisual() {
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 4.5;
    var barHeight;
    var x = 0;
    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = barHeight + (25 * (i / bufferLength));
        var g = 50 * (i / bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight * 2.5, barWidth, barHeight);

        x += barWidth + 1;
      }
    }



    renderFrame();
  }

  var context = new AudioContext();
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  audio.src = "HowlingattheMoon(Instrumental).mp3";
  audio.load();
  var src = context.createMediaElementSource(audio);
  
  renderVisual();

  file.onplay = function () {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    renderVisual();
  };
};

function noIdeaModeFunction() {
  var element = document.body;
  element.classList.toggle("noIdeaMode")
}
