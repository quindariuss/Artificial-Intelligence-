/* DOM setup */

const fileinput = document.getElementById("fileinput");
const canvas = document.getElementById("canvas");
const contex = canvas.getContext("2d");
const source_image = new Image();
let image_data = null;
let orginal_pixels = null;
let current_pixels = null;

fileinput.onchange = function (e) {
  if (e.target.files && e.target.files.item(0)) {
    source_image.src = URL.createObjectURL(e.target.files[0]);
  }
};

source_image.onload = function () {
  canvas.width = source_image.width;
  canvas.height = source_image.height;
  contex.drawImage(source_image, 0, 0, source_image.width, source_image.height);

  image_data = contex.getImageData(
    0,
    0,
    source_image.width,
    source_image.height
  );

  orginal_pixels = image_data.data.slice();
};
