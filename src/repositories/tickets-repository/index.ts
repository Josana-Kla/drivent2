import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function createNewTicket(ticket: CreateTicket) {
  return prisma.ticket.upsert({
    where: { id: ticket.id || 0 },
    create: ticket as CreateNewTicketParams,
    update: ticket
  });
}

async function getAllTicketTypes() {
  return prisma.ticketType.findMany();
}

export type CreateTicket = Partial<Ticket>;
export type CreateNewTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;

const ticketRepository = {
  createNewTicket,
  getAllTicketTypes
};

export default ticketRepository;
