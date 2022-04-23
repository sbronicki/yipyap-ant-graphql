export function consoleLog() {
  for (let arg of arguments) {
    console.log(`%c ${arg}`, "font-size: 20px");
  }
}
