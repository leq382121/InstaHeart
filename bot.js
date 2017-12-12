/*
# 
#       InstaHeart v1.1 - straighfoward instagram crawler
#       Author: Liutauras Razma
#       Date created: 2017-11-04
#       Last update: 2017-12-12
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
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
const windowWidth = 900;
const info = require('./info.json');

/**
 *      project setup
 */

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

/**
 * Process
 */

driver.manage().window().setSize(windowWidth, 700); //683
console.log("# Mode", mode, "is selected. Starting the process...")
driver.get('http://www.instagram.com').then(function () {console.log("# Going to website...");});
//driver.findElement(By.className('_msxj2')).click();
driver.findElement(By.xpath("//p[@class='_g9ean']/a")).click();
driver.findElement(By.name('username')).sendKeys(nick);
driver.findElement(By.name('password')).sendKeys(pass);
driver.sleep(1000);
driver.findElement(By.className('_qv64e')).click().then(function () {console.log("# Loging in...");});

if (authbool == true){
    console.log("# You have", timeforauth / 60000 , "minutes to choose defined authentification and prove that it's you.");
    driver.sleep(timeforauth);
}

driver.sleep(1000);
driver.findElements(By.className("//a[contains(@class, '_eszkz')]")).then(found => console.log("# Instagram feed loaded..."));

//click only defined amount of likes and bye bye.
if (mode == 0) {
    driver.findElements(By.xpath("//a[contains(@class, '_eszkz')]")).then(
        function (res) {
            // res here is an array of targeted elemnts (hearts)
            for (i = 0; i < likesToClick; i++) {
                console.log("*- likes clicked: ", i + 1, "-*");
                res[i].click();
                // Math.random() due to make it more-like humanistic instead using fixed time.
                driver.sleep(2000 + Math.round(100 * Math.random()));
            }
        }
    );
}

//clicks defined amount of likes for defined number of repetitions (sessions) and pauses for defined amount of time
else if (mode == 1) {
    
    console.log("# Number of sessions:", sessionCounter);
    for (n = 0; n < sessionCounter; n++) {

        driver.get('http://www.instagram.com').then(function () {
            console.log("# Initiating new session..")
        });
        driver.findElements(By.xpath("//a[contains(@class, '_eszkz')]")).then(

            function (res) {
                for (var i = 0; i < likesToClick; i++) {
                    console.log("*- likes clicked: ", i + 1, "-*");
                    res[i].click();
                }
            }

        ).then(function () {
            let date = new Date();
            console.log("# Session finished. pausing for", pauseBetweenSessions, "seconds. Present time:", date.getHours() + ":" + date.getMinutes());
            driver.sleep(pauseBetweenSessions);
        });
    }
}

else if (mode == 2 && irritatingBox == true) {
    console.log("# - Comment is going to be used:", comment, "and irritating box is set to", irritatingBox);
    console.log("# - Will be posted", commentsToWrite, "times");

    let comIconArray, comBoxArray

    for (s = 0; s < sessionCounter; s++) {
        let boxgone = false;
        let iconsFound = false;
        let iconsClicked = false;

        /**
         * taking box out
         */

        driver.wait(until.elementLocated(By.className('_lilm5')), 4000).then(

            function (res) {

                driver.sleep(1500); //because element is moving.
                res.click().then(
                    function (res) {
                        console.log("# Box is gone, continuing...");
                        driver.sleep(1000);
                        boxgone = true;
                    }
                );
            }
        ).then(
            function (res) {
                if (boxgone == true) {
                    //_p6oxf - icon box class
                    //_bilrf - text box class
                    //_55p7a - post button class

                    //getting all com Icons
                    driver.findElements(By.xpath("//a[contains(@class, '_p6oxf')]")).then(
                        function (res) {
                            comIconArray = res;
                            console.log("# finding and setting icons array to variable");
                            iconsFound = true;
                        }
                    );
                } else {
                    console.log("#! ERROR - Box is still here ");
                }
            }
        ).then(
            function (res) {
                if (iconsFound == true) {
                    console.log("# clicking all the comment icons");
                    for (a = 0; a < commentsToWrite; a++) {
                        comIconArray[a].click();
                    }
                    driver.sleep(3000);
                    iconsClicked = true;
                } else {
                    console.log("#! ERROR - Icons were not clicked, unfortunately.");
                }
            }
        ).then(
            function (res) {
                if (iconsClicked == true) {
                    driver.findElements(By.className('_bilrf')).then(
                        function (res) {
                            comBoxArray = res;
                            console.log("# Reading all the textboxes");
                        }
                    ).then(
                        function (res) {
                            for (b = 0; b < commentsToWrite; b++) {
                                driver.sleep(1000);
                                comBoxArray[b].sendKeys(comment[Math.floor(Math.random() * (comment.length))]);
                                comBoxArray[b].sendKeys(webdriver.Key.ENTER);
                                driver.sleep(5000);
                            }
                            console.log("# Done!", commentsToWrite, "comments were published!");
                        }
                    );
                } else {
                    console.log("#! ERROR - Unable to send text to boxes, unfortunately.");
                }
            }
        );
    }
}

