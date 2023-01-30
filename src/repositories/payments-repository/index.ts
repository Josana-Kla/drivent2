import { prisma } from "@/config";
import { CardDataInput } from "@/protocols";

async function createPayment(ticketId: number, cardData: CardDataInput) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...cardData as any
    }
  });
}

async function getUserPayments() {
  return "";
}

async function getUserPaymentsByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { 
      ticketId: ticketId 
    }
  });
}

const paymentsRepository = {
  createPayment,
  getUserPayments,
  getUserPaymentsByTicketId
};

export default paymentsRepository;
