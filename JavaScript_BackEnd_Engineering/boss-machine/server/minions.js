const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {

	try {
		const minion = getFromDatabaseById('minions', id);

		if (!minion) return res.status(404).send('No such minion employed here!');

		req.minion = minion;
		next();
	} catch (err) {
		return res.status(500).send(err.message);
	}
})

minionsRouter.get('/', (req, res, next) => {
	try {
		const minionsArr = getAllFromDatabase('minions');

		if (!minionsArr) return res.status(404).send();

		res.send(minionsArr);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});


minionsRouter.post('/', (req, res, next) => {

	try {
		if (!req.body || !req.body.name) return res.status(400).send('Minion needs to have a name');

		if (!req.body.salary) return res.status(400).send('Minions don\'t work for free! They need a salary.');

		const newMinion = addToDatabase('minions', {...req.body})
		return res.status(201).send(newMinion);

	} catch (err) {
		return res.status(500).send(err.message);
	}

});

minionsRouter.get('/:minionId', (req, res, next) => {
		res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {

	try {
		const dataToUpdate = {...req.minion, ...req.body};

		const updatedMinion = updateInstanceInDatabase('minions', dataToUpdate);

		if (!updatedMinion) { return res.status(400).send('Something went wrong with the update') }

		res.send(updatedMinion);

	} catch (err) {
		return res.status(500).send(err.message);
	}
});

minionsRouter.delete('/:minionId', (req, res, next) => {

	try {
		const isDeleted = deleteFromDatabasebyId('minions', req.params.minionId);

		if (!isDeleted) { return res.status(400).send('Something went horribly wrong!') }

		res.status(204).send('Successfully deleted!');
	} catch (err) {
		res.status(500).send(err.message);
	}

});

