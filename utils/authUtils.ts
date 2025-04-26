import { useRouter } from "next/router";
import React, {
  useEffect,
  ComponentType,
  createElement,
  ReactElement,
} from "react";
import { useAuth } from "@/contexts/AuthContext";

export function withAuth<P = Record<string, unknown>>(
  WrappedComponent: ComponentType<P>
) {
  const AuthenticatedComponent = (props: P): ReactElement => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace("/login");
      }
    }, [loading, user, router]);

    if (loading || !user) {
      return createElement("div", null, "Loading...");
    }

    //@ts-ignore
    return createElement(WrappedComponent, { ...(props as unknown as P) });
  };

  AuthenticatedComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthenticatedComponent;
}

export function withAdminAuth<P = Record<string, unknown>>(
  WrappedComponent: ComponentType<P>
) {
  const AdminComponent = (props: P): ReactElement => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.replace("/login");
        } else if ((user as any).role !== "admin") {
          router.replace("/posts");
        }
      }
    }, [loading, user, router]);

    if (loading || !user || (user as any).role !== "admin") {
      return createElement("div", null, "Loading...");
    }

    //@ts-ignore
    return createElement(WrappedComponent, { ...(props as unknown as P) });
  };

  AdminComponent.displayName = `withAdminAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AdminComponent;
}
