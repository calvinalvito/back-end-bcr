import User from "../models/Users";

class UserRepository {
  //Create
  async createUser(user: Partial<User>) {
    return User.query().insert(user);
  }
  //Find by Id
  async findById(id: number) {
    return User.query().findById(id);
  }
  //Find by Email
  async findByEmail(email: string) {
    return User.query().findOne({ email });
  }
  //Update
  async update(id: number, user: Partial<User>) {
    return User.query().patchAndFetchById(id, user);
  }
  //Delete
  async delete(id: number) {
    return User.query().deleteById(id);
  }
  //Get All Data
  async findAll() {
    return User.query().select();
}
  
}

export default new UserRepository();
