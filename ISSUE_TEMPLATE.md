**Description of the Issue and Steps to Reproduce:**

*Please include the values of all variables used.*

**Environment:**

*Examples: Chrome 49 on OSX, Internet Explorer 10 on Windows 7, Node.JS 4.4.4 on Ubuntu 16.0.4*

*Both the browser and the OS are important to us, particularly if you have an unsual environment like an IOT application.*

**Other information that may be helpful:**
* The time zone setting of the machine the code is running on
* The time and date at which the code was run
* Other libraries in use (TypeScript, Immutable.js, etc)

If you are reporting an issue, please run the following code in the environment you are using and include the output:
```js
console.log( (new Date()).toString())
console.log((new Date()).toLocaleString())
console.log( (new Date()).getTimezoneOffset())
console.log( navigator.userAgent)
console.log(moment.version)
```

*Ensure your issue is isolated to moment. Issues involving third party tools will be closed unless submitted by the tool's author/maintainer.*