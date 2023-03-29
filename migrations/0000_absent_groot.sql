CREATE TABLE `posts` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`created_at` timestamp(2) NOT NULL DEFAULT (now()),
	`content` varchar(256) NOT NULL,
	`author_id` varchar(256) NOT NULL);

CREATE UNIQUE INDEX author_idx ON posts (`author_id`);