CREATE TABLE `posts` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`created_at` timestamp(2) NOT NULL DEFAULT now(2),
	`content` varchar(256) NOT NULL,
	`author_id` varchar(256) NOT NULL);

CREATE UNIQUE INDEX author_idx ON posts (`author_id`);