package json

import (
  "errors"
	"gorm.io/gorm"
  "time"
  "main/internal/models"
)

type CardJSON struct {
  ID           uint   `json:"id,omitempty"`
  Front        string `json:"front"`
  Back         string `json:"back"`
  SetID        uint   `json:"set_id"`
  ReviewCount  int    `json:"review_count,omitempty"`
  CorrectCount int    `json:"correct_count,omitempty"`
  WrongCount   int    `json:"wrong_count,omitempty"`
  LastReviewed string `json:"last_reviewed,omitempty"`
  NextReview   string `json:"next_review,omitempty"`
  LastScore    int    `json:"last_score"`
  CreatedAt    string `json:"created_at,omitempty"`
  UpdatedAt    string `json:"updated_at,omitempty"`
}

func (c *CardJSON) Verify() error {
    if c.Front == "" {
        return errors.New("card front cannot be empty")
    }
    if c.Back == "" {
        return errors.New("card back cannot be empty")
    }
    if c.SetID == 0 {
        return errors.New("card must belong to a set")
    }
    return nil
}

func (c *CardJSON) ToDB() interface{} {
    lastReviewed, _ := time.Parse(time.RFC3339, c.LastReviewed)
    nextReview, _ := time.Parse(time.RFC3339, c.NextReview)
    
    return &models.Card{
        Model: gorm.Model{ID: c.ID},
        Front: c.Front,
        Back: c.Back,
        SetID: c.SetID,
        ReviewCount: c.ReviewCount,
        CorrectCount: c.CorrectCount,
        WrongCount: c.WrongCount,
        LastReviewed: lastReviewed,
        NextReview: nextReview,
        LastScore: c.LastScore,
    }
}
