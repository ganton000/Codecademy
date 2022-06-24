const checkMillionDollarIdea = (req, res, next) => {

	if (!req.body) return res.status(400).send('Must provide an idea!');

	if (!req.body.numWeeks || !req.body.weeklyRevenue) {
		return res.status(400).send('Please provide number of weeks and weekly revenue expected for the value of the idea');
	}

	totalValue = (Number(req.body.numWeeks) * Number(req.body.weeklyRevenue)) > 1000000;

	if (!totalValue) res.status(400).send('Please send us ideas with a valu of at least one million!')

	res.send('This is a million dollar idea!');
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
