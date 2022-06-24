const meetingsRouter = require('express').Router();

module.exports = meetingsRouter;

const {
	addToDatabase,
	getAllFromDatabase,
	deleteAllFromDatabase,
	createMeeting
} = require('./db');


meetingsRouter.get('/', (req, res, next) => {

	try {
		const found = getAllFromDatabase('meetings');

		if (!found) return res.status(404).send('Resource not found!')

		res.send(found);
	} catch(err) {
		res.status(500).send(err.message);
	}
});

meetingsRouter.post('/', (req, res, next) => {
	try {

		if(!req.body) {
			let newMeeting = addToDatabase('meetings', createMeeting());
  			res.status(201).send(newMeeting)
		};

		const newMeeting = addToDatabase('meetings', req.body);

		if (!newMeeting) return res.status(500).send('Error creating the new meeting!');

		res.status(201).send(newMeeting);

	} catch(err) {
		res.status(500).send(err.message);
	}
});

meetingsRouter.delete('/', (req, res, next) => {
	try {

		const isDeleted = deleteAllFromDatabase('meetings');

		if (isDeleted === null) return res.status(500).send('Could not delete meetings, something went wrong');

		res.status(204).send('Meetings have been deleted!');

	} catch(err) {
		res.status(500).send(err.message);
	}
});
