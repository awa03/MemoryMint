package models

import (
	"gorm.io/gorm"
)


type Class struct {
    gorm.Model  
    Name        string  `gorm:"uniqueIndex;not null"`
    Description string
    Sets []Set `gorm:"many2many:class_sets"`
}
