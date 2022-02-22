document.addEventListener("DOMContentLoaded", () => {
  updateImage();
  updateSaveButton();
});
document.getElementById("imageInput").addEventListener("input", updateImage);
document.getElementById("clear").addEventListener("click", updateImage);
document.getElementById("quality").addEventListener("input", updateImage);
document.getElementById("qualityDisplay").addEventListener("input", updateImage);
document.getElementById("filename").addEventListener("input", updateSaveButton);

function updateImage() {
  const quality = document.getElementById("qualityDisplay").value || "1";

  // Image update
  const img = new Image();
  const defaultImage = "firewatch.png";
  img.onload = () => eightBit(document.getElementById("canvas"), img, quality);

  // IDEA: Find a way to display a better preview?
  img.width = "500";
  img.height = "300";

  // IDEA: Instead, have the canvas cover the whole page and have a slide-
  //       out side menu that has the options (actually shows changes)
  const hiddenImage = new Image();
  hiddenImage.onload = () => {
    eightBit(document.getElementById("hidden"), hiddenImage, quality)
  };

  const file = document.getElementById("imageInput");
  if (file.files && file.files[0]) {
    const reader = new FileReader();
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
  let quality = document.getElementById("quality");
  const qualityText = document.getElementById("qualityDisplay").value || "1";

  if (parseInt(quality.value) > parseInt(qualityText)) {
    quality.value--;
  } else if (parseInt(quality.value) < parseInt(qualityText)) {
    quality.value++;
  }

  if (quality.value != qualityText)
    setTimeout(updateSlider, 5);
}

function updateSaveButton() {
  const save = document.getElementById("save");
  const filename = document.getElementById("filename");
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

const saveWrapper = document.getElementById("saveWrapper");
saveWrapper.addEventListener("click", evt => {
  let filename = document.getElementById("filename").value;
  if (!filename) return;

  const dataURL = hidden.toDataURL("image/png");
  saveWrapper.href = dataURL;
  saveWrapper.download = `${filename.split(' ').join('_')}.png`;
});

// Stops `Enter` key press (so form won't submit)
function stopEnter(evt) {
  let node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if ((evt.keyCode == 13) && (node.type == "text")) return false;
}

document.onkeypress = stopEnter;

function isNumber(evt) {
  if (!evt) evt = window.event;
  const num = document.getElementById("qualityDisplay").value;
  const charCode = (evt.which) ? evt.which : evt.keyCode;

  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    // Only allows numbers to be entered into quality field
    return false;
  } else if (parseInt(num + String.fromCharCode(charCode)) > 100) {
    // Stops total values from being > 100
    return false;
  }
  return true;
}
