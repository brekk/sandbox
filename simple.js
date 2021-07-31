const Maybe = require('wahl')
const Either = require('easy-street')
const U = require('unusual')
const { complextrace } = require('envtrace')
const log = complextrace('simple', ['easystreet', 'wahl', 'info'])

const trace = log.easystreet
const wtrace = log.wahl

const seeded = new U(Math.random() * 1e5)
const integer = seeded.integer({ min: 0, max: 2 })
log.info('integer', integer)
const condition = integer === 1
log.info('condition', condition)
const inner = condition ? seeded.integer({ min: 0, max: 100 }) : null
log.info('inner', inner)

const either = Either.safe(inner)

const maybe = Maybe.safe(inner)

const double = x => x * 2
const half = x => x / 2
const add = (a, b) => a + b

trace('INITIAL VALUE', either)
wtrace('INITIAL VALUE', maybe)
trace('map', either.map(double))
wtrace('map', maybe.map(double))
trace(
  'bimap',
  either.bimap(() => 'Unsafe value', double)
)
trace('swap', either.swap())

trace(
  'fold',
  either.fold(() => `I FOLD`, half)
)
wtrace(
  'filter',
  maybe.filter(x => x % 2 === 0)
)
trace(`reduce`, either.reduce(add, 50))
wtrace(`reduce`, maybe.reduce(add, 500))

trace('alt', either.alt(-1000))
wtrace('alt', maybe.alt(-1000))

trace(
  'extend',
  either.extend(x => x.chain(half))
)
wtrace(
  'extend',
  maybe.extend(x => x.chain(half))
)

trace('lte', either.lte(Either.of(100000)))
wtrace('lte', maybe.lte(Maybe.of(100000)))
trace('equals', either.equals(Either.of(inner)))
wtrace('equals', maybe.equals(Maybe.of(inner)))
trace('equals + maybe', either.equals(Maybe.of(inner)))

trace('ap', Either.of(double).ap(either))
trace('ap2', either.ap2(Either.of(double)))
wtrace('ap', Maybe.of(double).ap(maybe))
wtrace('ap2', maybe.ap2(Maybe.of(double)))
trace('ap + maybe', Either.of(double).ap(maybe))
wtrace('ap + either', Maybe.of(double).ap(either))
