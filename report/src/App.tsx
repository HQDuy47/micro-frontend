import ReportPage from "./ReportPage";

export default function App() {
  return (
    <main className="content">
      <ReportPage role="admin" can={() => true} />
    </main>
  );
}
