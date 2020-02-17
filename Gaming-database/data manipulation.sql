-- These are some Database Manipulation queries for a partially implemented Project Website 
– You will only ever be adding to the game list where the rest is more back of the site adding or already pre fixed 

Games
-- get all Games Ids,  titles, relese date, tating, current version and creators form games
SELECT * FROM `Games`

inserting info to the games table. For data point
Games Ids,  titles, relese date, tating, current version and creators form games 
INSERT INTO `Games` (`Games_ID`, `Games_Game_title`, `Games_Relese_date`, `Games_Rating`, `Games_Current_Version`, `Games_Creators`) VALUES ('4', 'filler', '21/45/1235', 'E', '1.0', 'the team');

updating all feilds
UPDATE `Games` SET `Games_ID`=[value-1],`Games_Game_title`=[value-2],`Games_Relese_date`=[value-3],`Games_Rating`=[value-4],`Games_Current_Version`=[value-5],`Games_Creators`=[value-6] WHERE 1

Delete full game data
DELETE FROM `Games` WHERE 0

Audience
SELECT * FROM `Audience`

Audience_Hardware
SELECT * FROM `Audience_Hardware`

Game_Game_Play
SELECT * FROM `Controls`

Game_Hardware
SELECT * FROM `Game_Hardware`

Game_play
SELECT * FROM `Game_play`

Genre
SELECT * FROM `Genre`

Hardware
SELECT * FROM `Hardware`


