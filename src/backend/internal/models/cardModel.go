package models

import (
	"gorm.io/gorm"
  "time"
)

type Card struct {
    gorm.Model  
    Front        string    `gorm:"type:text;not null"`
    Back         string    `gorm:"type:text;not null"`
    SetID uint `gorm:"not null;index"`

    // Determine flashcard order
    ReviewCount  int       `gorm:"default:0"`
    CorrectCount int       `gorm:"default:0"`
    WrongCount   int       `gorm:"default:0"`
    LastReviewed time.Time
    NextReview   time.Time
    LastScore    int       `gorm:"not null"`
}


