-- public.tokens definition

-- Drop table

-- DROP TABLE public.tokens;

CREATE TABLE public.tokens (
	token varchar NOT NULL,
	valid_until TIMESTAMP NOT NULL,
	id int8 NOT NULL,
	CONSTRAINT tokens_pk PRIMARY KEY (id),
	users_id int8 NOT NULL,
	CONSTRAINT fk_users_id
      FOREIGN KEY (users_id) REFERENCES users(id)
);

ALTER TABLE tokens ALTER COLUMN id set default nextval('tokens_seq') ;