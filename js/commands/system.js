import { state } from "../core/state.js";
import { FS } from "../data/filesystem.js";

export function whoami() { return state.user; }

export function date() { return new Date().toString(); }

export function help() {
  return `Available commands:
  ls        - List files in current directory
  cd [dir]  - Change directory
  cat [file]- Read file content
  pwd       - Print working directory
  clear     - Clear terminal
  whoami    - Display current user
  history   - Show command history
  date      - Display current date/time
  find      - List all files in system
  run [proj]- Run a specific project
  help      - Show this menu`;
}

export function history() {
  return state.history.map((c, i) => `${i}  ${c}`).join("\n");
}

export function find() {
  const files = [];
  const recurse = (node, path) => {
    if (node.children) {
      Object.keys(node.children).forEach(k => recurse(node.children[k], `${path}/${k}`));
    } else {
      files.push(path);
    }
  };
  recurse(FS["/"], "");
  return files.join("\n");
}

export function exit() {
  window.close();
  return "Session ended. Please close the tab.";
}