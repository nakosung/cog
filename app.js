(function () {
	"use strict"

	let express = require('express')
	let app = express()

	let map = {}
	let addEdge = (from,to) => {
		let vertex = (what) => map[what] = map[what] || {links:[],objects:[]}
		let F = vertex(from)
		let T = vertex(to)
		F.links.push(to)
		T.links.push(from)
	}
	'west-center center-east'.split(' ').map((x) => x.split('-')).forEach((x) => addEdge(...x))

	class Memory {
		constructor() {	
		}
	}
	class RaceMemory extends Memory {
	}

	class Fact {	
	}

	class FactMemory {
	}

	class CogActor {
		constructor(opts) {
			this.desire = new RaceMemory()
			this.ltm = new FactMemory()
			this.stm = new FactMemory()
		}
	}

	class CogAgent extends CogActor {
		constructor(opts) {			
			super(opts.cog || {})
		}
	}
	
	app.get('/',(req,res) => {
		res.end("Hello")
	})

	app.listen(3000)
})()