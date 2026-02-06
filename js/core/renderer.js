const output = document.getElementById("output");
const terminal = document.getElementById("terminal");

export function print(text = "") {
  output.innerText += text + "\n";
  terminal.scrollTop = terminal.scrollHeight;
}

export async function typePrint(text, speed = 5) {
  for (const c of text) {
    output.innerText += c;
    // Scroll while typing for that "loading" feel
    terminal.scrollTop = terminal.scrollHeight;
    await new Promise(r => setTimeout(r, speed));
  }
  output.innerText += "\n";
}