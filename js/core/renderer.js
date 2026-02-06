const output = document.getElementById("output");

export function print(text = "") {
  output.innerText += text + "\n";
  output.scrollTop = output.scrollHeight;
}

export async function typePrint(text, speed = 10) {
  for (const c of text) {
    output.innerText += c;
    await new Promise(r => setTimeout(r, speed));
  }
  output.innerText += "\n";
}
