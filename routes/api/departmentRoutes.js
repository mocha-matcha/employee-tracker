const router = require('express').Router();
const db = require('../../connection');
// This route uses async/await with '.catch()' for errors
// and no HTTP status codes
router.get('/', async (req, res) => {
	db.query('SELECT * FROM department', (err, results) => {
		if (err) { console.log(err); } else {
			console.log(results);

			return res.json(results);
		}
	})

});

// This route uses async/await with try/catch for errors
// along with HTTP status codes
router.post('/', async (req, res) => {
	
let values = [req['name']];
db.query(`INSERT into department (name) VALUES ?`,[values])
}
);

module.exports = router;
