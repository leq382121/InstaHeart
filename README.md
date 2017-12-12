# InstaHeart

Is a straightforward solution for your daily Instagram experience. This beautiful bot will connect to your Instagram account and starts liking images on your feed immediately or will automatically post comments you wish too!

# Requirements

For this bot to make magic, you will need:

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
node bot.js
```

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
  "minutesForAuth":2
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
 
# "mode"
 
- 0 is going to like images as much as defined in `likesToClick`.
- 1 is going to like images as much as defined in `likesToClick` and will repeat the process as many times, as defined in `sessionCounter` with pauses which time is defined by seconds in `pauseBetweenSessions`.
- 2 (`appBoxAppearing = false`) same as 1st mode, but instead of liking images, this will post comments automatically. 
- 2 (`appBoxAppearing = true`) same again, but if you get an box in the bottom that offers you to try Instagram on your phone, this will disable the box.


# Important

Make sure you don't drop down your Chrome window, rather just put it at some corner. If you drop it down, InstaHeart will lose it's mind and stop it's job. 

If you are a Windows user, you can just double-click install.bat instead of running `npm install` in temrinal. Use start.bat to run `node bot.js`. (Sorry MacOS users, .command requires full path and I have no idea about the path you are keeping your files in.)


