import { CompareProvider } from "./compare-context";

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <CompareProvider>{children}</CompareProvider>;
}
