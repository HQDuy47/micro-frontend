type Props = { role: string; can: (action: string) => boolean };

const rows = [
  ["KH001", "Nguyễn Văn A", "Đã đồng ý"],
  ["KH002", "Trần Thị B", "Đã rút"],
  ["KH003", "Lê Văn C", "Đã đồng ý"],
];

export default function ReportPage({ role, can }: Props) {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Consent status report</h2>
          <p className="meta">
            report v1 · build lúc {__BUILD_TIME__} · vai trò: {role}
          </p>
        </div>
        {can("EXPORT") && <button className="btn btn-primary">Export</button>}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Mã KH</th>
            <th>Tên</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([id, name, status]) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>
                <span
                  className={`badge ${status === "Đã rút" ? "badge-danger" : "badge-success"}`}
                >
                  {status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
