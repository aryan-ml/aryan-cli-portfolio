const output = document.getElementById("terminal-output");
const input = document.getElementById("command-input");
const prompt = document.getElementById("prompt");

/* ---------------- FILE SYSTEM ---------------- */

const fs = {
  "~": {
    type: "dir",
    content: {
      "about.txt": {
        type: "file",
        content: "Hi, I'm Aryan.\nBTech CSE (AI/ML).\nInterested in ML systems and research."
      },
      "skills.txt": {
        type: "file",
        content: "Python\nC++\nMachine Learning\nDeep Learning\nLinux"
      },
      "projects": {
        type: "dir",
        content: {
          "sudoku.txt": {
            type: "file",
            content: "Visual Sudoku Solver using CNN + Backtracking"
          },
          "deepfake.txt": {
            type: "file",
            content: "DeepFake Detection using CNN and ResNet"
          }
        }
      },
      ".hidden": {
        type: "dir",
        content: {
          "secret.txt": {
            type: "file",
            content: "👀 You found the secret. Respect."
          }
        }
      }
    }
  }
};

let cwd = "~";
let history = [];
let historyIndex = -1;

/* ---------------- HELPERS ---------------- */

function updatePrompt() {
  prompt.innerHTML =
    `<span class="highlight-purple">aryan</span>@` +
    `<span class="path">local</span>:` +
    `<span class="path">${cwd}</span>$`;
}

function addOutput(html, className = "") {
  const div = document.createElement("div");
  div.className = `output ${className}`;
  div.innerHTML = html;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

function getDir(path) {
  if (path === "~") return fs["~"];
  const parts = path.replace(/^~\//, "").split("/");
  let cur = fs["~"];
  for (const p of parts) {
    if (!cur.content || !cur.content[p]) return null;
    cur = cur.content[p];
  }
  return cur;
}

/* ---------------- COMMANDS ---------------- */

function cmd_ls(args) {
  const dir = getDir(cwd);
  if (!dir) return;

  let out = "";
  Object.entries(dir.content)
    .filter(([n]) => !n.startsWith(".") || args.includes("-a"))
    .forEach(([name, item]) => {
      out += item.type === "dir"
        ? `<span class="directory">${name}/</span> `
        : `<span class="file">${name}</span> `;
    });

  addOutput(out || "(empty)");
}

function cmd_cd(args) {
  if (!args[0]) {
    cwd = "~";
    return;
  }

  const target =
    args[0] === ".."
      ? cwd.split("/").slice(0, -1).join("/") || "~"
      : args[0].startsWith("~")
        ? args[0]
        : cwd === "~"
          ? `~/${args[0]}`
          : `${cwd}/${args[0]}`;

  const dir = getDir(target);
  if (!dir || dir.type !== "dir") {
    addOutput("cd: no such directory", "error");
    return;
  }
  cwd = target;
}

function cmd_cat(args) {
  if (!args[0]) {
    addOutput("cat: missing file", "error");
    return;
  }

  const path = cwd === "~" ? `~/${args[0]}` : `${cwd}/${args[0]}`;
  const parts = path.replace(/^~\//, "").split("/");
  const fileName = parts.pop();
  const dir = getDir("~/" + parts.join("/"));

  if (!dir || !dir.content[fileName] || dir.content[fileName].type !== "file") {
    addOutput("cat: file not found", "error");
    return;
  }

  addOutput(dir.content[fileName].content.replace(/\n/g, "<br>"));
}

function cmd_pwd() {
  addOutput(`<span class="path">${cwd}</span>`);
}

function cmd_help() {
  addOutput(`
<span class="command">ls</span>        list files
<span class="command">ls -a</span>     show hidden
<span class="command">cd</span>        change directory
<span class="command">cat</span>       read file
<span class="command">pwd</span>       current path
<span class="command">whoami</span>    about me
<span class="command">clear</span>     clear screen
  `);
}

function cmd_whoami() {
  addOutput(`<span class="directory">Aryan</span> — AI/ML student, Linux enjoyer.`);
}

function cmd_clear() {
  output.innerHTML = "";
}

/* ---------------- COMMAND DISPATCH ---------------- */

function runCommand(inputText) {
  addOutput(`${prompt.innerHTML} <span class="command">${inputText}</span>`);

  const [cmd, ...args] = inputText.split(/\s+/);

  switch (cmd) {
    case "ls": cmd_ls(args); break;
    case "cd": cmd_cd(args); break;
    case "cat": cmd_cat(args); break;
    case "pwd": cmd_pwd(); break;
    case "help": cmd_help(); break;
    case "whoami": cmd_whoami(); break;
    case "clear": cmd_clear(); break;
    case "": break;
    default:
      addOutput(`command not found: ${cmd}`, "error");
  }
}

/* ---------------- INPUT ---------------- */

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const value = input.value.trim();
    history.push(value);
    historyIndex = history.length;
    runCommand(value);
    input.value = "";
    updatePrompt();
  }

  if (e.key === "ArrowUp" && historyIndex > 0) {
    historyIndex--;
    input.value = history[historyIndex];
  }

  if (e.key === "ArrowDown") {
    historyIndex = Math.min(history.length, historyIndex + 1);
    input.value = history[historyIndex] || "";
  }
});

/* ---------------- INIT ---------------- */

updatePrompt();
addOutput(`Type <span class="command">help</span> to get started.`);
