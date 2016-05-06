describe("FizzBuzz", function() {
  beforeEach(function() {
    spyOn(console, 'log')
    FizzBuzz();
  });

  it('prints', function() {
    expect(console.log).toHaveBeenCalled();
  });

  it('prints 100 times', function() {
    expect(console.log).toHaveBeenCalledTimes(100);
  });

  it('prints integers between 1 to 100', function() {
    expect(console.log).toHaveBeenCalledWith('1');
    expect(console.log).toHaveBeenCalledWith('7');
    expect(console.log).toHaveBeenCalledWith('98');
  });

  it('prints Fizz', function() {
    expect(console.log).toHaveBeenCalledWith('Fizz');
  });

  it('prints Buzz', function() {
    expect(console.log).toHaveBeenCalledWith('Buzz');
  });

  it('prints FizzBuzz', function() {
    expect(console.log).toHaveBeenCalledWith('FizzBuzz');
  });
  it('prints Fizz, Buzz, and FizzBuzz in the right places', function() {
    expect(console.log.calls.allArgs().join().split(",")).toEqual(

[ '1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz',
'16', '17', 'Fizz', '19', 'Buzz', 'Fizz', '22', '23', 'Fizz', 'Buzz', '26', 'Fizz', '28', '29', 'FizzBuzz',
'31', '32', 'Fizz', '34', 'Buzz', 'Fizz', '37', '38', 'Fizz', 'Buzz', '41', 'Fizz', '43', '44', 'FizzBuzz',
'46', '47', 'Fizz', '49', 'Buzz', 'Fizz', '52', '53', 'Fizz', 'Buzz', '56', 'Fizz', '58', '59', 'FizzBuzz',
'61', '62', 'Fizz', '64', 'Buzz', 'Fizz', '67', '68', 'Fizz', 'Buzz', '71', 'Fizz', '73', '74', 'FizzBuzz',
'76', '77', 'Fizz', '79', 'Buzz', 'Fizz', '82', '83', 'Fizz', 'Buzz', '86', 'Fizz', '88', '89', 'FizzBuzz',
'91', '92', 'Fizz', '94', 'Buzz', 'Fizz', '97', '98', 'Fizz', 'Buzz' ]

    );
  });

  xit('write code by itself');

});
