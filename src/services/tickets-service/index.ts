import { requestError, notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository, { CreateTicket } from "@/repositories/tickets-repository";
import { TicketStatus } from "@prisma/client";

async function createNewTicket(ticketTypeId: number, userId: number) {
  if(!ticketTypeId) {
    throw requestError(400, "BadRequest");
  }
  console.log("antes do enrollment no service");
  const idEnrollmentByUserId = await enrollmentRepository.findWithAddressByUserId(userId); 
  if(!idEnrollmentByUserId) {
    throw notFoundError();
  }

  console.log("antes do ticketType no service");
  const ticketType = await ticketRepository.getTicketTypeById(ticketTypeId);
  console.log("antes do newTicket no service");
  
  const ticket = {
    status: TicketStatus.RESERVED,
    ticketTypeId: ticketType.id,
    enrollmentId: idEnrollmentByUserId.id
  } as CreateTicket;

  const newTicket = await ticketRepository.createNewTicket(ticket);
  console.log(newTicket);
  return {
    ...newTicket,
    TicketType: ticketType
  };
}

async function getAllTicketTypes() {
  const result = await ticketRepository.getAllTicketTypes();

  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function getUserTickets(userId: number) {
  const { id: enrollmentId } = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollmentId) {
    throw notFoundError();
  }

  const ticketByEnrollment = await ticketRepository.getTicketByEnrollmentId(enrollmentId);
  if(!ticketByEnrollment) {
    throw notFoundError();
  }

  const typeTicket = await ticketRepository.getTicketTypeById(ticketByEnrollment.ticketTypeId);
  if(!typeTicket) {
    throw notFoundError();
  }

  return {
    ...ticketByEnrollment,
    TicketType: typeTicket
  };
}

const ticketsService = {
  createNewTicket,
  getAllTicketTypes,
  getUserTickets
};

export default ticketsService;
