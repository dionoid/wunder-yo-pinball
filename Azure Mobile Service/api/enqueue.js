exports.get = function(request, response) {
	var username = request.query.username;

	//add username to WaitingList only if username doesn't already exist
	var sql = "INSERT INTO WaitingList(username) "+
	"SELECT ? WHERE NOT EXISTS (SELECT 1 FROM WaitingList WHERE username = ?)";
	var mssql = request.service.mssql;

	mssql.query(sql, [username, username],{
		success: function(results) {
			response.send(statusCodes.OK, results);
		}
	})
};
