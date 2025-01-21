package json

import (
  "errors"
  "time"
	"gorm.io/gorm"
  "main/internal/models"
)


type SetReviewJSON struct {
    ID         uint   `json:"id,omitempty"`
    SetID      uint   `json:"set_id"`
    Score      int    `json:"score"`
    Duration   int    `json:"duration,omitempty"`
    ReviewedAt string `json:"reviewed_at,omitempty"`
    CreatedAt  string `json:"created_at,omitempty"`
    UpdatedAt  string `json:"updated_at,omitempty"`
}

func (sr *SetReviewJSON) Verify() error {
    if sr.SetID == 0 {
        return errors.New("review must belong to a set")
    }
    if sr.Score < 0 {
        return errors.New("score cannot be negative")
    }
    return nil
}

func (sr *SetReviewJSON) ToDB() interface{} {
    reviewedAt, _ := time.Parse(time.RFC3339, sr.ReviewedAt)
    
    return &models.SetReview{
        Model: gorm.Model{ID: sr.ID},
        SetID: sr.SetID,
        Score: sr.Score,
        Duration: sr.Duration,
        ReviewedAt: reviewedAt,
    }
}
