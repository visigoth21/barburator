CREATE TABLE `books` (
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`publication_date` integer NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`isbn` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `books_isbn_unique` ON `books` (`isbn`);