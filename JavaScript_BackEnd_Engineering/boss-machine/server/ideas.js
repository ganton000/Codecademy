const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
	addToDatabase,
	getAllFromDatabase,
	getFromDatabaseById,
	updateInstanceInDatabase,
	deleteFromDatabasebyId,
} = require('./db');


ideasRouter.param('ideaId', (req, res, next, id) => {

	try {
		const found = getFromDatabaseById('ideas', id);

		if (!found) { res.status(404).send('This idea has not yet been discovered!'); }
		req.idea = idea;
		next();
	} catch (err) {
		res.status(500).send(err.message);
	}
});

ideasRouter.get('/', (req, res, next) => {

	try {
		const found = getAllFromDatabase('ideas');

		if (!found) return res.status(404).send('Resource not found!')

		res.send(found);
	} catch(err) {
		res.status(500).send(err.message);
	}
});

ideasRouter.post('/', (req, res, next) => {

	try {
		if (!req.body) return res.status(400).send('Please provide us with an idea.');

		if (!req.body.name) return res.status(400).send('What is the name of your idea?')

		if (!req.body.numWeeks || !req.body.weeklyRevenue) {
			return res.status(400).send('We need an estimate of weeklyRevenue and numWeeks to assign to this idea')
		}

		const newIdea = addToDatabase('ideas', { ...req.body});

		if (!newIdea) return res.status(500).send('Something went horribly wrong!')

		res.status(201).send('Your idea has been approved!');

	} catch(err) {
		res.status(500).send(err.message);
	}
});

ideasRouter.get('/:id', (req, res, next) => {
		res.send(req.idea);
});

ideasRouter.put('/:id', (req, res, next) => {

	try {

		const updatedIdea = updateInstanceInDatabase('ideas', { ...req.idea, ...req.body} );

		if (!updatedIdea) return res.status(500).send('Something went wrong!');

		res.send(updatedIdea);

	} catch(err) {
		res.status(500).send(err.message);
	}
});

ideasRouter.delete('/:id', (req, res, next) => {
	try {

		const found = getFromDatabaseById('ideas', req.params.ideaId);

		if (!found) return res.status(404).send('There are no such ideas being implemented!')

		const isDeleted = deleteFromDatabasebyId('ideas',  req.params.ideaId);

		if (!isDeleted) return res.status(500).send('Could not delete this idea!');

		res.status(204).send('Idea has been removed');

	} catch(err) {
		res.status(500).send(err.message);
	}
});