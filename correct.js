/* 
 * Put the correct implementation of incorrect.js here.
 */



 // asyncronisity behaves a little strange in forEach loops. 
async function pullFirstUser(userIds) {
	for (let i = 0; i < userIds.length; i++) {
        let user = await models.user.findOne({_id: userIds[i]});
        if (user) console.log(user);
		if (user) return user;
	};
}

// then takes two args? 
async function pullPaymentsForUsers(users) {
	let result = [];
	for (let i = 0; i < users.length; i++) {
		let payments = await models.payment.find({user: users[i]._id})
		result.push(payments);
    }
    console.log(result);
	return result; // array of array with payments (the first array should contain payments for the first user)
}

// only convert if num is a number.... "5" will pass right now. 
function convertToStr(num) {
	if (num && !isNaN(num)) return num.toString();
}


function getPaymentWithUser(paymentId) {
	let payment = models.payment.find({_id: paymentId});
	payment.user = models.user.find({_id: payment.user});
	return payment;
}


async function getPaymentWithUser(paymentId) {
    let payment = await models.payment.find({_id: paymentId});
    let user = await models.user.find({_id: payment[0].user});
    // console.log(user);
    // console.log(payment);
    payment[0].user = user[0]
    console.log(payment);
    return payment;
}

async function getGroupedUserPmts(userIds) {
	let result = {};
    let payments = await models.payment.find({active: true});
    console.log(payments);
	userIds.forEach(userId => {
		usersPayments = payments.filter(payment => userId == payment.user);
		result[userId] = usersPayments;
    });
    console.log(result);
	return result;
}