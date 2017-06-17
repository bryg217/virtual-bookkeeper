const { Expenditure } = require('../model/expenditureModel');
const { User } = require('../model/userModel');

const expenditureController =  {
	getExpenditure: function (req, res) {
		Expenditure
			.findById(req.params.expenditureId, function (err, expenditure) { //this is using params for now	
				if (err) {
					res.status(500).json({ errorMessage: 'Internl Server Error' });
				}
				res.status(200).json(expenditure.apiRepr());
			})
	},

	//create expenditure 
	createExpenditure: function (req, res) {
		//must take in some new information from the user
		//then take all of that information and then create it. 
		let newExpenditure = new Expenditure ({
			'user': req.body.user,
			'amount': req.body.amount,
			'expenseName': req.body.expenseName
		})

		//so after we have that new guy ... we just need to take him and save him. 
		newExpenditure.save(function (err, expenditure) {
			if (err) {
				res.status(500).json({ errorMessage: 'Internal Server Error' });
			}

			User
				.findByIdAndUpdate(req.body.user, { $push : { expenditures: expenditure._id } }, function (err) {
					if (err) {
						res.status(500).json({ errorMessage: 'Internal Server Error' });
					}
					res.status(201).json(expenditure.apiRepr());
				})
		})
	}
}

module.exports = { expenditureController }