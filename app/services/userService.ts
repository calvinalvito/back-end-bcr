import UserRepository from '../repositories/UserRepository';
import User from '../models/Users';


class UserService {
  //Register
  async register(userDetails: Partial<User>) {
    return UserRepository.createUser(userDetails);
  }
  //Get User by Id
  async getUserById(id: number) {
    return UserRepository.findById(id);
  }
  //Find by Email
  async findOneByEmail(email: string) {
    return UserRepository.findByEmail(email);
  }
  //Update
  async updateUser(id: number, user: Partial<User>) {
    return UserRepository.update(id, user);
  }
  //Delete
  async deleteUser(id: number) {
    return UserRepository.delete(id);
  }
  //Get All Data
  async getAllUsers() {
    return UserRepository.findAll();
  }
}

export default new UserService();
