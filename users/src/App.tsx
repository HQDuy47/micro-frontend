import UsersPage from "./UsersPage";

function App() {
  return <UsersPage role="admin" can={() => true} />;
}

export default App;
