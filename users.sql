-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	email varchar NOT NULL,
	password varchar NOT NULL,
	id int8 NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);

ALTER TABLE users ALTER COLUMN id set default nextval('users_seq') ;