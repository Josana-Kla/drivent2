import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function createNewTicket(ticket: CreateTicket) {
  console.log("funcao create tickect no repository");
  console.log(ticket);
  const resolve = await prisma.ticket.upsert({
    where: { id: ticket.id || 0 },
    create: ticket as CreateNewTicketParams,
    update: ticket
  });
  console.log(resolve);
  return resolve;
}

async function getTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { 
      enrollmentId: enrollmentId 
    }
  });
}

async function getTicketTypeById(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: { 
      id: ticketTypeId 
    }
  });
}

async function getAllTicketTypes() {
  return prisma.ticketType.findMany();
}

async function getUserTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId }
  });
}

export type CreateTicket = Partial<Ticket>;
export type CreateNewTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;

const ticketRepository = {
  createNewTicket,
  getTicketByEnrollmentId,
  getTicketTypeById,
  getAllTicketTypes,
  getUserTickets
};

export default ticketRepository;
