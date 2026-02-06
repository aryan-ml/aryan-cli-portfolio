export const FS = {
  "/": {
    type: "dir",
    children: {
      about: {
        type: "file",
        content: "Hi, I'm Aryan.\nBTech CSE (AI/ML).\nI like ML, Linux and running marathons."
      },

      skills: {
        type: "file",
        content: "Python\nC++\nMachine Learning\nDeep Learning\nLinux"
      },

      projects: {
        type: "dir",
        children: {
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

      contact: {
        type: "file",
        content: "GitHub: aryan-ml\nEmail: example@email.com"
      },

      ".hidden": {
        type: "dir",
        children: {
          "secret.txt": {
            type: "file",
            content: "👀 Curious minds find hidden things."
          }
        }
      }
    }
  }
};
