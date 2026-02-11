document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("terminal-output");
  const input = document.getElementById("command-input");
  const prompt = document.getElementById("prompt");
  const commandPanel = document.getElementById("command-panel");

  let started = false;
  let cwd = "~";
  let history = [];
  let historyIndex = -1;

  /* ---------------- FILE SYSTEM ---------------- */

  const fs = {
    "~": {
      type: "dir",
      content: {
        home: {
          type: "file",
          content: `Aryan Agrawal\n \nBTech Computer Science (AI/ML Specialization)
          
Currently working on:
• DeepFake Detection (completed research phase)
• Target Speaker Detection in Multi-Speaker Audio
• Accent-Based Native Language Identification

Interested in building inter-domain AI systems 
that integrate vision, speech, and robust learning architectures.

Type 'ls' to explore more :]`
        },

        skills: {
          type: "file",
          content:
`• Python
• C++
• Machine Learning
• Deep Learning
• Linux
• Git`
        },

        projects: {
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

        certifications: {
          type: "file",
          content:
`• Google Project Management
• NPTEL Deep Learning for NLP`
        },

        achievements: {
          type: "file",
          content:
`• Marathon finisher
• Patent filed (AI-related)`
        },

        research: {
          type: "file",
          content:
`• DeepFake Detection (IEEE draft)
• Ongoing AI patent work`
        },

        education: {
          type: "file",
          content:
`BTech CSE (AI/ML)
CGPA: 7.75`
        },

        resume: {
          type: "file",
          content: "Download resume: resume.pdf"
        },

        contact: {
          type: "file",
          content:
`GitHub: aryan-ml
Email: your@email.com`
        },

        ".hidden": {
          type: "dir",
          content: {
            "secret.txt": {
              type: "file",
              content:
`🎉 You found the easter egg!

"Curiosity is the real terminal command."

Email me this quote 😉`
            }
          }
        }
      }
    }
  };

  /* ---------------- HELPERS ---------------- */

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
    div.innerHTML = html.replace(/\n/g, "<br>");
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

  function resolvePath(name) {
    if (name === "~") return "~";
    if (cwd === "~") return `~/${name}`;
    return `${cwd}/${name}`;
  }

  /* ---------------- TAB COMPLETION ---------------- */

  function tabComplete() {
    const value = input.value;
    const parts = value.split(" ");
    const last = parts.pop();

    const dir = getDir(cwd);
    if (!dir) return;

    const options = Object.keys(dir.content).filter(k =>
      k.startsWith(last)
    );

    if (options.length === 1) {
      parts.push(options[0]);
      input.value = parts.join(" ");
    }
  }

  /* ---------------- COMMANDS ---------------- */

  function runCommand(cmdLine) {
    addOutput(`${prompt.innerHTML} <span class="command">${cmdLine}</span>`);

    const [cmd, ...args] = cmdLine.split(/\s+/);

    if (cmd === "ls") {
  const dir = getDir(cwd);
  if (!dir) return;

  const showHidden = args.includes("-a");

  let out = "";

  Object.entries(dir.content)
    .filter(([name]) => {
      if (showHidden) return true;
      return !name.startsWith(".");
    })
    .forEach(([name, item]) => {
      if (item.type === "dir") {
        out += `<span class="directory">${name}/</span>  `;
      } else {
        out += `<span class="file">${name}</span>  `;
      }
    });

  addOutput(out.trim());
}


    else if (cmd === "cd") {
  if (!args[0]) {
    cwd = "~";
    return;
  }

  const target = args[0];

  // Handle cd ~
  if (target === "~") {
    cwd = "~";
    return;
  }

  // Handle cd ..
  if (target === "..") {
    if (cwd === "~") return;

    const parts = cwd.split("/");
    parts.pop();

    cwd = parts.length === 1 ? "~" : parts.join("/");
    return;
  }

  // Handle normal directory navigation
  const newPath =
    cwd === "~" ? `~/${target}` : `${cwd}/${target}`;

  const dir = getDir(newPath);

  if (dir && dir.type === "dir") {
    cwd = newPath;
  } else {
    addOutput("cd: no such directory", "error");
  }
}


  else if (cmd === "cat") {
  if (!args[0]) {
    addOutput("cat: missing file", "error");
    return;
  }

  const path = resolvePath(args[0]);
  const parts = path.replace(/^~\//, "").split("/");
  const file = parts.pop();

  let dir;

if (parts.length === 0) {
  // file is in root (~)
  dir = fs["~"];
} else {
  dir = getDir("~/" + parts.join("/"));
}

  if (!dir || !dir.content[file] || dir.content[file].type !== "file") {
    addOutput("cat: file not found", "error");
    return;
  }

  addOutput(`
    <div class="section">
      <div class="section-title">${file}</div>
      <div class="section-content">
${dir.content[file].content}
      </div>
    </div>
  `);
}


    else if (cmd === "pwd") {
      addOutput(cwd);
    }

    else if (cmd === "date") {
      addOutput(new Date().toString());
    }

    else if (cmd === "resume") {
      addOutput("Resume available as resume.pdf");
    }

   else if (cmd === "whoami") {

  const asciiPhoto =
    document.getElementById("whoami-ascii").innerHTML;

  addOutput(`
    <div class="section">
      <div class="section-title">whoami</div>

      <div class="ascii-photo">
        ${asciiPhoto}
      </div>

      <div class="section-content">
Aryan

AI/ML undergraduate focused on building reliable, real-world AI systems.

My work sits at the intersection of:
• Computer Vision
• Speech Processing
• Deep Learning System Design

I am particularly interested in inter-domain models that combine
perception (vision + audio) with robust learning architectures.

Beyond model training, I explore:
• Testing ideas across domains,
• 
• Deployment constraints in practical systems

Long-term direction:
Research and develop scalable AI systems
that perform reliably outside controlled environments.
      </div>

      <div class="section-meta">
Status: Research Mode  
Location: India
      </div>
    </div>
  `);
}


    else if (cmd === "help") {
  commandPanel.classList.toggle("visible");
}




    else if (cmd === "clear") {
      output.innerHTML = "";
    }

    else {
      addOutput(`command not found: ${cmd}`, "error");
    }
  }

  /* ---------------- INPUT ---------------- */

  input.addEventListener("keydown", e => {
    if (e.key === "Tab") {
      e.preventDefault();
      tabComplete();
      return;
    }

    if (e.key !== "Enter") return;

    const value = input.value.trim();
    input.value = "";

    if (!started) {
      if (value === "start") {
        started = true;
        document.body.classList.add("started");
        updatePrompt();
        addOutput("Welcome to Aryan's interactive CLI portfolio. Type <span class='command'>help</span> to explore. \n Enjoy :)");
      } else {
        addOutput("Type <span class='command'>start</span> to continue.", "error");
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
/* -------- ASCII WAVE ANIMATION -------- */
/* -------- TRUE ASCII WAVE (HOME ONLY) -------- */

const waveEl = document.getElementById("ascii-wave");

const NAME_END_COL = 46;   // start from N
const WAVE_WIDTH_PAD = 2;

let phase = 0;

// tuning
const WAVE_FREQ = 0.36;    // wavelength (lower = longer waves)
const WAVE_SPEED = 0.2;  // animation speed
const WAVE_HEIGHT = 1;    // vertical amplitude (rows)

/*
  We draw 3 rows:
  row -1
  row  0
  row +1
*/
function renderWave() {
  if (!waveEl) return;

  if (!started) {
    waveEl.textContent = "";
    return;
  }

  const cols = Math.floor(window.innerWidth / 9);
  let rows = ["", "", ""]; // top, middle, bottom

  // pad until end of ARYAN (N)
  for (let i = 0; i < NAME_END_COL; i++) {
    rows[0] += " ";
    rows[1] += " ";
    rows[2] += " ";
  }

  for (let x = NAME_END_COL; x < cols; x++) {
    const y = Math.sin(x * WAVE_FREQ + phase) * WAVE_HEIGHT;

    rows[0] += y > 0.6 ? "~" : " ";
    rows[1] += Math.abs(y) <= 0.6 ? "-" : " ";
    rows[2] += y < -0.6 ? "~" : " ";
  }

  waveEl.textContent = rows.join("\n");
  phase += WAVE_SPEED;
}


setInterval(renderWave, 80);

});

