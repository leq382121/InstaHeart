/*
# 
#       InstaHeart v1.3 - straighfoward instagram crawler
#       Author: Liutauras Razma
#       Date created: 2017-11-04
#       Last update: 2020-12-01
#
#       Mode 0 = clicks ammout of likes you have defined in "likesToClick" and quits.
#       Mode 1 = same but repeats liking process as many times as you set in "sessionCounter" 
#       and pauses session refresh process for as long as "pauseBetweenSessions" is defined (in seconds)
#       Mode 2 = Comments different people photos using value specified cin "comments" as many times as
#       writen in "commentsToWrite".
#       Mode 3 = Follows people and likes their image using your defined hastag. Wil lfollow as many people
#       as you wish as many times you need and will pause between sesions also, as you defined.
# 
*/

require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');
const windowWidth = 900;
const info = require('./info.json');

const nick = info.ignick;
const pass = info.igpass;
const sessionCounter = info.sessionCounter;
const likesToClick = info.likesToClick;
const pauseBetweenSessions = info.pauseBetweenSessions * 1000; //seconds
const commentsToWrite = info.commentsToWrite;
const comment = info.comments;
const irritatingBox = info.appBoxAppearing;
const mode = info.mode;
const authbool = info.ifAuthentificatioRequired;
const timeforauth = info.minutesForAuth * (60000);
const hashtag = info.hashtag;
const peopletofollow = info.howmanypeopletofollowpersession;


console.log("# Mode", mode, "is selected. Starting the process...")

const BotWorkflow = async (driver) => {
    switch (mode) {
        case 0: 
            await driver.sleep(3000);
            await driver.findElements(By.xpath("//button[contains(@class, 'wpO6b')]")).then(
                async (res) => {
                    // res is an array of targeted elemnts (hearts)
                    for (i = 0; i < (likesToClick * 5); i + 5) {
                        await console.log("*- like clicked -*");
                        await res[i].click();
                        await driver.sleep(2000 + Math.round(100 * Math.random()));
                    }
                }
            );
            break;

        case 1: 
            await driver.sleep(3000);
            await console.log("# Number of sessions:", sessionCounter);

            for (n = 0; n < sessionCounter; n++) {
                let date = new Date();

                await driver.get('http://www.instagram.com').then(function () {
                    console.log("# Initiating new session..")
                });

                await driver.sleep(3000);
                await driver.findElements(By.xpath("//*[contains(@class, 'fr66n')]//button[contains(@class, 'wpO6b')]")).then(
                    async (res) => {
                        for (let i = 0; i < likesToClick; i++) {
                            await driver.sleep(3000);
                            await console.log("*- likes clicked: ", i + 1, "-*");
                            await res[i].click();
                        }
                    }
                )

                await console.log("# Session finished. pausing for", pauseBetweenSessions / 1000, "seconds. Present time:", date.getHours() + ":" + date.getMinutes());
                await driver.sleep(pauseBetweenSessions);
            }
            break;

        case 3:  
            await driver.sleep(3000);
            console.log("#", peopletofollow, "people are going to be followed and liked per session using", "#" + hashtag, "and this will be repeated", sessionCounter, "times.");

            for (s = 0; s < sessionCounter; s++) {

                await driver.get('https://www.instagram.com/explore/tags/' + hashtag + '/').then(() => console.log("# Initiating new session. ---"));
                await driver.wait(until.elementLocated(By.className('_aabd')));
                await driver.findElements(By.className('_aabd')).then(async (res) => {

                    await res[9].click();
                    await driver.wait(until.elementLocated(By.className('_aaqg'))).then(() => console.log("# Image loaded. Liking and following.")); 
                    await driver.sleep(3000);

                    for (p = 0; p < peopletofollow; p++) {

                        // await driver.findElements(By.xpath("//button[contains(text(),'Following')]")).then(async (res) => {
                        //     if (res.length === 0) {
                        //         await driver.findElements(By.className('sqdOP')).then(async (res) => {
                        //             console.log("# Clicking follow button");
                        //             await res[0].click();
                        //         });
                        //     } else {
                        //         console.log("# Person is already being followed");
                        //         return;
                        //     }
                        // })

                        console.log("# Following people is turned off");

                        await driver.findElements(By.xpath("//*[contains(@class, '_aamw')]//button[contains(@class, '_abl-')]")).then((res) => {
                            console.log("# Clicking <3 button");
                            return res[0].click();
                        });

                        await driver.sleep(4000 + Math.round(100 * Math.random()));
                        await driver.findElements(By.xpath("//*[contains(@class, '_aaqg')]//button[contains(@class, '_abl-')]")).then(async (res) => {
                            let date = new Date();

                            console.log("# Going to the next picture. Present time:", date.getHours() + ":" + date.getMinutes());
                            return res[0].click();
                        });

                        await driver.sleep(2000 + Math.round(100 * Math.random()));
                    }

                    console.log("# Session will be paused for", (pauseBetweenSessions / 1000), "seconds.");
                    await driver.sleep(pauseBetweenSessions  + Math.round(100 * Math.random()));
                    
                })
            }
        
        default:
            await console.log(`Please Choose a Mode first`);
            await driver.quit();
            break;
    }
}

