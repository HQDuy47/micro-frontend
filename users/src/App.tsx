import UsersPage from "./UsersPage";

function App() {
  return (
    <main className="content">
      <UsersPage role="admin" can={() => true} />
    </main>
  );
}

export default App;
