exports.get = function(request, response) {

	//dequeue first username from WaitingList
	var sql = "SELECT TOP 1 username FROM WaitingList ORDER BY __createdAt ASC";
	var mssql = request.service.mssql;

	mssql.query(sql,{
		success: function(results) {
			response.send(statusCodes.OK, results);

			if (results.length == 1) {
				//remove selected username from WaitingList
				sql = "DELETE FROM WaitingList WHERE username = ?";
				mssql.query(sql, [results[0].username]);
			}
		}
	});
};