else if (mode == 2 && irritatingBox == false) {
    console.log("# - Comment is going to be used:", comment, "and irritating box is set to", irritatingBox);
    console.log("# - Will be posted", commentsToWrite, "times");

    let comIconArray, comBoxArray

    for (s = 0; s < sessionCounter; s++) {

        let iconsFound = false;
        let iconsClicked = false;

        //_p6oxf - icon box class
        //_bilrf - text box class
        //_55p7a - post button class

        driver.get('http://www.instagram.com').then(function () {
            console.log("# Initiating new session..")
        });
        driver.findElements(By.xpath("//a[contains(@class, '_p6oxf')]")).then(
            function (res) {
                comIconArray = res;
                console.log("# finding and setting icons array to variable");
                iconsFound = true;
            }

        ).then(
            function (res) {
                if (iconsFound == true) {
                    console.log("# clicking all the comment icons");
                    for (a = 0; a < commentsToWrite; a++) {
                        comIconArray[a].click();
                    }
                    driver.sleep(3000);
                    iconsClicked = true;
                } else {
                    console.log("#! ERROR - Icons were not clicked, unfortunately.");
                }
            }

        ).then(
            function (res) {
                if (iconsClicked == true) {
                    driver.findElements(By.className('_bilrf')).then(
                        function (res) {
                            comBoxArray = res;
                            console.log("# Reading all the textboxes");
                        }
                    ).then(
                        function (res) {
                            for (b = 0; b < commentsToWrite; b++) {
                                driver.sleep(1000);
                                comBoxArray[b].sendKeys(comment[Math.floor(Math.random() * (comment.length))]);
                                comBoxArray[b].sendKeys(webdriver.Key.ENTER);
                                driver.sleep(8000); // waiting until comment will be published (10sec)
                            }
                            console.log("# Almost done!", commentsToWrite, "comments are going to be published!");
                        }
                    );
                } else {
                    console.log("#! ERROR - Unable to send text to boxes, unfortunately.");
                }
            }
        ).then(function () {
            console.log("# Session finished. pausing for", pauseBetweenSessions, "seconds.");
            driver.sleep(pauseBetweenSessions);
        });
    }
} 

else if (mode == 3) {
    console.log("#",peopletofollow,"people are going to be followed and liked per session using #", hashtag, "and this will be repeated", sessionCounter, "times." );

    for (s = 0; s < sessionCounter; s++) {
        let date = new Date();

        driver.get('https://www.instagram.com/explore/tags/'+ hashtag +'/').then(function () {
            console.log("# Initiating new session. Present time:", date.getHours() + ":" + date.getMinutes());
        });
        driver.wait(until.elementLocated(By.className('_mck9w')));
        driver.findElements(By.className('_mck9w')).then((res) => {
            res[9].click();

            driver.wait(until.elementLocated(By.className('coreSpriteRightPaginationArrow'))).then(function(){
                console.log("# Image loaded. Liking and following.")
            });

            for (p = 0; p < peopletofollow; p++) {
                driver.findElements(By.className('_qv64e')).then((res) => {
                    console.log("# Clicking follow button");
                    res[0].click();
                });
                driver.sleep(2000);
                driver.findElements(By.className('_eszkz')).then((res) => {
                    console.log("# Clicking <3 button");
                    res[0].click();
                })
                driver.sleep(2000);
                driver.findElements(By.className('coreSpriteRightPaginationArrow')).then((res) => {
                    console.log("# Gong to the next picture.");
                    res[0].click();
                });
                driver.sleep(4000);
            }
            console.log("# Session will be paused for", (pauseBetweenSessions/1000), "seconds.");
            driver.sleep(pauseBetweenSessions);
        })
    }
}

else {
    driver.quit().then(function () {
        console.log("#ERROR: Mode is not defined! Check bot.js and make sure that 0, 1 or 2 is defined.")
    });
}

driver.quit().then(function () {
    let date = new Date();
    console.log("# Job is done! Time of job completion:", date.getHours() + ":" + date.getMinutes()) ;
});