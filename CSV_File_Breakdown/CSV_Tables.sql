-- Dropping tables if they exist
DROP TABLE IF EXISTS nyc_arson;
DROP TABLE IF EXISTS nyc_larceny_vehicles;
DROP TABLE IF EXISTS nyc_murder;

-- Creating "nyc_murder" table
CREATE TABLE "nyc_murder" (
    "cmplnt_num" VARCHAR NOT NULL,
    "cmplnt_fr_dt" DATE NOT NULL,
    "cmplnt_ft_tm" TIME NOT NULL,
    "OFNS_DESC" VARCHAR NOT NULL,
    "Latitude" NUMERIC NOT NULL,
    "Longitude" NUMERIC NOT NULL
);

-- Creating "nyc_arson" table
CREATE TABLE "nyc_arson" (
    "cmplnt_num" VARCHAR NOT NULL,
    "cmplnt_fr_dt" DATE NOT NULL,
    "cmplnt_ft_tm" TIME NOT NULL,
    "OFNS_DESC" VARCHAR NOT NULL,
    "Latitude" NUMERIC NOT NULL,
    "Longitude" NUMERIC NOT NULL
);

-- Creating "nyc_larceny_vehicles" table
CREATE TABLE "nyc_larceny_vehicles" (
    "cmplnt_num" VARCHAR NOT NULL,
    "cmplnt_fr_dt" DATE NOT NULL,
    "cmplnt_ft_tm" TIME NOT NULL,
    "OFNS_DESC" VARCHAR NOT NULL,
    "Latitude" NUMERIC NOT NULL,
    "Longitude" NUMERIC NOT NULL
);

ALTER TABLE "nyc_murder" 
ALTER COLUMN "Latitude" DROP NOT NULL, 
ALTER COLUMN "Longitude" DROP NOT NULL;


SELECT * FROM nyc_murder