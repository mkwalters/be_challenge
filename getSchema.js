

const models = require("./models");
const mongoose = require("mongoose");
const connection = mongoose.createConnection("mongodb://localhost:27017/clerkie_challenge");
const
	Schema = mongoose.Schema;



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
async function getUsers() {
    let users = await models.user.find({});
    console.log(users);
}


//5f12105578642aa3baf780d0
//5f1215d03f9c94a4616d33fc
//5f12161c2e70e5a48f779673
async function createUser() {

    let userSchema = new Schema({
        active: {type: Boolean, default: true},
        paid: Boolean,
        signup_date: Boolean,
    
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    });

    let user = connection.model("User", userSchema)
    let newUser = new user({paid: false})
    newUser.save(function (err) {
        if (err) return handleError(err);
        // saved!
      });
    console.log(newUser);
}

async function createPayment() {

    let paymentSchema = new Schema({
        name: String,
        active: {type: Boolean, default: true},
        amount: Number,
        date: Date,
        user: {type: Schema.Types.ObjectId, ref: "User"},
    
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    });


    let payment = connection.model("Payment", paymentSchema)
    let newPayment = new payment({name: "C", amount: 3000, user: "5f1215d03f9c94a4616d33fc"})
    newPayment.save(function (err) {
        if (err) return handleError(err);
        // saved!
      });
    console.log(newPayment);
}



async function getPayments() {
    let payments = await models.payment.find({});
    console.log(payments);
}


// this is basically done we just need to check if values are present
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

async function main() {
    
    await getGroupedUserPmts(["5f12105578642aa3baf780d0",
        "5f1215d03f9c94a4616d33fc",
        "5f12161c2e70e5a48f779673"])

    await getPaymentWithUser(mongoose.Types.ObjectId("5f121919055aa0a556ccab83"))

    let num = convertToStr(5)
    console.log(num);

    await pullPaymentsForUsers([ {"_id": mongoose.Types.ObjectId("5f12105578642aa3baf780d0") },
                            {"_id": mongoose.Types.ObjectId("5f1215d03f9c94a4616d33fc") },
                            {"_id": mongoose.Types.ObjectId("5f12161c2e70e5a48f779673") } ])

    await pullFirstUser(["5f12105578642aa3baf780d0",
        "5f1215d03f9c94a4616d33fc",
        "5f12161c2e70e5a48f779673"])

    // await createPayment();
    // await createUser();
    // await getUsers();
    // await getPayments();
}

main()