package main

import (
	"main/initializers"
	"main/internal/api"
)

func main() {
	initializers.InitDB()
	initializers.LoadEnvVariables()
	initializers.SyncDatabase()

	api.Run()
}
