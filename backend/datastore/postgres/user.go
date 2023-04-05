package postgres

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

const (
	port   = 5432
	user   = "postgres"
	dbname = "postgres"
)

var db *sql.DB

func Get(name string) string {
	stmt, err := db.Prepare("SELECT * FROM userinfo WHERE name=?;")
	if err != nil {
		panic(err)
	}
	defer stmt.Close()

	result := stmt.QueryRow(name)
	var name1, id string
	if err := result.Scan(&name1, &id); err != nil {
		panic(err)
	}
	return id
}

func GetToday() (string, error) {
	stmt, err := db.Prepare("SELECT current_date;")
	if err != nil {
		log.Print(err)
		return "", err
	}
	defer stmt.Close()

	result := stmt.QueryRow()
	var today string
	if err := result.Scan(&today); err != nil {
		log.Print(err)
		return "", err
	}
	return today, nil
}

func init() {
	host := os.Getenv("DATABASE_HOST_NAME")
	password := os.Getenv("DATABASE_PASSWORD")
	log.Printf("Start to connect the database host: %s\n", host)
	datastorename := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	var err error
	db, err = sql.Open("postgres", datastorename)
	if err != nil {
		panic(err)
	}
}
