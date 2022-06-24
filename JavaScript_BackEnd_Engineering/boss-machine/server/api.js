const express = require('express');
const apiRouter = express.Router();
const {
createMeeting,
getAllFromDatabase,
getFromDatabaseById,
addToDatabase,
updateInstanceInDatabase,
deleteFromDatabasebyId,
deleteAllFromDatabase
} = require('./db');



//Minions Routes
apiRouter.get('/minions', (req, res, next) => {
	try {
		const minionsArr = getAllFromDatabase('minions');

		if (!minionsArr) return res.status(404).send();

		res.send(minionsArr);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});


apiRouter.post('/minions', (req, res, next) => {

	try {
		if (!req.body || !req.body.name) return res.status(400).send('Minion needs to have a name');

		if (!req.body.salary) return res.status(400).send('Minions don\'t work for free! They need a salary.');

		const newMinion = addToDatabase('minions', {...req.body})
		return res.status(201).send(newMinion);

	} catch (err) {
		return res.status(500).send(err.message);
	}

});

apiRouter.get('/minions/:minionId', (req, res, next) => {

	try {
		const minionId = req.params.minionId;

		const found = getFromDatabaseById('minions', minionId);

		if (!found) { return res.status(404).send('Minion does not exist!') }

		res.send(found);

	} catch (err) {
		return res.status(500).send(err.message);
	}
});

apiRouter.put('/minions/:minionId', (req, res, next) => {

	try {
		const minionId = req.params.minionId;

		const found = getFromDatabaseById('minions', minionId);

		if (!found) { return res.status(404).send('Minion does not exist!') }

		const dataToUpdate = {...found, ...req.body};

		const updatedMinion = updateInstanceInDatabase('minions', dataToUpdate);

		if (!updatedMinion) { return res.status(400).send('Something went wrong with the update') }

		res.send(updatedMinion);

	} catch (err) {
		return res.status(500).send(err.message);
	}
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {

	try {
		const isDeleted = deleteFromDatabasebyId('minions', req.params.minionId);

		if (!isDeleted) { return res.status(400).send('Something went horribly wrong!') }

		res.status(204).send('Successfully deleted!');
	} catch (err) {
		res.status(500).send(err.message);
	}

});


//Ideas Routes
apiRouter.get('/ideas', (req, res, next) => {

	try {
		const found = getAllFromDatabase('ideas');

		if (!found) return res.status(404).send('Resource not found!')

		res.send(found);
	} catch(err) {
		res.status(500).send(err.message);
	}
});

apiRouter.post('/ideas', (req, res, next) => {

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

apiRouter.get('/ideas/:ideaId', (req, res, next) => {

	try {

		const found = getFromDatabaseById('ideas', req.params.ideaId);

		if (!found) return res.status(404).send('There are no such ideas being implemented!')

		res.send(found);

	} catch(err) {
		res.status(500).send(err.message);
	}
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {

	try {

		const found = getFromDatabaseById('ideas', req.params.ideaId);

		if (!found) return res.status(404).send('There are no such ideas being implemented!');

		const updatedIdea = updateInstanceInDatabase('ideas', { ...found, ...req.body} );

		if (!updatedIdea) return res.status(500).send('Something went wrong!');

		res.send(updatedIdea);

	} catch(err) {
		res.status(500).send(err.message);
	}
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
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

//Meetings Routes
apiRouter.get('/meetings', (req, res, next) => {

	try {
		const found = getAllFromDatabase('meetings');

		if (!found) return res.status(404).send('Resource not found!')

		res.send(found);
	} catch(err) {
		res.status(500).send(err.message);
	}
});

apiRouter.post('/meetings', (req, res, next) => {
	try {

		if(!req.body) return res.status(400).send('Please provide us with meeting');

		const newMeeting = addToDatabase('meetings', req.body);

		if (!newMeeting) return res.status(500).send('Error creating the new meeting!');

		res.status(201).send(newMeeting);

	} catch(err) {
		res.status(500).send(err.message);
	}
});

apiRouter.delete('/meetings', (req, res, next) => {
	try {

		const isDeleted = deleteAllFromDatabase('meetings');

		if (isDeleted === null) return res.status(500).send('Could not delete meetings, something went wrong');

		res.status(204).send('Meetings have been deleted!');

	} catch(err) {
		res.status(500).send(err.message);
	}
});

module.exports = apiRouter;
