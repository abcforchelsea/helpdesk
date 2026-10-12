import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PriorityBadge, StatusBadge } from "@/Components/Badge";

export default function Show({ ticket }) {
    const destroy = () => {
        if (confirm("Delete this ticket? This cannot be undone.")) {
            router.delete(route("tickets.destroy", ticket.id));
        }
    };

    return (
        <AuthenticatedLayout header="Ticket Details">
            <Head title={ticket.title} />
            <div className="mx-auto max-w-3xl px-4 py-6">
                <div className="space-y-4 rounded-lg bg-white p-4 shadow sm:p-6">
                    <h2 className="break-words text-xl font-bold text-gray-900">
                        {ticket.title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <PriorityBadge value={ticket.priority} />
                        <StatusBadge value={ticket.status} />
                        <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                            {ticket.category}
                        </span>
                    </div>
                    <p className="whitespace-pre-wrap break-words text-gray-700">
                        {ticket.description}
                    </p>
                    <p className="text-xs text-gray-500">
                        Created {new Date(ticket.created_at).toLocaleString()}
                    </p>
                    <div className="flex gap-3 pt-2">
                        <Link
                            href={route("tickets.edit", ticket.id)}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={destroy}
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                        >
                            Delete
                        </button>
                        <Link
                            href={route("tickets.index")}
                            className="px-2 py-2 text-sm text-gray-600 hover:underline"
                        >
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
