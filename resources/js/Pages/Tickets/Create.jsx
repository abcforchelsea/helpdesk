import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TicketForm from "@/Components/TicketForm";

export default function Create({ options }) {
    return (
        <AuthenticatedLayout header="New Ticket">
            <Head title="New Ticket" />
            <div className="mx-auto max-w-3xl px-4 py-6">
                <TicketForm options={options} />
            </div>
        </AuthenticatedLayout>
    );
}
