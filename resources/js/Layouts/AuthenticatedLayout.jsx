import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        if (flash?.success) setMsg({ type: "success", text: flash.success });
        else if (flash?.error) setMsg({ type: "error", text: flash.error });
        else setMsg(null);
        const t = setTimeout(() => setMsg(null), 4000);
        return () => clearTimeout(t);
    }, [flash]);

    const link = "text-sm font-medium text-gray-700 hover:text-indigo-600";

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-6">
                        <span className="font-bold text-indigo-600">
                            HelpDesk
                        </span>
                        <div className="hidden items-center gap-6 md:flex">
                            <Link href={route("dashboard")} className={link}>
                                Dashboard
                            </Link>
                            <Link
                                href={route("tickets.index")}
                                className={link}
                            >
                                Tickets
                            </Link>
                        </div>
                    </div>
                    <div className="hidden items-center gap-4 md:flex">
                        <Link
                            href={route("tickets.create")}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            New Ticket
                        </Link>
                        <span className="text-sm text-gray-600">
                            {auth.user.name}
                        </span>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className={link}
                        >
                            Logout
                        </Link>
                    </div>
                    <button
                        onClick={() => setOpen(!open)}
                        className="rounded-md p-2 text-gray-600 md:hidden"
                        aria-label="Menu"
                    >
                        {open ? "✕" : "☰"}
                    </button>
                </div>
                {open && (
                    <div className="space-y-2 border-t border-gray-200 px-4 py-3 md:hidden">
                        <p className="text-sm text-gray-500">
                            {auth.user.name}
                        </p>
                        <Link
                            href={route("dashboard")}
                            className={`block ${link}`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("tickets.index")}
                            className={`block ${link}`}
                        >
                            Tickets
                        </Link>
                        <Link
                            href={route("tickets.create")}
                            className={`block ${link}`}
                        >
                            New Ticket
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className={`block ${link}`}
                        >
                            Logout
                        </Link>
                    </div>
                )}
            </nav>

            {msg && (
                <div className="mx-auto mt-4 max-w-6xl px-4">
                    <div
                        className={`flex items-center justify-between rounded-md px-4 py-3 text-sm ${
                            msg.type === "success"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        <span>{msg.text}</span>
                        <button
                            onClick={() => setMsg(null)}
                            aria-label="Dismiss"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-6xl px-4 py-4">
                        <h1 className="text-xl font-semibold text-gray-800">
                            {header}
                        </h1>
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
