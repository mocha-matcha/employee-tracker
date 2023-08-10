const router = require('express').Router();
const { default: inquirer } = require('inquirer');
const db = require('../../connection');
// This route uses async/await with '.catch()' for errors
// and no HTTP status codes
router.get('/', async (req, res) => {



	db.query('SELECT * FROM employee', (err, results) => {
		if (err) { console.log(err); } else {
			console.log(results);

			return res.json(results);
		}
	})
});

// This route uses async/await with try/catch for errors
// along with HTTP status codes
router.post('/', async (req, res) => {

	console.log(req);
    // 200 status code means the request is successful
	//   db.query(`INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES(?,?,?,?)`,(err))
    res.status(200).json(req);
 
});

module.exports = router;
