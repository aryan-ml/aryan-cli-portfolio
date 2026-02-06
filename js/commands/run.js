export function run([name]) {
  if (!name) return "run: missing project name";

  if (name === "sudoku") {
    return "Running Sudoku Solver...\nSolved using CNN + Backtracking.";
  }

  if (name === "deepfake") {
    return "Running DeepFake Detection...\nCNN + ResNet pipeline.";
  }

  return "run: unknown project";
}
