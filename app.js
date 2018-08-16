const express = require('express')
const request = require('request')
const app = express()

app.use(express.json())

app.post('/', (req, res) => {
	const queryUrl = req.query.webhook
	const jsonBody = req.body

	if (jsonBody.pull_request && jsonBody.pull_request.head) {
		console.log('Branch name is: ', jsonBody.pull_request.head.ref)
		if (jsonBody.pull_request.head.ref === 'auto_update') {
			console.log('not sending webhook, auto update')
			return res.send({message: 'done, not sending webhook'})
		} else {
			console.log('sending webhook')
		}
	}

	request({
		url: queryUrl,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		json: jsonBody
	}, (error, response, body) => {
		console.log('done')
	})

	res.send({message: 'done'})
})

app.listen(3000, () => console.log('GitHub webhook proxy listening on port 3000!'))
