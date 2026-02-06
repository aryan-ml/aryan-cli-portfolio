import { state } from "../core/state.js";
import { getNode } from "../core/path.js";

export function pwd() {
  return state.cwd;
}

export function ls() {
  const node = getNode(state.cwd);
  return Object.keys(node.children || {}).join("  ");
}

export function cd([path]) {
  if (!path) return "";
  const target = path.startsWith("/") ? path : `${state.cwd}/${path}`;
  const node = getNode(target);
  if (!node || node.type !== "dir") return "cd: no such directory";
  state.cwd = target.replace(/\/+/g, "/");
  return "";
}

export function clear() {
  return "__CLEAR__";
}
