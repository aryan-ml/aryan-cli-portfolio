export const FS = {
  "/": {
    type: "dir",
    children: {
      "about.txt": {
        type: "file",
        content: "Name: ARYAN\nRole: ML Engineer & Linux Enthusiast\nBio: Building neural networks and running marathons."
      },
      "projects": {
        type: "dir",
        children: {
          "sudoku.py": { type: "file", content: "CNN + Backtracking solver." },
          "deepfake.sh": { type: "file", content: "ResNet pipeline for detection." }
        }
      },
      "skills": {
        type: "file",
        content: "Languages: Python, C++, JS\nTech: PyTorch, Linux, Docker"
      },
      "contact": {
        type: "file",
        content: "Email: contact@aryan.ml\nGitHub: github.com/aryan-ml"
      }
    }
  }
};