if (info.accountType == "fb") {
  // FACEBOOK ACCOUNT (NOT WORKING YET)

  (async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://www.instagram.com').then(function () {
            console.log("# Going to website...");
        });
        await driver.sleep(1000 + Math.round(100 * Math.random()));
        await driver.findElement(By.xpath("//button[contains(@class,'aOOlW')]")).then(function () {
        console.log('# Cookie button found');
        });

        await driver.findElement(By.xpath("//button[contains(@class,'aOOlW')]")).click();
        await driver.sleep(1000 + Math.round(100 * Math.random()));
        await driver.findElement(By.xpath("//button[contains(@class,'sqdOP')]")).then(function () {
        console.log('# Login button found');
        });

        await driver.findElement(By.xpath("//button[contains(@class,'sqdOP')]")).click();
        await driver.sleep(1000 + Math.round(100 * Math.random()));
        await driver.findElement(By.xpath("//button[contains(@class,'selected _51sy')]")).then(function () {
        console.log('# Facebook cookie button found');
        });

        await driver.findElement(By.xpath("//button[contains(@class,'sqdOP')]")).click();
        await driver.findElement(By.xpath("//input[@id='email']")).sendKeys(nick);
        await driver.findElement(By.xpath("//input[@id='pass']")).sendKeys(pass);
        await driver.sleep(1000);
        await driver.findElement(By.xpath("//button[@id='loginbutton']")).click().then(function () {
            console.log("# Loging in...");
        });

        await driver.sleep(3000);
        await driver.findElement(By.xpath("//button[contains(@class,'sqdOP')]")).then(() => console.log('# Save Info button found, clicking'));
        await driver.findElement(By.xpath("//button[contains(@class,'sqdOP')]")).click();

        await driver.sleep(3000);
        await driver.findElement(By.xpath("//button[contains(@class,'HoLwm')]")).then(() => console.log('# Info button found, clicking'));
        await driver.findElement(By.xpath("//button[contains(@class,'HoLwm')]")).click();

    } finally {
        await BotWorkflow(driver);

        console.log('# Work is Done');
        await driver.quit();
    }
  })();
} else {
  // INSTAGRAM ACCOUNT

  (async () => {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.instagram.com/accounts/login/').then(() => console.log("# Going to website..."));
        
        await driver.sleep(1000 + Math.round(100 * Math.random()));
        await driver.findElement(By.xpath("//button[contains(@class,'aOOlW')]")).then(() => console.log('# Cookie button found'));
        await driver.findElement(By.xpath("//button[contains(@class,'aOOlW')]")).click();

        await driver.sleep(1000 + Math.round(100 * Math.random()));
        await driver.findElement(By.xpath("//input[@name='username']")).sendKeys(nick);
        await driver.findElement(By.xpath("//input[@name='password']")).sendKeys(pass);

        await driver.sleep(1000);
        await driver.findElement(By.xpath("//button[@type='submit']")).click().then(() => console.log("# Loging in..."));

        await driver.sleep(3000);
        await driver.findElement(By.xpath("//button[contains(@class,'sqdOP')]")).then(() => console.log('# Save Info button found, clicking'));
        await driver.findElement(By.xpath("//button[contains(@class,'sqdOP')]")).click();

        await driver.sleep(3000);
        await driver.findElement(By.xpath("//button[contains(@class,'HoLwm')]")).then(() => console.log('# Info button found, clicking'));
        await driver.findElement(By.xpath("//button[contains(@class,'HoLwm')]")).click();
    }
    
    catch {
        console.error(err);
    } 
    
    finally {
        await BotWorkflow(driver);

        await driver.quit().then(function () {
            let date = new Date();
            console.log("# Job is done! Time of job completion:", date.getHours() + ":" + date.getMinutes());
        });;
    }
  })();
}

// if (authbool == true) {
//     console.log("# You have", timeforauth / 60000, "minutes to choose defined authentification and prove that it's you.");
//     driver.sleep(timeforauth);
// }

// driver.sleep(1000);
// driver.executeScript("document.querySelector('.RnEpo').remove();");

// //click only defined amount of likes and shut down.
 

// else if (mode == 2 && irritatingBox == true) {
//     console.log("# - Comment is going to be used:", comment, "and irritating box is set to", irritatingBox);
//     console.log("# - Will be posted", commentsToWrite, "times");

//     let comIconArray, comBoxArray

//     for (s = 0; s < sessionCounter; s++) {
//         let boxgone = false;
//         let iconsFound = false;
//         let iconsClicked = false;

//         /**
//          * taking box out
//          */

//         driver.wait(until.elementLocated(By.className('RnEpo')), 4000).then(

//             function (res) {

//                 driver.sleep(1500); //because element is moving.
//                 res.click().then(
//                     function (res) {
//                         console.log("# Box is gone, continuing...");
//                         driver.sleep(1000);
//                         boxgone = true;
//                     }
//                 );
//             }
//         ).then(
//             function (res) {
//                 if (boxgone == true) {
//                     //_p6oxf - icon box class
//                     //_bilrf - text box class

