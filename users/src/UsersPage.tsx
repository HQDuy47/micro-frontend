type Props = { role: string; can: (action: string) => boolean };
const users = ["an.nguyen", "binh.tran", "cuong.le"];

export default function UsersPage({ can }: Props) {
  return (
    <div className="page">
      <div className="page-header">
        <h2>User management</h2>
        {can("CREATE") && <button className="btn btn-primary">Thêm</button>}
      </div>
      <ul className="list">
        {users.map((u) => (
          <li key={u}>
            {u}
            {can("DELETE") && (
              <button className="btn btn-sm btn-danger">Xoá</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
