/* 
 * Put the correct implementation of incorrect.js here.
 */

//spacing

async function pullFirstUser(userIds) {
  for (let i = 0; i < userIds.length; i++) {
        let user = await models.user.findOne({_id: userIds[i]});
    if (user) return user;
  };
}
module.exports.pullFirstUser = pullFirstUser;


async function pullPaymentsForUsers(users) {
  let result = [];
  for (let i = 0; i < users.length; i++) {
    let payments = await models.payment.find({user: users[i]._id})
    result.push(payments);
    }
  return result; // array of array with payments (the first array should contain payments for the first user)
}
module.exports.pullPaymentsForUsers = pullPaymentsForUsers;


function convertToStr(num) {
  if (num && !isNaN(num)) return num.toString();
}
module.exports.convertToStr = convertToStr;

async function getPaymentWithUser(paymentId) {
  let payment = await models.payment.find({_id: paymentId});
  if (payment[0]) {
    let user = await models.user.find({_id: payment[0].user});
    if (user[0]) {
      payment[0].user = user[0]
    }
  }
    return payment;
}
module.exports.getPaymentWithUser = getPaymentWithUser;

async function getGroupedUserPmts(userIds) {
  let result = {};
    let payments = await models.payment.find({active: true});
  userIds.forEach(userId => {
    usersPayments = payments.filter(payment => userId == payment.user);
    result[userId] = usersPayments;
    });
  return result;
}
module.exports.getGroupedUserPmts = getGroupedUserPmts;