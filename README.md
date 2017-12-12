# InstaHeart

Is a straightforward solution for your daily Instagram experience. This beautiful bot will connect to your Instagram account and starts liking images on your feed, follows people using your defined hashtag immediately or will automatically post comments you wish too!

# Requirements

For InstaHeart to make magic, you will need:

  - Google Chrome
  (Download link: https://www.google.com/chrome/browser/desktop/index.html )
  - NodeJS
  (Download link: https://nodejs.org/en/ )
  - Instagram account
  
# Usage
  
Clone/Download the files from repository to your specified folder and run command in the terminal to install npm packages after you locate yourself in the folder containing scripts: 
  
```sh
$ npm install
```

To start enjoying your Margarita and see how your iron is doing what is suppose to do - make your life easier, locate yourself in the folder, edit info.json according to your needs and run this in the terminal:

```sh
$ node bot.js
```

- *Windows users* - You can just double click install.bat file once for installation and after its finished, start.bat for using bot in the future instead of entering commands by hand.

- *Mac users* - your time will come soon..

**Make sure you don't drop down your Chrome window, rather just put it at some corner. If you drop it down, InstaHeart will lose it's mind and stop it's job.**

# info.json
everything you interested in is located in the `info.json` file. 

```sh
{
  "ignick":"nickname",
  "igpass":"password",
  "mode": 2,
  "sessionCounter": 300,
  "likesToClick":4,
  "pauseBetweenSessions":90,
  "commentsToWrite": 4,
  "comments": ["com0", "com1", "com2", "com3", "com4"],
  "appBoxAppearing":false,
  "ifAuthentificatioRequired":false,
  "minutesForAuth":2,
  "hashtag":food,
  "howmanypeopletofollowpersession":2
}
```
- `ignick` (string) is your instagram nickname.
- `igpass` (string) is your instagram password.
- `mode` (number) is the mode you wish InstaHeart use.
- `sessionCounter` (number) defines how many times liking should repeat .
- `likesToClick` (number) speaks for itself (for now - max 4 or less).
- `pauseBetweenSessions` (number) is how many seconds bot will wait between sessions to click.
- `commentsToWrite` [Array of strings] how many comments you wish to write (for now - max 4 or less).
- `comments` (number) what comments to write. InstaHeart is posting a random comments. 
- `appBoxAppearing` (boolean) here you have a Boolean stating if you have an irritating box in the bottom popping up. 
- `ifAuthentificatioRequired` (boolean) If Instagram is smart enough to determine few failed logins, set it to true and this will give you some time to autenthicate yourself. After authentication just wait remaining time and it will continue.
- `minutesForAuth` (number) If `ifAuthentificatioRequired`is set to true, this will allow you to set how fast you are able to authenticate yourself (in minutes).
- `hashtag` (string) if mode 3 is selected, this will be the hashtag used to follow and like new people using it. (write just a word without #).
- `howmanypeopletofollowpersession` (number) is how many people you want to follow per session.
 
# "mode"
 
- 0 is going to like images as much as defined in `likesToClick`.
- 1 is going to like images as much as defined in `likesToClick` and will repeat the process as many times, as defined in `sessionCounter` with pauses which time is defined in seconds `pauseBetweenSessions`.
- 2 (`appBoxAppearing = false`) same as 1st mode, but instead of liking images, this will post comments automatically. 
- 2 (`appBoxAppearing = true`) same again, but if you get an box in the bottom that offers you to try Instagram on your phone, this will disable the box.
- 3  going to follow people and like images as much as defined in `howmanypeopletofollowpersession` using hashtag defined in `hashtag` and will repeat this as many times as defined in `sessionCounter` with pauses which time is defined in seconds `pauseBetweenSessions`.


