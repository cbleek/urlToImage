# urlToImage
Convert URL content to Image and send a mail
<!-- [START getstarted] -->
## Getting Started

### Installation

```bash
npm i
```
### Usage
Note: Requires Node v7.6.0 or greater.

**Configure Email** 

In ``.env``

Configure all email settings in **.env** file



**Execute script on the command line**

```bash
node index.js https://www.google.com/
```
It will create a screenshot of above specified url and send it to the recipient email as attachment
