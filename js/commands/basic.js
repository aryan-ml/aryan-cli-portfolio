import { state } from "../core/state.js";
import { getNode } from "../core/path.js";
import { print } from "../core/renderer.js";

export function ls() {
  const node = getNode(state.cwd);
  if (!node || !node.children) return;

  Object.entries(node.children).forEach(([name, item]) => {
    print(name, item.type === "dir" ? "folder" : "file");
  });
}

export function pwd() {
  print(state.cwd);
}

export function cd([path]) {
  if (!path) return;
  const target = path.startsWith("/") ? path : `${state.cwd}/${path}`;
  const node = getNode(target);
  if (!node || node.type !== "dir") {
    print("cd: no such directory", "error");
    return;
  }
  state.cwd = target.replace(/\/+/g, "/");
}

export function clear() {
  return "__CLEAR__";
}
