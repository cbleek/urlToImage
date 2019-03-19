# htmlToImage
Convert Html to Image and send a mail
<!-- [START getstarted] -->
## Getting Started

### Installation

```bash
npm i
```
### Usage
Note: Requires Node v7.6.0 or greater.

**Configure Email** 

In ``index.js``

Set Smtp username and password in transport object 

Change Subject and Body of Email through mailOptions Object 





**Execute script on the command line**

```bash
node index.js https://www.google.com/
```
It will create a screenshot of above specified url and send it to the recipient email as attachment
