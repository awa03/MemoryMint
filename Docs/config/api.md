## API
```go
/api/settings // Handle Getting Settings

// not all traits will be directly accessible through getters

/api/settings/user/font // Get Global Font
/api/settings/user/colorscheme // Get Global Colorscheme
/api/settings/user/notifications // Bool if notifications are on

/api/settings/cards/order // Get Card Ordering Algorithm
/api/settings/cards/difficulty // Difficulty Ranking (INT)
/api/settings/cards/font // Get Card Font

/api/settings/animations/speed // Get Animation Speed 
/api/settings/animations/show // Bool if animations on

/api/settings/audio/on // Bool if audio on 
/api/settings/audio/volume // INT Volume Level
/api/settings/audio/correct  // Get Audio Path for Correct
/api/settings/audio/incorrect // Get Audio Paath for Incorrect
// Changes will be added continually to the Settings API
```
