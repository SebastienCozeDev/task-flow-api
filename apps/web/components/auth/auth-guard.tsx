"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-provider";
import { useEffect } from "react";

export default function AuthGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="p-4">
                Loading...
            </div>
        )
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            {children}
        </>
    );
}