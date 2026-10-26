import { useEffect, useState } from "react";
import { RemoteModule, type MenuItem } from "./RemoteModule";
import { registerFromMenu } from "./registerFromMenu";

type Group = { code: string; moduleName: string; subModuleList: MenuItem[] };

export default function App() {
  const [menu, setMenu] = useState<Group[]>([]);
  const [role, setRole] = useState("admin");
  const [current, setCurrent] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetch("/menu.json")
      .then((r) => r.json())
      .then((data: Group[]) => {
        registerFromMenu(data.flatMap((g) => g.subModuleList));
        setMenu(data);
      });
  }, []);

  // Lọc menu theo vai trò
  const visible = menu
    .map((g) => ({
      ...g,
      subModuleList: g.subModuleList.filter((i) => i.roles.includes(role)),
    }))
    .filter((g) => g.subModuleList.length);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          Micro<span>Shell</span>
        </div>
        <select
          className="select"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setCurrent(null);
          }}
        >
          <option value="admin">admin</option>
          <option value="viewer">viewer</option>
        </select>
      </header>
      <div className="layout">
        <nav className="sidebar">
          {visible.map((g) => (
            <div key={g.code} className="nav-group">
              <div className="nav-group-title">{g.moduleName}</div>
              {g.subModuleList.map((i) => (
                <button
                  key={i.code}
                  className={`nav-item${current?.code === i.code ? " active" : ""}`}
                  onClick={() => setCurrent(i)}
                >
                  {i.moduleName}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <main className="content">
          {current ? (
            <RemoteModule item={current} role={role} />
          ) : (
            <div className="empty">Chọn một mục trong menu</div>
          )}
        </main>
      </div>
    </div>
  );
}
