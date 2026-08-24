import { createFileRoute } from "@tanstack/react-router";

import { Reservas } from "@/components/reservas/reservas-page";

export const Route = createFileRoute("/reservas")({ component: Reservas });
