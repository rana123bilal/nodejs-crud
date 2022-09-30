CREATE TABLE user (
    id TEXT,
    login TEXT,
    password TEXT,
    age INTEGER,
    isDeleted BOOLEAN,
);

CREATE TABLE group
(
    id   text not null
        primary key,
    name text
);

CREATE TABLE public.groups-user
(
    "userId" text,
    "groupId" text,
    CONSTRAINT "userId" FOREIGN KEY ("userId")
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);


INSERT INTO user (login, password, age, id) VALUES ('bilal', 'doe', 25, 'a192e125-8387-40c5-816f-ab344b25b15f');

INSERT INTO public."group"(id, name, permissions)VALUES ('1', 'bilal', ['read']);