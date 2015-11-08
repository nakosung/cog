(function () {
	"use strict"

	const NO_FACT = Symbol('NO FACT')
	const FAR = 1

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

	class Belief {
		explain(fact) {
			if (fact==NO_FACT) return NO_FACT
		}
	}

	class FactMemory {
		add(fact) {
			if (fact==NO_FACT) return
		}

		explain(fact) {
			if (fact==NO_FACT) return NO_FACT
		}
	}

	class CogPeers {
		constructor(opts) {
			this.peers = new Map()
			this.opts = opts
		}

		get(key) {
			let value = this.peers.get(key)
			if (value) {
				return value
			} else {
				this.peers.set(key,{distance:FAR,actor:new CogActor(this.opts)})
			}
		}

		observe(fact) {
			for (let v of this.peers.values()) {
				v.observe(fact)
			}
		}
	}

	class CogActor {
		constructor(opts) {
			this.desire = new RaceMemory()
			this.belief = new Belief()
			this.stm = new FactMemory()
			this.broker = opts.broker

			this.peers = new CogPeers(opts)
		}

		explain(fact) {
			return this.stm.explain(fact) || this.belief.explain(fact) || fact
		}

		// filter regarding to agent's internal view
		filter(fact) {
			return fact
		}

		observe(fact) {
			fact = this.filter(fact)
			this.peers.observe(fact)
			fact = this.explain(fact)
			this.stm.add(fact)
		}

		learnBelief() {
			this.belief.apply(this.stm)
		}
	}

	class Broker {

	}

	class CogAgent extends CogActor {
		constructor(opts) {			
			super(opts.cog || {})
		}
	}
	
	app.get('/',(req,res) => {
		res.end("Hello Cog")
	})

	app.listen(3000)
})()