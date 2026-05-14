import AuthDebug from "@/components/auth-debug";
import BoardsDebug from "@/components/boards-debug";


export default function DebugPage() {
    return (
        <main>
            <AuthDebug />
            <BoardsDebug />
        </main>
    );
}
