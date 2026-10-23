const FOCAL_POINT: Record<string, string> = {
  "/images/hairdressing.jpg": "center 35%",
  "/images/students-learning.jpg": "center 38%",
};

export function imageFocalPoint(src: string): string {
  return FOCAL_POINT[src] ?? "top";
}
