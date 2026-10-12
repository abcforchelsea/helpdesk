import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TicketForm from "@/Components/TicketForm";

export default function Edit({ ticket, options }) {
    return (
        <AuthenticatedLayout header="Edit Ticket">
            <Head title="Edit Ticket" />
            <div className="mx-auto max-w-3xl px-4 py-6">
                <TicketForm ticket={ticket} options={options} />
            </div>
        </AuthenticatedLayout>
    );
}
