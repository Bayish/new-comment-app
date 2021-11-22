DROP database if exists news;
create database if not exists news;

use news;

create table if not exists posts(
    id int not null auto_increment primary key,
    title varchar(255) not null,
    description text not null,
    image varchar(255) null,
    datetime datetime default CURRENT_TIMESTAMP not null
);

create table if not exists comments(
    id int not null auto_increment primary key,
    posts_id int not null,
    author varchar(255) null,
    comment text not null,
    constraint comments_posts_id_fk
    foreign key(posts_id)
    references posts(id)
    on update restrict
    on delete cascade
);


insert into posts(title, description, image, datetime)
values ('test', 'test desc', null, 'sometime'),
       ('test2', 'test deesc2', null, 'sometime2');

insert into comments(posts_id, author, comment)
values(1, 'Baiysh', 'It works'),
       (2, 'Baiysh2', 'it has to work');


select * from posts;
select * from comments;