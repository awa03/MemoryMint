package initializers

import (
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

var DB *sqlx.DB

func InitDB() {
	dbFile := "./db/mydb.sqlite3"

	DB, err := sqlx.Open("sqlite3", dbFile)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Database created successfully or already exists.")

	createTable := `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    );
    `
	_, err = DB.Exec(createTable)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Table created successfully or already exists.")
}
