type Props = { role: string; can: (action: string) => boolean };
const users = ["an.nguyen", "binh.tran", "cuong.le"];

export default function UsersPage({ role, can }: Props) {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>User management</h2>
          <p className="meta">
            {users.length} người dùng · vai trò: {role}
          </p>
        </div>
        {can("CREATE") && <button className="btn btn-primary">Thêm</button>}
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Tài khoản</th>
              {can("DELETE") && <th className="actions">Thao tác</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u}>
                <td className="mono">{u}</td>
                {can("DELETE") && (
                  <td className="actions">
                    <button className="btn btn-sm btn-danger">Xoá</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
