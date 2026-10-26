import ReportPage from "./ReportPage";

export default function App() {
  return <ReportPage role="admin" can={() => true} />;
}
