import { FS } from "../data/filesystem.js";

export function getNode(path) {
  if (path === "/") return FS["/"];

  const parts = path.split("/").filter(Boolean);
  let node = FS["/"];

  for (const p of parts) {
    if (!node.children || !node.children[p]) return null;
    node = node.children[p];
  }

  return node;
}
