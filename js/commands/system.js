import { state } from "../core/state.js";

export function whoami() {
  return state.user;
}

export function help() {
  return `
Commands:
ls cd pwd cat clear
whoami history help run
`;
}

export function history() {
  return state.history.map((c, i) => `${i}  ${c}`).join("\n");
}
