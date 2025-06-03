const CrudRepository = require("./crud-repository");
const { User } = require("../models");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findUser(data) {
    try {
      let condition = {};

      if (/^\d{10}$/.test(data)) {
        // Looks like a 10-digit phone number
        condition.phone = data;
      } else if (typeof data === "string" && data.includes("@")) {
        // Looks like an email
        condition.email = data;
      } else {
        throw new Error("Invalid identifier: must be email or 10-digit phone");
      }

      const user = await User.findOne({
        where: condition,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
