import * as shortUUID from 'short-uuid';

export class GenericInMemoryDao {
  private static instance: GenericInMemoryDao;
  users: any = [];

  constructor() {
    console.log('Create new instance of GenericInMemoryDao');
  }

  static getInstance(): GenericInMemoryDao {
    if (!GenericInMemoryDao.instance) {
      GenericInMemoryDao.instance = new GenericInMemoryDao();
    }
    return GenericInMemoryDao.instance;
  }

  addUser(user: any) {
    return new Promise((resolve) => {
      user.id = shortUUID.generate();
      this.users.push(user);
      resolve(user.id);
    });
  }

  getUsers() {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  getUserById(userId: string) {
    return new Promise((resolve) => {
      resolve(this.users.find((user: { id: string }) => user.id === userId));
    });
  }

  putUserById(user: any) {
    const objIndex = this.users.findIndex((obj: { id: any }) => obj.id === user.id);
    const updatedUsers = [...this.users.slice(0, objIndex), user, ...this.users.slice(objIndex + 1)];
    this.users = updatedUsers;
    return new Promise((resolve) => {
      resolve(`${user.id} updated via put`);
    });
  }

  patchUserById(user: any) {
    const objIndex = this.users.findIndex((obj: { id: any }) => obj.id === user.id);
    let currentUser = this.users[objIndex];
    for (let i in user) {
      if (i !== 'id') {
        currentUser[i] = user[i];
      }
    }
    this.users = [...this.users.slice(0, objIndex), currentUser, ...this.users.slice(objIndex + 1)];

    return new Promise((resolve) => {
      resolve(`${user.id} patched`);
    });
  }

  removeUserById(userId: string) {
    const objIndex = this.users.findIndex((obj: { id: any }) => obj.id === userId);
    this.users.splice(objIndex, 1);
    return new Promise((resolve) => {
      resolve(`${userId} removed`);
    });
  }

  getUserByEmail(email: string) {
    return new Promise((resolve) => {
      const objIndex = this.users.findIndex((obj: { email: any }) => obj.email === email);
      let currentUser = this.users[objIndex];
      if (currentUser) {
        resolve(currentUser);
      } else {
        resolve(null);
      }
    });
  }
}
