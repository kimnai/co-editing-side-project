CREATE TABLE user_info(
	user_name VARCHAR(20),
	email VARCHAR(40),
	password VARCHAR(100),
	date_created VARCHAR(100),
	source VARCHAR(20),
	refresh_token VARCHAR(100),
	PRIMARY KEY(email)
);