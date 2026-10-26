import {
  Component,
  createElement,
  Suspense,
  use,
  type ReactNode,
  type ComponentType,
} from "react";
import { loadRemote } from "@module-federation/runtime";

export type MenuItem = {
  code: string;
  moduleName: string;
  remote: string;
  remoteEntry: string;
  exposed: string;
  roles: string[];
  actions: string[];
};

type RemoteProps = { role: string; can: (action: string) => boolean };

// Cache promise theo code: mỗi remote chỉ tải một lần, use() đọc lại kết quả
const cache = new Map<string, Promise<ComponentType<RemoteProps>>>();
function loadPage(item: MenuItem) {
  if (!cache.has(item.code)) {
    cache.set(
      item.code,
      loadRemote<{ default: ComponentType<RemoteProps> }>(
        `${item.remote}/${item.exposed.replace("./", "")}`,
      ).then((mod) => {
        if (!mod) throw new Error("Không tải được module");
        return mod.default;
      }),
    );
  }
  return cache.get(item.code)!;
}

// Component khai báo ở module scope; remote được render qua createElement
function RemotePage({ item, role }: { item: MenuItem; role: string }) {
  return createElement(use(loadPage(item)), {
    role,
    can: (a: string) => item.actions.includes(a),
  });
}

// Remote lỗi chỉ hỏng vùng của nó, shell vẫn chạy
class ErrorBoundary extends Component<
  { children: ReactNode },
  { error?: Error }
> {
  state: { error?: Error } = {};
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    return this.state.error ? (
      <div className="alert">
        Module tạm thời không tải được: {this.state.error.message}
      </div>
    ) : (
      this.props.children
    );
  }
}

export function RemoteModule({ item, role }: { item: MenuItem; role: string }) {
  return (
    <ErrorBoundary key={item.code}>
      <Suspense fallback={<div className="loading">Đang tải {item.moduleName}…</div>}>
        <RemotePage item={item} role={role} />
      </Suspense>
    </ErrorBoundary>
  );
}
