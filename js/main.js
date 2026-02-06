import { state } from "./core/state.js";
import { parse } from "./core/parser.js";
import { print, typePrint } from "./core/renderer.js";
import { COMMANDS } from "./commands/index.js";
import { BOOT } from "./data/boot.js";

const input = document.getElementById("input");
const prompt = document.getElementById("prompt");

function updatePrompt() {
  prompt.innerText = `${state.user}@${state.host}:${state.cwd}$`;
}

(async () => {
  await typePrint(BOOT, 15);
  updatePrompt();
})();

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const value = input.value;
    print(`${prompt.innerText} ${value}`);

    state.history.push(value);
    state.historyIndex = state.history.length;

    const { cmd, args } = parse(value);
    input.value = "";

    if (COMMANDS[cmd]) {
      const result = COMMANDS[cmd](args);
      if (result === "__CLEAR__") {
        document.getElementById("output").innerText = "";
      } else {
        print(result);
      }
    } else if (cmd) {
      print(`command not found: ${cmd}`);
    }

    updatePrompt();
  }

  if (e.key === "ArrowUp") {
    state.historyIndex = Math.max(0, state.historyIndex - 1);
    input.value = state.history[state.historyIndex] || "";
  }

  if (e.key === "ArrowDown") {
    state.historyIndex = Math.min(state.history.length, state.historyIndex + 1);
    input.value = state.history[state.historyIndex] || "";
  }
});
