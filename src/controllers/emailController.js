const { StatusCodes } = require("http-status-codes");
const { EmailService } = require("../services");

async function create(req, res) {
  try {
    const { subject, content, recepientEmail } = req.body;
    const response = await EmailService.createTicket({
      subject,
      content,
      recepientEmail,
    });
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

module.exports = {
    create
};
