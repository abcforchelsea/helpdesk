import { useForm, Link } from "@inertiajs/react";

export default function TicketForm({ ticket, options }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: ticket?.title ?? "",
        description: ticket?.description ?? "",
        priority: ticket?.priority ?? "Medium",
        status: ticket?.status ?? "Open",
        category: ticket?.category ?? "Software",
    });

    const submit = (e) => {
        e.preventDefault();
        if (ticket) {
            put(route("tickets.update", ticket.id));
        } else {
            post(route("tickets.store"));
        }
    };

    const input =
        "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500";
    const err = (f) =>
        errors[f] && <p className="mt-1 text-sm text-red-600">{errors[f]}</p>;

    const select = (name, label, list) => (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                className={input}
                value={data[name]}
                onChange={(e) => setData(name, e.target.value)}
            >
                {list.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
            {err(name)}
        </div>
    );

    return (
        <form
            onSubmit={submit}
            className="space-y-4 rounded-lg bg-white p-4 shadow sm:p-6"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    className={input}
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                />
                {err("title")}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    rows="5"
                    className={input}
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                />
                {err("description")}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {select("priority", "Priority", options.priorities)}
                {select("status", "Status", options.statuses)}
                {select("category", "Category", options.categories)}
            </div>
            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                    {processing
                        ? "Saving..."
                        : ticket
                        ? "Update Ticket"
                        : "Create Ticket"}
                </button>
                <Link
                    href={route("tickets.index")}
                    className="text-sm text-gray-600 hover:underline"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
