'use strict';
var nodemailer = require('nodemailer');
var fs = require('fs');
require('dotenv').config()
const {URL} = require('url');
const puppeteer = require('puppeteer');
const url = process.argv[2];
    if(process.argv.length < 3){
        console.log('Usage: node scriptname [url]');
        process.exit(-1);	
    }
    
var transporter = nodemailer.createTransport({
    //service: 'gmail',
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});
    



(async ()=> {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const sUrl = new URL(url);
    console.log(process.env.EMAIL_BODY);
    const screenshotName = 'Screenshot_'+sUrl.host+'_'+new Date().toISOString()+'.png';

    const dirName = 'screenshots';
    if(!fs.existsSync(dirName))
        fs.mkdirSync(dirName);

    await page.screenshot({path:dirName+'/'+screenshotName,fullPage:true});

    await browser.close();
    var mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.RECIPIENT_EMAIL,
        subject: process.env.EMAIL_SUBJECT,
        text: process.env.EMAIL_BODY,
            attachments: [
                {   // file on disk as an attachment
                    // filename: screenshotName,
                     path: dirName+'/'+screenshotName // path
                },
            ]
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          throw error;
        } else {
            fs.unlink(dirName+'/'+screenshotName,function (err) {
                if(err){
                    throw err;
                }
                    
            });
          console.log('Email sent: ' + info.response);
        }
      });
})();
