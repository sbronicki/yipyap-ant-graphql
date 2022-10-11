export function consoleLog() {
  for (let arg of arguments) {
    console.log(`%c ${arg}`, "font-size: 20px");
  }
}
export function getBase64(file, cb) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}
