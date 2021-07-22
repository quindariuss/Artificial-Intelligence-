const fileinput = document.getElementById("fileinput");
const canvas = document.getElementById("canvas");
const contex = canvas.getContext("2d");
var source_image = new Image();
let image_data = null;
let orginal_pixels = null;

fileinput.onchange = function (e) {
  if (e.target.files && e.target.files.item(0)) {
    source_image = URL.createObjectURL(e.target.files[0]);
    console.log({ source_image });
  }
};

source_image.onload = drawImage();

function drawImage() {
  console.log("working_1");
  canvas.width = source_image.width;
  console.log("working_2");
  canvas.height = source_image.height;
  console.log("working_3");
  contex.drawImage(source_image, 0, 0, source_image.width, source_image.height);
  console.log("working_4");
  image_data = contex.getImageData(
    0,
    0,
    source_image.width,
    source_image.height
  );
  orginal_pixels = image_data.data.slice();
  console.log({ image_data });
}
