const { Mailer } = require("../config");
const {TicketRepository} = require("../repositories");

const ticketRepository = new TicketRepository();

async function sendMail(emailFrom, emailTo, subject, text) {
  try {
    const response = await Mailer.sendMail({
      from: emailFrom,
      to: emailTo,
      subject,
      text,
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createTicket(data) {
  try {
    const response = await ticketRepository.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getPendingEmails() {
  try {
    const response = await ticketRepository.getPendingEmails();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports = {
  sendMail,
  createTicket,
  getPendingEmails
};
