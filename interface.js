document.addEventListener("DOMContentLoaded", function() { updateImage(); updateSaveButton() });
document.getElementById('imageInput').addEventListener("input", updateImage);
document.getElementById('clear').addEventListener("click", updateImage);
document.getElementById('pixelation').addEventListener("input", updateImage);
document.getElementById('filename').addEventListener("input", updateSaveButton);

function updateImage() {
  // pixelation value
  var val = document.getElementById('pixelation').value;
  document.getElementById('pixelationDisplay').innerHTML = val;

  // Image update
  var img = new Image();
  var defaultImage = "anon.jpg"; // default image URL
  img.onload = function() {
    eightBit(document.getElementById('canvas'), img, val)
  };

  // IDEA: Find a way to display a better preview?
  img.width = "500";
  img.height = "300";

  // IDEA: Instead, have the canvas cover the whole page and have a slide-
  //       out side menu that has the options (actually shows changes)
  var hiddenImage = new Image();
  hiddenImage.onload = function() {
    eightBit(document.getElementById('hidden'), hiddenImage, val)
  };

  var file = document.getElementById("imageInput");
  if (file.files && file.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      img.src = e.target.result;
      hiddenImage.src = e.target.result;
    }

    reader.readAsDataURL(file.files[0]);
  } else {
    img.src = defaultImage;
    hiddenImage.src = defaultImage;
  }
}

function updateSaveButton() {
  var save = document.getElementById("save");
  var filename = document.getElementById("filename");
  if (filename.value == "") {
    save.disabled = true;
    save.style.cursor = "not-allowed";
  } else {
    save.disabled = false;
    save.style.cursor = "pointer";
  }
}

var save = document.getElementById('saveWrapper');
save.addEventListener('click', function(e) {
  var filename = document.getElementById("filename").value;
  if (filename != "") {
    var dataURL = hidden.toDataURL('image/png');
    save.href = dataURL;
    save.download = filename + ".png";
  }
});

// Stops `Enter` key press (so form won't submit)
function stopEnter(evt) {
  var evt = (evt) ? evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
}

document.onkeypress = stopEnter;
