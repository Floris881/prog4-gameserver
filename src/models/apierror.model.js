class ApiError {

	constructor(msg, code) {
		this.msg = msg;
		this.code = code;
		this.date = new Date()
	}
}

module.exports = ApiError;