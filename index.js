'use strict';
var nodemailer = require('nodemailer');
var fs = require('fs');
const {URL} = require('url');
const puppeteer = require('puppeteer');
const url = process.argv[2];
    if(process.argv.length < 3){
        console.log('Usage: node scriptname [url]');
        process.exit(-1);	
    }
    
var transporter = nodemailer.createTransport({
    //service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'smtp username',
        pass: 'smtp password'
    }
});
    



(async ()=> {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const sUrl = new URL(url);

    const screenshotName = 'Screenshot_'+sUrl.host+'_'+new Date().toISOString()+'.png';

    const dirName = 'screenshots';
    if(!fs.existsSync(dirName))
        fs.mkdirSync(dirName);

    await page.screenshot({path:dirName+'/'+screenshotName,fullPage:true});

    await browser.close();
    var mailOptions = {
        from: 'smtp email',
        to: 'recipient email',
        subject: 'Subject of Email',
        text: 'Body of Email',
            attachments: [
                {   // file on disk as an attachment
                    // filename: screenshotName,
                     path: dirName+'/'+screenshotName // path
                },
            ]
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          throw err;
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
