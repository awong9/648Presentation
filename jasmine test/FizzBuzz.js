var FizzBuzz = FizzBuzz1

function FizzBuzz1() {
  function fb(n) {
    if( n%15 == 0 ) return 'FizzBuzz'
    if( n% 3 == 0 ) return 'Fizz'
    if( n% 5 == 0 ) return 'Buzz'
    return String(n)
  }

  for( var i=1; i<=100; i++ )
    console.log( fb(i) )
}

//Broken: beware switch fallthrough
function FizzBuzz2() {
  for( var i=1; i<=100; i++ ) {
    var output = ''
    switch(true) {
      case( i%3===0 ): output += 'Fizz'
        //fallthrough
      case( i%5===0 ): output += 'Buzz'
        break
      default: output+= i
    }
    console.log( output )
  }
}

function FizzBuzz3() {
  for( var i=1; i<=100; i++ ) {
    var output = ''
    if( i%3==0 ) output += 'Fizz'
    if( i%5==0 ) output += 'Buzz'
    if( i%3!=0 && i%5!=0 ) output+= i
    console.log( output )
  }
}
function FizzBuzz4() {
  function fb(n, end) {
    if( n>end ) return
    if    ( n%15==0 ) console.log('FizzBuzz')
    else if( n%3==0 ) console.log('Fizz')
    else if( n%5==0 ) console.log('Buzz')
    else console.log(String(n))
    return fb(n+1, end)
  }
  fb(1, 100)
}