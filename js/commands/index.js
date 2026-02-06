import * as basic from "./basic.js";
import * as files from "./files.js";
import * as system from "./system.js";
import * as runCmd from "./run.js";

export const COMMANDS = {
  ...basic,
  ...files,
  ...system,
  ...runCmd
};
