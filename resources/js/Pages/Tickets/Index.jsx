import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PriorityBadge, StatusBadge } from "@/Components/Badge";

export default function Index({ tickets, filters, options }) {
    const filter = (name, value) =>
        router.get(
            route("tickets.index"),
            { ...filters, [name]: value || undefined },
            { preserveState: true, replace: true }
        );

    const destroy = (id) => {
        if (confirm("Delete this ticket? This cannot be undone.")) {
            router.delete(route("tickets.destroy", id));
        }
    };

    const select =
        "rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500";

    return (
        <AuthenticatedLayout header="My Tickets">
            <Head title="My Tickets" />
            <div className="mx-auto max-w-6xl px-4 py-6">
                <div className="mb-4 flex flex-wrap gap-3">
                    <select
                        className={select}
                        value={filters.status ?? ""}
                        onChange={(e) => filter("status", e.target.value)}
                    >
                        <option value="">All statuses</option>
                        {options.statuses.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <select
                        className={select}
                        value={filters.priority ?? ""}
                        onChange={(e) => filter("priority", e.target.value)}
                    >
                        <option value="">All priorities</option>
                        {options.priorities.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                </div>

                {tickets.data.length === 0 ? (
                    <div className="rounded-lg bg-white p-10 text-center shadow">
                        <p className="text-lg font-semibold text-gray-800">
                            No tickets yet
                        </p>
                        <p className="mt-1 text-gray-500">
                            Create your first ticket to get started.
                        </p>
                        <Link
                            href={route("tickets.create")}
                            className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            New Ticket
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="hidden overflow-hidden rounded-lg bg-white shadow md:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
                                    <tr>
                                        <th className="px-4 py-3">Title</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3">Priority</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {tickets.data.map((t) => (
                                        <tr key={t.id}>
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                {t.title}
                                            </td>
                                            <td className="px-4 py-3">
                                                {t.category}
                                            </td>
                                            <td className="px-4 py-3">
                                                <PriorityBadge
                                                    value={t.priority}
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <StatusBadge value={t.status} />
                                            </td>
                                            <td className="space-x-3 px-4 py-3 text-right">
                                                <Link
                                                    href={route(
                                                        "tickets.show",
                                                        t.id
                                                    )}
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "tickets.edit",
                                                        t.id
                                                    )}
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        destroy(t.id)
                                                    }
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="space-y-3 md:hidden">
                            {tickets.data.map((t) => (
                                <div
                                    key={t.id}
                                    className="rounded-lg bg-white p-4 shadow"
                                >
                                    <p className="break-words font-semibold text-gray-900">
                                        {t.title}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {t.category}
                                    </p>
                                    <div className="mt-2 flex gap-2">
                                        <PriorityBadge value={t.priority} />
                                        <StatusBadge value={t.status} />
                                    </div>
                                    <div className="mt-3 flex gap-4 text-sm">
                                        <Link
                                            href={route("tickets.show", t.id)}
                                            className="text-indigo-600"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={route("tickets.edit", t.id)}
                                            className="text-indigo-600"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => destroy(t.id)}
                                            className="text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm">
                            {tickets.prev_page_url ? (
                                <Link
                                    href={tickets.prev_page_url}
                                    className="rounded-md bg-white px-3 py-2 shadow hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            ) : (
                                <span className="rounded-md bg-gray-100 px-3 py-2 text-gray-400">
                                    Previous
                                </span>
                            )}
                            <span className="text-gray-600">
                                Page {tickets.current_page} of{" "}
                                {tickets.last_page}
                            </span>
                            {tickets.next_page_url ? (
                                <Link
                                    href={tickets.next_page_url}
                                    className="rounded-md bg-white px-3 py-2 shadow hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            ) : (
                                <span className="rounded-md bg-gray-100 px-3 py-2 text-gray-400">
                                    Next
                                </span>
                            )}
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
