const controllerHelper = {
	monthLookup: function (month) {
		let monthNum = month.toString();

		months = {
			'1': 'jan',
			'2': 'feb',
			'3': 'mar',
			'4': 'apr',
			'5': 'may',
			'6': 'jun',
			'7': 'jul',
			'8': 'aug',
			'9': 'sep',
			'10': 'oct',
			'11': 'nov',
			'12': 'dec'
		}
		//lowercase every month
		return months[monthNum];
	},

	getCurrentMonth: function () {
		
		let currentDate = new Date(Date.now()),
			year = currentDate.getFullYear(),
			month = currentDate.getMonth() + 1;
		
		month = this.monthLookup(month);

		queryDates = {
			month, year
		} 

		return queryDates;
	},

	activeTimeframe: function (signupDate) {
		//return timeframe for the user's active months
		//in other words, if the user signed up in May of 2016
		//this function will return 
		//{ start: {year:2016, month: 5}, end: {year:2017, month: 7} }

		let currentDate = new Date(Date.now()),
			dates = [signupDate, currentDate],
			keys = ['start', 'end'],
			timeframe = {};

		for (let i=0; i<dates.length; i++) {
			let typeOfDate = dates[i],
				currentKeys = keys[i],
				monthAndYear = {};

			//getting specific numbers for signupDate and currentDate...
			let year = typeOfDate.getFullYear(),
			month = typeOfDate.getMonth() + 1;

			monthAndYear = {
				year, 
				month
			};
			
			timeframe[currentKeys] = monthAndYear;
		}
		
		return timeframe;
	},

	monthsActive: function (timeframe) {
		//reutrn all of the months active in array 
		//of obj containting all of the months between 
		//the user's signup date and the current month

		let activeMonths = [];

		let endYear = timeframe.end.year,
			endMonth = timeframe.end.month;
		
		let month = timeframe.start.month,
			year = timeframe.start.year;
		
		while (true) {
			let monthAndYear = {
				year,
				month: this.monthLookup(month)
			}
			activeMonths.unshift(monthAndYear);
			if (month === endMonth && year === endYear) {
				return activeMonths;
			}

			month += 1;

			if (month === 13) {
				month = 1;
				year += 1;
			}
		}
		return false; //debugging purposes
	}	
}

module.exports = { controllerHelper };