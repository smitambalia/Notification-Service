const CrudRepository = require("./crudRepository");

const { Ticket } = require("../models");
class TicketRepository extends CrudRepository {
  constructor() {
    super(Ticket);
  }
  async getPendingTickets() {
    const ticketsResponse = await Ticket.findAll({
        where : {
            status : "PENDING"
        }
    });
    return ticketsResponse;
  }
}

module.exports = TicketRepository;
