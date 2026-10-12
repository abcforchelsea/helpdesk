const priorityColors = {
    Low: "bg-gray-100 text-gray-700",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Urgent: "bg-red-100 text-red-700",
};

const statusColors = {
    Open: "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Resolved: "bg-purple-100 text-purple-700",
    Closed: "bg-gray-200 text-gray-700",
};

const base = "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold";

export function PriorityBadge({ value }) {
    return <span className={`${base} ${priorityColors[value]}`}>{value}</span>;
}

export function StatusBadge({ value }) {
    return <span className={`${base} ${statusColors[value]}`}>{value}</span>;
}
