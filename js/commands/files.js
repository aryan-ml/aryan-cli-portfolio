import { state } from "../core/state.js";
import { getNode } from "../core/path.js";

export function cat([file]) {
  if (!file) return "cat: missing file";
  const path = file.startsWith("/") ? file : `${state.cwd}/${file}`;
  const node = getNode(path);
  if (!node || node.type !== "file") return "cat: file not found";
  return node.content;
}
