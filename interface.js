document.addEventListener("DOMContentLoaded", function() { updateImage(); updateSaveButton() });
document.getElementById("imageInput").addEventListener("input", updateImage);
document.getElementById("clear").addEventListener("click", updateImage);
document.getElementById("pixelation").addEventListener("input", updateImage);
document.getElementById("pixelationDisplay").addEventListener("input", updateImage);
document.getElementById("filename").addEventListener("input", updateSaveButton);

function updateImage() {
  let pixelation = document.getElementById("pixelationDisplay").value;
  if (!pixelation) pixelation = "1";

  // Image update
  let img = new Image();
  let defaultImage = "firewatch.png";
  img.onload = () => eightBit(document.getElementById("canvas"), img, pixelation);

  // IDEA: Find a way to display a better preview?
  img.width = "500";
  img.height = "300";

  // IDEA: Instead, have the canvas cover the whole page and have a slide-
  //       out side menu that has the options (actually shows changes)
  let hiddenImage = new Image();
  hiddenImage.onload = () => {
    eightBit(document.getElementById("hidden"), hiddenImage, pixelation)
  };

  let file = document.getElementById("imageInput");
  if (file.files && file.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      hiddenImage.src = e.target.result;
    }

    reader.readAsDataURL(file.files[0]);
  } else {
    img.src = defaultImage;
    hiddenImage.src = defaultImage;
  }
}

function updateSlider() {
  let pixelation = document.getElementById("pixelation");
  let pixelText = document.getElementById("pixelationDisplay").value;
  if (!pixelText) pixelText = "1";

  if (parseInt(pixelation.value) > parseInt(pixelText)) {
    pixelation.value--;
  } else if (parseInt(pixelation.value) < parseInt(pixelText)) {
    pixelation.value++;
  }

  if (pixelation.value != pixelText)
    setTimeout(updateSlider, 5);
}

function updateSaveButton() {
  let save = document.getElementById("save");
  let filename = document.getElementById("filename");
  if (filename.value) {
    save.disabled = false;
    save.title = "Download the image";
    save.style.cursor = "pointer";
  } else {
    save.disabled = true;
    save.title = "Name the file to download";
    save.style.cursor = "not-allowed";
  }
}

var save = document.getElementById("saveWrapper");
save.addEventListener("click", evt => {
  let filename = document.getElementById("filename").value;
  if (!filename) return;

  let dataURL = hidden.toDataURL("image/png");
  save.href = dataURL;
  save.download = `${filename.split(' ').join('_')}.png`;
});

// Stops `Enter` key press (so form won't submit)
function stopEnter(evt) {
  let node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if ((evt.keyCode == 13) && (node.type == "text")) return false;
}

document.onkeypress = stopEnter;

function isNumber(evt) {
  if (!evt) evt = window.event;
  let num = document.getElementById("pixelationDisplay");
  let charCode = (evt.which) ? evt.which : evt.keyCode;

  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    // Only allows numbers to be entered into pixelation field
    return false;
  } else if (parseInt(num.value + String.fromCharCode(charCode)) > 100) {
    // Stops total values from being > 100
    return false;
  }
  return true;
}
