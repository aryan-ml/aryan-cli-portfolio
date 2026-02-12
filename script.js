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
`Languages:
• Python
• C++

Machine Learning:
• Deep Learning (CNN, ResNet, transfer learning)
• Model training & evaluation
• Dataset preprocessing & augmentation
• Classical ML baselines

Domains:
• Computer Vision
• Speech / Audio / Signal Processing
• Inter-domain AI systems

Tools & Libraries:
• TensorFlow
• PyTorch
• scikit-learn
• OpenCV
• NumPy, Pandas, Matplotlib

Systems:
• Linux
• Git
• CLI-based workflows

Currently learning:
• Shell scripting
• AWS`
        },

        projects: {
          type: "dir",
          content: {
            "deepfake.txt": {
      type: "file",
      content: `
DeepFake Detection System

Domain: Computer Vision / Robust Classification

• CNN & ResNet architectures
• Tackled dataset bias & overfitting
• Evaluated generalization on unseen samples
• Structured into IEEE-style documentation

GitHub: <a href="https://github.com/aryan-ml/DeepFakeDetection" target="_blank" class="project-link">github.com/aryan-ml/DeepFakeDetection</a>

Live on: <a href="https://deepfake-video-detection.streamlit.app/" target="_blank" class="project-link">Streamlit</a>

`
    },

    "sudoku.txt": {
      type: "file",
      content: `
Visual Sudoku Solver

Domain: Computer Vision + Search Algorithms

• CNN digit recognition
• Backtracking solver
• GUI-based interactive system
• Real-time grid detection

GitHub: <a href="https://github.com/aryan-ml/Sudoku-Solver-using-KNN-and-Backtracking" target="_blank" class="project-link">github.com/aryan-ml/SudokuSolver</a>
`
    },

    "target-speaker.txt": {
      type: "file",
      content: `
Target Speaker Detection

Domain: Speech Processing / Audio AI

• Multi-speaker separation
• Attention-based & embedding-based approaches
• Robust modeling under noisy conditions

Status: Ongoing Research Project
`
    },

    "accent-l2.txt": {
      type: "file",
      content: `
Accent-Based Native Language Identification

Domain: Speech Classification

• Acoustic + phonetic feature learning
• L2 English speech modeling
• Accent robustness research

Status: Ongoing
`
    },

    "laser-microphone.txt": {
  type: "file",
  content: `
Laser Microphone System

Domain: Signal Processing / Hardware-Software Integration

Overview:
Designed and implemented a laser-based remote audio sensing system
capable of capturing sound through surface vibration detection.

Technical Highlights:
• Used laser reflection to detect micro-vibrations
• Signal amplification & filtering pipeline
• Analog-to-digital conversion for processing
• Noise reduction & signal stabilization

Impact:
• 1st Place – Technical Exhibition
• Demonstrated non-contact audio capture system`
},

  }
},

        certifications: {
  type: "dir",
  content: {
    "nptel.png": {
      type: "file",
      content: "In progress, thanks for reading"
    },
    "cs50.png": {
      type: "image",
      src: "assets/CS50.png"
    },
    "MLE.png": {
      type: "image",
      src: "assets/Google MLE.png"
    },
    "supervised_learning.png": {
      type: "image",
      src: "assets/Supervised Machine.png"
    }
  }
},

        achievements: {
          type: "file",
          content:
`Technical:
• 1st Place – Tech Exhibition (Laser Audio System)
• 2nd Place – Tech Greek Quiz (150+ participants)
• 6th Place – Binary Blitz Hackathon (300+ teams)
• Top 30% – Kaggle ML Competition

Innovation:
• Filed System optimization related patent
• Filed braille output synchronization related patent

Personal:
• Marathoner (42Km)
• State level Swimmer
• State level shuttler 
• NCC 'A' Certificate`
        },

        research: {
          type: "file",
          content:
`Research Focus: Robust Multi-Modal AI Systems

I work on building AI systems that remain reliable under noise,
distribution shift, and real-world complexity.

---

DeepFake Detection (Vision)

• Binary classification using CNN & ResNet architectures  
• Faced dataset bias & small-sample generalization challenges  
• Explored robustness, transfer learning & evaluation metrics  
• Structured into IEEE-style documentation (draft stage)

---

Target Speaker Detection (Multi-Speaker Audio)

• Problem: isolate a target speaker in overlapping speech  
• Exploring attention mechanisms & speaker embeddings  
• Focus on robustness in noisy acoustic environments  

---

Accent-Based Native Language Identification (L2 English)

• Classifying native language from English speech  
• Studying acoustic + phonetic feature representations  
• Goal: generalizable modeling across accent variability  

---

Innovation & Patents

• Elevator Optimization System  
  AI-based system-level optimization concept  
  Focused on efficiency, scheduling & real-world deployment logic  

• Braille-to-Lyrics Synchronization Device  
  Hardware-software integrated accessibility innovation  
  Synchronizes tactile output with lyrical audio in real-time  

---

Long-Term Direction

Building cross-domain AI systems integrating:
Vision + Speech + Optimization + Real-world deployment.`
        },

        education: {
          type: "file",
          content:
`BTech – Computer Science (AI/ML Specialization)
Lovely Professional University
• Focus: Machine Learning, Deep Learning, Systems

Higher Secondary (11th–12th)
Orchids The International School, Mumbai
• PCM Stream
• Developed early interest in computing & problem solving

Secondary Education (10th)
Delhi Public School, Vadodara
• Built foundational discipline & academic base`
        },

        resume: {
  type: "file",
  content: `
Resume Options:

<a href="assets/Aryan CV.pdf" target="_blank" class="resume-link">
Open Resume in new tab
</a>

<a href="assets/Aryan CV.pdf" download class="resume-link">
Download Resume locally 
</a>
`
},


        contact: {
          type: "file",
          content:
`$ contact --open

[ github ]     <a href="https://github.com/aryan-ml" target="_blank" class="contact-link">github.com/aryan-ml</a>
[ linkedin ]   <a href="https://www.linkedin.com/in/aryan-agr/" target="_blank" class="contact-link">linkedin.com/in/aryan-agr</a>
[ email ]      aryan.agrawal0425@gmail.com

Status: Open to research collaborations,
AI systems work, and inter-domain experimentation.

If you're reading this via ls -a,
we'll probably get along.

)> Message me with the easter egg and we can work on something interesting <(
`
        },

        ".hidden": {
          type: "dir",
          content: {
            "secret.txt": {
              type: "file",
              content:
`Well done you found the hidden file, tho you weren't supposed to be here!
which is exactly why i respect it.


"Curiosity is the real terminal command." 
                                      ~Aryan


message me this quote :)

I appreciate curious minds
and people those who ask “why?”.
`
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
    dir = fs["~"];
  } else {
    dir = getDir("~/" + parts.join("/"));
  }

  if (!dir || !dir.content[file]) {
    addOutput("cat: file not found", "error");
    return;
  }

  const item = dir.content[file];

  // 🔹 IMAGE SUPPORT
  if (item.type === "image") {
    addOutput(`
      <div class="section">
        <div class="section-title">${file}</div>
        <img src="${item.src}" class="cert-image" />
      </div>
    `);
    return;
  }

  // 🔹 NORMAL FILE SUPPORT
  if (item.type === "file") {
    addOutput(`
      <div class="section">
        <div class="section-title">${file}</div>
        <div class="section-content">
${item.content}
        </div>
      </div>
    `);
    return;
  }

  addOutput("cat: unsupported file type", "error");
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

When not working with models,
I’m probably running marathons, swimming, 
or learning something new just because it looked interesting.

Long-term direction:
Research and develop scalable AI systems
that perform reliably outside controlled environments.

Currently building beyond curriculum through independent research & system design.
      </div>

      <div class="section-meta">
Status: Always busy  
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

