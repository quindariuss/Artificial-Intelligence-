const fileinput = document.getElementById("fileinput");
const canvas = document.getElementById("canvas");
const contex = canvas.getContext("2d");
const source_image = new Image();
const red_slider = document.getElementById("red");
const green_slider = document.getElementById("green");
const blue_slider = document.getElementById("blue");
const brightness_slider = document.getElementById("brightness");
const grayscale_checkbox = document.getElementById("grayscale");
const contrast_slider = document.getElementById("contrast");

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

red_slider.onchange = run_filter();
green_slider.onchange = run_filter();
blue_slider.onchange = run_filter();
brightness_slider.onchange = run_filter();
grayscale_checkbox.onchange = run_filter();
contrast_slider.onchange = run_filter();

function get_index(x, y) {
  return (x + y * source_image.width) * 4;
}

function commit() {
  for (let index = 0; index < image_data.length; index++) {
    image_data.data[index] = current_pixels[index];
  }
  contex.putImageData(
    image_data,
    0,
    0,
    0,
    0,
    source_image.width,
    source_image.height
  );
}
function run_filter() {
  console.log("running filter");
  current_pixels = orginal_pixels.slice();

  const red_filter = Number(red_slider.value);
  const green_filter = Number(green_slider.value);
  const blue_filter = Number(blue_slider.value);
  const brightness_filter = Number(brightness_slider.value);
  const contrast_filter = Number(contrast_slider.value);
  const grayscale_filter = grayscale_checkbox.checked;
  for (let index = 0; index < source_image.height; index++) {
    for (let subindex = 0; subindex < source_image.width; subindex++) {
      if (grayscale_filter) {
        //set grayscale filter
      }
      // add brightness
      // add contrast

      if (!grayscale_filter) {
        console.log("trying to add blue");
        // add red
        // add green
      }
    }
  }
  commit();
}

const red_offset = 0;
const green_offset = 1;
const blue_offset = 2;

function add_blue(x, y, value) {
  const index = get_index(x, y) + blue_offset;
  const current_value = current_pixels[index];
  current_pixels[index] = clamp(current_value + value);
}

function clamp(value) {
  return Math.max(0, Math.min(Math.floor(value), 255));
}
