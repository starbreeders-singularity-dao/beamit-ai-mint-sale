import { isAddressWhitelisted } from "@/lib/supabase/db";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  let checkWhitelisted: any = false;
  useEffect(() => {
    const isWhitelistedAddress: any = localStorage.getItem("whiteListAddress");

    if (!isWhitelistedAddress) {
      checkWhitelisted = isAddressWhitelisted(isWhitelistedAddress);
    }
    if (checkWhitelisted) {
      router.push("/auth/login");
    }
  }, [router]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
