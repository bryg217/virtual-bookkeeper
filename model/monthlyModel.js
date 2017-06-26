const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const monthlySchema = mongoose.Schema({ 
	//the information that we need: the month, 
	//year, expenditures, amount saved, total expenses for month 
	//and income. On top of that, the user which owns that monthly
	//db entity. 
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	month: { type: String, required: true },
	year: { type: Number, required: true },
	income: { type: Float, default: 0 },
	expenses: { type: Float, default: 0 },
	netIncome: { type: Float, default: 0 },
	goal: { type: Number, default: 0 },
	expenditures: [{ expenseName: String, amount: Number }]
});

monthlySchema.methods.monthlyAPIRepr = function() { 
	return {
		user: this.user, 
		month: this.month,
		year: this.year, 
		income: this.income, 
		expenses: this.expenses,
		netIncome: this.netIncome,
		goal: this.goal,
		expenditures: this.expenditures
	}
}

const Month = mongoose.model('Month', monthlySchema);

module.exports = { Month };