// 3 types of users:
// guest - can only register, login, and see content pages;
// client - we know this, cause he was able to login, can create and update records (only for himself);
// assistant - can update records of clients (approve, disapprove)
// base on type of user we determine possible actions and routes for user
export default {
  isGuest: true,
  isClient: false,
  isAssistant: false,
}
