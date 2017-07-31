'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
var weather = require ('weather-js');
const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES

app.get('/', function(req, res) {
	res.send("Hi I am a chatbot")
})

let token = "EAAZA99umZBsYoBAFuinPL0OfXuQpGVFkAQFBZBtd9U9BSQGd6nz50a2w5ajJyr7WSXYkQoZCrlwg16Vick6r4hxvHjUzJcsQDXvDvuVRIibbNSppOFwfnp0A78oJJ0XYxvL0JaKQjXVZALOBuHds6wLy3iLFqrAmQTMynzLBz7QZDZD"

// Facebook 
weather.find({search: 'Toronto, ON', degreeType: 'C'}, function(err,result){
     if(err) console.log(err)
     console.log(JSON.stringify(result, null, 2))
   // var temperature = result["current"].temperature;
})
app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "matheetoken") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
            if(text.match(/"hi/i) || text.match(/hello/i)){
                    sendText(sender,"Hello.")
                    }
           // else if(text.indexOf('weather') >= 0){
           //         sendText(sender,"The temperature in Toronto is "+temperature)
           //        }
            else if(text.match(/aaron/i)){
                  sendText(sender,"Please don't talk about him here.")
                  }
            else if(text.match(/Thuvaa/i)){
                  sendText(sender,"Thuvaa is trash at everything, but mostly ball and ow.")
                  }
             else if(text.match(/usama/i)){
                  sendText(sender,"son of laden?")
                  }
             else if(text.match(/stephen/i)){
                  sendText(sender,"Gooks have no place here")
                  }
             else if(text.match(/huzaifa/i)){
                  sendText(sender,"Huzaifa can suck this AI dick")
                  }
             else if(text.match(/mardee/i) || text.match(/mardy/i)){
                  sendText(sender,"Please refer to him as MoonGod")
                  }
            else if(text.match(/premium/i)){
                    sendText(sender,"I didn't do 5% because I might resell it")
                    }
             else if(text.match(/fayaad/i)){
                    sendText(sender,"Mongolians are coming")
                    }
            else{
                    sendText(sender, "Please enter a proper command.")
                    }
			        // sendText(sender, "Text echo: " + text.substring(0, 100))
		}
	}
	res.sendStatus(200)
})

function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.10/me/messages",
		qs : {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}

app.listen(app.get('port'), function() {
	console.log("running: port")
})