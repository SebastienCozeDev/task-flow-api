import AuthDebug from "@/components/auth-debug";
import BoardsDebug from "@/components/boards-debug";
import ThemeController from "@/components/theme-controller";

export default function DebugPage() {
    return (
        <main>
            <AuthDebug />
            <BoardsDebug />
        </main>
    );
}
