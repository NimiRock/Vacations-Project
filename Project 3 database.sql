CREATE DATABASE project_three_vacations;

CREATE TABLE users(
	user_id int auto_increment,
    user_fname varchar(255) not null,
    user_lname varchar(255) not null,
    user_username varchar(255) not null,
    user_password text not null,
    user_role varchar(255) default "user",
    primary key(user_id)
);


CREATE TABLE vacations_list(
	vacation_id int auto_increment,
    vacation_destination varchar(255) not null,
    vacation_description text not null,
    vacation_arrival_date varchar(255) not null,
    vacation_leave_date varchar(255) not null,
    vacation_price int not null,
    vacation_img_url text not null,
    primary key(vacation_id)
);


CREATE TABLE vacation_followers(
	follow_id int auto_increment,
    following_user_id int not null,
    following_vacation_id int not null,
    primary key(follow_id),
    foreign key (following_user_id) references users(user_id),
    foreign key (following_vacation_id) references vacations_list(vacation_id)
);

INSERT INTO users(user_fname, user_lname, user_username, user_password, user_role)
values("admin", "admin", "admin", "admin", "admin"),
("blahblah", "blahblah", "blahblah", "blahblah", "user"),
("John", "Doe", "john", "blahblah", "user"),
("Jane", "Doe", "jane", "blahblah", "user");

INSERT INTO vacations_list(vacation_destination, vacation_description, vacation_arrival_date, vacation_leave_date, vacation_price, vacation_img_url)
values("Moscow","The first ever McDonald’s in the USSR opened in Moscow in 1990 and is still in operation. Moscow claims the largest number of billionaires in the world. Per Forbes, there are 84 billionaires in the city", "12/05/2021", "20/05/2021", "1200", "https://realrussia.co.uk/portals/0/images/Moscow%20St%20Basils%20Cathedral.jpg"),
("Egypt","Cats were considered to be a sacred animal by the Ancient Egyptians. It’s thought that most families kept a cat as a pet, which they believed would bring the household good luck!", "01/09/2021", "13/09/2021", "800", "https://www.worldtravelguide.net/wp-content/uploads/2017/04/Think-Egypt-Giza-Sphynx-178375366-pius99-copy.jpg"),
("Dublin","Dublin or Dubh Linn is derived from the Old Irish Gaelic, which has its literal meaning “Black Pool”. The Dubh Linn was a lake used by the Vikings to moor their trade ships and was connected to the Liffey by the River Poddle.", "30/08/2022", "10/09/2022", "3200", "https://www.planetware.com/photos-large/IRL/ireland-dublin-day-trips-cliffs-of-moher.jpg"),
("Tbilisi","Georgia is the birthplace of wine. It was accidentally produced for the first time between eight to ten thousand years ago in the Caucasian region. The wine was created by the incidental fermentation on grapes that was later forgotten in a container.", "19/04/2021", "31/05/2021", "2000", "https://images.squarespace-cdn.com/content/v1/57ab8ac6ebbd1abd4fd4e424/1548793753153-IC3HU6NQ9ZO5JD9HK5FP/ke17ZwdGBToddI8pDm48kO7Rg1Gpu728H4UqxUIfecJZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PICj5SdZHY9KUswDgTH3eH8sP5PrkY15Dr7CE2CPSRiTEKMshLAGzx4R3EDFOm1kBS/18A_0021.jpg?format=750w"),
("Stockholm","The term Stockholm Syndrome originated from one of Sweden’s most famous crimes. During this six-day bank siege at Norrmalmstorg in 1973, hostages began to identify with their captors. The enormous charm of career criminal Clark Olofsson is considered a key reason for this happening.", "25/07/2021", "15/08/2021", "3500", "https://assets.kpmg/content/dam/kpmg/xx/images/2019/07/blue-water-around-the-trees-and-buildings-sweden.jpg/jcr:content/renditions/cq5dam.web.787.99999.jpg"),
("New-York","More than 800 languages are spoken in New York City, making it the most linguistically diverse city in the world. 4 in 10 households speak a language other than English.", "24/12/2020", "02/01/2021", "3000", "https://blog-www.pods.com/wp-content/uploads/2019/04/MG_1_1_New_York_City-1.jpg"),
("Iceland","Have you ever seen the Aurora before? And did you know many Icelanders believe in elves", "04/05/2021", "20/05/2021", "3500", "https://cdn.britannica.com/06/171306-050-C88DD752/Aurora-borealis-peninsula-Snaefellsnes-Iceland-March-2013.jpg"),
("Berlin","Berlin is the only European city that has more museums than rainy days? On average there are 99 rainy days a year, and there are around 175 museums.", "08/08/2021", "15/08/2021", "1500", "https://study-eu.s3.amazonaws.com/uploads/image/path/171/wide_fullhd_14798621115_bcba1d1e7b_o.jpg"),
("Monaco","Monaco is a tiny European country that is 1,000 times smaller than the smallest U.S. state, Rhode Island! The country is described as hilly, rugged, and rocky.", "30/03/2021", "08/04/2021", "2100", "https://cdn-image.departures.com/sites/default/files/styles/responsive_900x600/public/1563898520/monaco-views-MONACO0719.jpg?itok=UGZGd93a");


INSERT INTO vacation_followers(following_user_id, following_vacation_id)
values(3,6), (4,3), (4,5), (3,2), (2,6), (3,5), (2,4), (2,9);