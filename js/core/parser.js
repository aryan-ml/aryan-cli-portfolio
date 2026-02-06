export function parse(input) {
  const parts = input.trim().split(/\s+/);
  return {
    cmd: parts[0],
    args: parts.slice(1),
  };
}
