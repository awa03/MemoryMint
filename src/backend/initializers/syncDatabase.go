package initializers

import (
  "main/internal/models"
)

func SyncDatabase(){
  err := DB.AutoMigrate(
    &models.Card{}, 
    &models.Set{}, 
    &models.Class{},
  )
  if err != nil {
    panic("Failed To Sync Database")
  }
}
