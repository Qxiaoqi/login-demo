var user = {
	insert: 'INSERT INTO users(id, username, password) VALUE(0,?,?)',
	update: 'update users set username=?, password=? where id=?',
	delete: 'delete form users where id=?',
	queryByName: 'select * from users where username=?',
	queryAll: 'select * from users'
};

module.exports = user;