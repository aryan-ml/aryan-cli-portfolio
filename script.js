document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("terminal-output");
  const input = document.getElementById("command-input");
  const prompt = document.getElementById("prompt");

  let started = false;
  let cwd = "~";
  let history = [];
  let historyIndex = -1;

  const fs = {
    "~": {
      type: "dir",
      content: {
        "about.txt": { type: "file", content: "Hi, I'm Aryan." },
        "skills.txt": { type: "file", content: "Python\nC++\nML\nLinux" },
        "projects": {
          type: "dir",
          content: {
            "sudoku.txt": { type: "file", content: "Sudoku Solver" },
            "deepfake.txt": { type: "file", content: "DeepFake Detection" }
          }
        }
      }
    }
  };

  function updatePrompt() {
    if (!started) {
      prompt.textContent = ">";
      return;
    }

    prompt.innerHTML =
      `<span class="highlight-purple">aryan</span>@` +
      `<span class="path">local</span>:` +
      `<span class="path">${cwd}</span>$`;
  }

  function addOutput(html, cls = "") {
    const div = document.createElement("div");
    div.className = `output ${cls}`;
    div.innerHTML = html;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  function getDir(path) {
    if (path === "~") return fs["~"];
    const parts = path.replace(/^~\//, "").split("/");
    let cur = fs["~"];
    for (const p of parts) {
      if (!cur.content[p]) return null;
      cur = cur.content[p];
    }
    return cur;
  }

  function runCommand(cmd) {
    const [c, ...args] = cmd.split(/\s+/);

    if (c === "ls") {
      const dir = getDir(cwd);
      let out = "";
      Object.entries(dir.content).forEach(([name, item]) => {
        out += item.type === "dir"
          ? `<span class="directory">${name}/</span> `
          : `<span class="file">${name}</span> `;
      });
      addOutput(out);
    } else if (c === "help") {
  addOutput(`
<div><span class="command">ls</span> &nbsp;&nbsp; list files</div>
<div><span class="command">help</span> &nbsp; show help</div>
<div><span class="command">clear</span> clear screen</div>
  `);
}
 else if (c === "clear") {
      output.innerHTML = "";
    } else {
      addOutput(`command not found: ${c}`, "error");
    }
  }

  input.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;

    const value = input.value.trim();
    input.value = "";

    addOutput(`<span class="command">${value}</span>`);

    if (!started) {
      if (value === "start") {
        started = true;
        document.body.classList.add("started");
        updatePrompt();
        addOutput(`Welcome. Type <span class="command">help</span>.`);
      } else {
        addOutput(`Type <span class="command">start</span> to continue.`, "error");
      }
      return;
    }

    history.push(value);
    historyIndex = history.length;
    runCommand(value);
    updatePrompt();
  });

  updatePrompt();
  input.focus();
});
