-- public.gifts definition

-- Drop table

-- DROP TABLE public.gifts;

CREATE TABLE public.gifts (
	title varchar NOT NULL,
	points_needed int4 NOT NULL,
	reviews float8 NOT NULL,
	stocks int4 NOT NULL,
	id int8 NOT NULL,
	CONSTRAINT gifts_pk PRIMARY KEY (id)
);

ALTER TABLE gifts ALTER COLUMN id set default nextval('gifts_seq') ;