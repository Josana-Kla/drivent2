import { requestError, notFoundError } from "@/errors";
import { CardDataInput } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";

async function createPayment(userId: number, ticketId: number, cardData: CardDataInput) {
  if(!ticketId || !cardData) {
    throw requestError(400, "BadRequest");
  }

  const ticketById = await ticketRepository.getTicketsById(ticketId);
  const newPayment = await paymentsRepository.createPayment(ticketId, cardData);

  return "";
}

async function getUserPayments(userId: number, ticketId: string) {
  /* if(!ticketId) {
    return await paymentsRepository.getUserPayments(userId);
  } */

  const ticketIdToNumber = Number(ticketId);
  const paymentByTicketId = await paymentsRepository.getUserPaymentsByTicketId(ticketIdToNumber);

  if (!paymentByTicketId) {
    throw notFoundError();
  }

  return paymentByTicketId;
}

const paymentsService = {
  createPayment,
  getUserPayments
};

export default paymentsService;
