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
    let length: number = this.users.length;
    let newId = 0;
    if (length > 0) {
      newId = parseInt(this.users[length - 1].id) + 1;
    } else {
      newId = 1;
    }
    this.users.push(user);
    this.users[length].id = newId.toString();
    return newId.toString();
  }

  getUsers() {
    return this.users;
  }

  getUserById(userId: string) {
    return this.users.find((user: { id: string }) => user.id === userId);
  }

  putUserById(user: any) {
    const objIndex = this.users.findIndex(
      (obj: { id: any }) => obj.id === user.id
    );
    const updatedUsers = [
      ...this.users.slice(0, objIndex),
      user,
      ...this.users.slice(objIndex + 1),
    ];

    this.users = updatedUsers;
    return `${user.id} update via put`;
  }

  patchUserById(user: any) {
    const objIndex = this.users.findIndex(
      (obj: { id: any }) => obj.id === user.id
    );
    let currentUser = this.users[objIndex];
    for (let i in user) {
      if (i !== 'id') {
        currentUser[i] = user[i];
      }
    }
    this.users = [
      ...this.users.slice(0, objIndex),
      currentUser,
      ...this.users.slice(objIndex + 1),
    ];

    return `${user.id} patched`;
  }

  removeUserById(userId: string) {
    const objIndex = this.users.findIndex(
      (obj: { id: any }) => obj.id === userId
    );
    this.users.splice(objIndex, 1);
    return `${userId} deleted`;
  }

  getUserByEmail(email: string) {
    return this.users.find((obj: { email: string }) => obj.email === email);
  }
}
