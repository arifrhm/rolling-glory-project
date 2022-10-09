-- public.gifts definition

-- Drop table

-- DROP TABLE public.gifts;

CREATE TABLE public.gifts (
	title varchar NOT NULL,
	points int4 NOT NULL,
	reviews float8 NOT NULL,
	stocks int4 NOT NULL
);