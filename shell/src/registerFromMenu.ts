import { registerRemotes } from "@module-federation/runtime";
import type { MenuItem } from "./RemoteModule";

// Đăng ký remote theo dữ liệu menu (ở dự án thật lấy từ API backend)
export function registerFromMenu(items: MenuItem[]) {
  registerRemotes(
    items.map((i) => ({
      name: i.remote,
      entry: i.remoteEntry,
      type: "module",
    })),
  );
}
