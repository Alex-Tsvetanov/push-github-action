const request = require('request')
const fs = require('fs')
const API_URL = 'https://push.techulus.com/api/v1/notify'

const eventPayload = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))

const message = {
	body: `New ${eventPayload.repository.full_name} happened in ${eventPayload.repository.full_name} by ${eventPayload.repository.full_name}` || 'No message specified',
	title: `GitHub Notification from ${eventPayload.repository.full_name}`
}

if (!process.env.API_KEY) {
	return console.error('API KEY is missing')
}

console.log("Sending message", JSON.stringify(message))

request({
	url: API_URL,
	method: 'POST',
	headers: {
		'x-api-key': process.env.API_KEY
	},
	body: message,
	json: true
}, (err, response) => {
	if (err) {
		return console.error(err.toString())
	}
	console.log("Notification sent!", response.body)
})
