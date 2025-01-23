## API
```go
e.GET("/api/settings", config.GetSettings);                                 // Global Settings 

e.GET("/api/settings/users", config.GetUserSettings);                       // User Settings 
e.GET("/api/settings/users/font", config.GetUserFont);                      // Global Font
e.GET("/api/settings/users/colorscheme", config.GetUserColorScheme);        // Global Color Scheme
e.GET("/api/settings/users/notifications", config.GetUserNotifications);    // Global Notifications

e.GET("/api/settings/animations", config.GetAnimationsSettings);
e.GET("/api/settings/animations/show", config.GetAnimationsShow);
e.GET("/api/settings/animations/speed", config.GetAnimationsSpeed);

e.GET("/api/settings/audio", config.GetAudioSettings);
e.GET("/api/settings/audio/on", config.GetAudioOn);
e.GET("/api/settings/audio/correct", config.GetAudioCorrect);
e.GET("/api/settings/audio/incorrect", config.GetAudioIncorrect);

e.GET("/api/settings/cards", config.GetCardSettings);
e.GET("/api/settings/cards/on", config.GetCardFont);
e.GET("/api/settings/cards/correct", config.GetCardOrder);
e.GET("/api/settings/cards/incorrect", config.GetCardDifficulty);

e.PUT("/api/settings", config.SetSetting);
```