//                     //getting all com Icons
//                     driver.findElements(By.xpath("//a[contains(@class, '_p6oxf')]")).then(
//                         function (res) {
//                             comIconArray = res;
//                             console.log("# finding and setting icons array to variable");
//                             iconsFound = true;
//                         }
//                     );
//                 } else {
//                     console.log("#! ERROR - Box is still here ");
//                 }
//             }
//         ).then(
//             function (res) {
//                 if (iconsFound == true) {
//                     console.log("# clicking all the comment icons");
//                     for (a = 0; a < commentsToWrite; a++) {
//                         comIconArray[a].click();
//                     }
//                     driver.sleep(3000);
//                     iconsClicked = true;
//                 } else {
//                     console.log("#! ERROR - Icons were not clicked, unfortunately.");
//                 }
//             }
//         ).then(
//             function (res) {
//                 if (iconsClicked == true) {
//                     driver.findElements(By.className('_bilrf')).then(
//                         function (res) {
//                             comBoxArray = res;
//                             console.log("# Reading all the textboxes");
//                         }
//                     ).then(
//                         function (res) {
//                             for (b = 0; b < commentsToWrite; b++) {
//                                 driver.sleep(1000);
//                                 comBoxArray[b].sendKeys(comment[Math.floor(Math.random() * (comment.length))]);
//                                 comBoxArray[b].sendKeys(webdriver.Key.ENTER);
//                                 driver.sleep(5000);
//                             }
//                             console.log("# Done!", commentsToWrite, "comments were published!");
//                         }
//                     );
//                 } else {
//                     console.log("#! ERROR - Unable to send text to boxes, unfortunately.");
//                 }
//             }
//         );
//     }
// } 

// else if (mode == 2 && irritatingBox == false) {
//     console.log("# - Comment is going to be used:", comment, "and irritating box is set to", irritatingBox);
//     console.log("# - Will be posted", commentsToWrite, "times");
//     driver.sleep(3000);

//     let comIconArray, comBoxArray

//     if (irritatingBox == true) {
//         driver.wait(until.elementLocated(By.className('_lilm5')), 4000).then(

//             function (res) {

//                 driver.sleep(1500); //because element is moving.
//                 res.click().then(
//                     function (res) {
//                         console.log("# Box is gone, continuing...");
//                         driver.sleep(1000);
//                         boxgone = true;
//                     }
//                 );
//             }
//         );
//     }

//     for (s = 0; s < sessionCounter; s++) {

//         let iconsFound = false;
//         let iconsClicked = false;

//         //OV9Wd - icon box class
//         //Ypffh - text box class

//         driver.get('http://www.instagram.com').then(function () {
//             console.log("# Initiating new session..")
//         });

//         driver.findElements(By.xpath("//a[contains(@class, 'OV9Wd')]")).then(
//             function (res) {
//                 comIconArray = res;
//                 console.log("# finding and setting icons array to variable");
//                 iconsFound = true;
//             }

//         ).then(
          
//           function() {
//             driver.sleep(5000);
//           }
        
//         ).then(
//             function (res) {
//                 if (iconsFound == true) {
//                     console.log("# clicking all the comment icons");
//                     for (a = 0; a < commentsToWrite; a++) {
//                         comIconArray[a].click();
//                     }
//                     driver.sleep(3000);
//                     iconsClicked = true;
//                 } else {
//                     console.log("#! ERROR - Icons were not clicked, unfortunately.");
//                 }
//             }

//         ).then(
//             function (res) {
//                 if (iconsClicked == true) {
//                     driver.findElements(By.className('Ypffh')).then(
//                         function (res) {
//                             comBoxArray = res;
//                             console.log("# Reading all the textboxes");
//                         }
//                     ).then(
//                         function (res) {
//                             for (b = 0; b < commentsToWrite; b++) {
//                                 driver.sleep(1000);
//                                 comBoxArray[b].sendKeys(comment[Math.floor(Math.random() * (comment.length))]);
//                                 comBoxArray[b].sendKeys(webdriver.Key.ENTER);
//                                 driver.sleep(8000); // waiting until comment will be published (10sec)
//                             }
//                             console.log("# Almost done!", commentsToWrite, "comments are going to be published!");
//                         }
//                     );
//                 } else {
//                     console.log("#! ERROR - Unable to send text to boxes, unfortunately.");
//                 }
//             }
//         ).then(function () {
//             console.log("# Session finished. pausing for", pauseBetweenSessions, "seconds.");
//             driver.sleep(pauseBetweenSessions);
//         });
//     }
// } 


// } else {
//     driver.quit().then(function () {
//         console.log("#ERROR: Mode is not defined! Check bot.js and make sure that 0, 1, 2 or 3 is defined.")
//     });
// }

// driver.quit().then(function () {
//     let date = new Date();
//     console.log("# Job is done! Time of job completion:", date.getHours() + ":" + date.getMinutes());
// });
