if ( typeof window === 'undefined' ) {
  require('../../app/arrays');
  var expect = require('chai').expect;
}

describe('arrays', function() {
  var a;  
  var arraysAnswers;
  
  beforeEach(function() {
    a = [ 1, 2, 3, 4 ];
  });

  arraysAnswers = {
      indexOf: function(array,value) {
        return array.indexOf(value);
      },
      sum: function(array) {
        var total=0;
        for(var i in array) { 
          total += array[i];
        }
        return total;
      },
      remove: function(array,value) {
        result = [];
        var len  = array.length;
        for(var i=0; i < len; i ++) {
          if (array[i] != value) {
            result.push(array[i]);
          }
        }
        return result;
      },
      removeWithoutCopy: function(array,value) {
        var len  = array.length;
        for(var i=0; i < len; i ++) {
          if (array.indexOf(value) != -1){
            array.splice(array.indexOf(value),1);
          }
        }
        return array;
      },
      append: function(array,value) {
        array.push(value);
        return array;
      },
      truncate: function(array,value) {
        array.pop(value);
        return array;
      },
      prepend: function(array,value) {
        array.splice(0,0,value);
        return array;
      },
      curtail: function(array,value) {
        array.splice(0,1);
        return array;
      },
      concat: function(array,array2) {
        array = array.concat(array2);
        return array;
      },     
      insert: function(array,value,position) {
        array.splice(position,0,value);
        return array;
      },
      count: function(array,value) {
        len = array.length
        count = 0;
        for (var i = 0; i < len; i ++) {
          if (array[i] == value) {
            count++;
          }
        }
        return count;
      },
      duplicates: function(array) {
        len = array.length
        count = 0;
        result = [];
        for (var i = 0; i < len; i ++) {
          count = 0 ;
          for (var j = 0; j < len; j ++) {
            if (array[i] == array[j]) {
              count++;
            }
          }
          if (count > 1 && result.indexOf(array[i]) == -1 ) {
            result.push(array[i]);
          }

        }
        return result;
      },
      square: function(array) {
        len = array.length
        for (var i = 0; i < len; i ++) {
          array[i] = array[i] * array[i];
        }
        return array;
      },
      findAllOccurrences: function(array,value) {
        len = array.length;
        result = [];
        count = 0;
        for (var i = 0; i < len; i++) {
          if (array[i] == value) {
            result.push(array.indexOf(value)+count);
            array.splice(array.indexOf(value),1);
            count++;
          }  
        }
        return result;
      }
  };

  it('you should be able to determine the location of an item in an array', function() {

    expect(arraysAnswers.indexOf(a, 3)).to.eql(2);
    expect(arraysAnswers.indexOf(a, 5)).to.eql(-1);
  });

  it('you should be able to add the values of an array', function() {
    expect(arraysAnswers.sum(a)).to.eql(10);
  });

  it('you should be able to remove all instances of a value from an array', function() {
    a.push(2); // Make sure the value appears more than one time
    var result = arraysAnswers.remove(a, 2);

    expect(result).to.have.length(3);
    expect(result.join(' ')).to.eql('1 3 4');
  });

  it('you should be able to remove all instances of a value from an array, returning the original array', function() {

    a.splice( 1, 0, 2 );
    a.push( 2 );
    a.push( 2 );

    var result = arraysAnswers.removeWithoutCopy(a, 2);

    expect(result).to.have.length(3);
    expect(result.join(' ')).to.eql('1 3 4');

    // make sure that you return the same array instance
    expect(result).equal(a);
  });

  it('you should be able to add an item to the end of an array', function() {
    var result = arraysAnswers.append(a, 10);

    expect(result).to.have.length(5);
    expect(result[result.length - 1]).to.eql(10);
  });

  it('you should be able to remove the last item of an array', function() {
    var result = arraysAnswers.truncate(a);

    expect(result).to.have.length(3);
    expect(result.join(' ')).to.eql('1 2 3');
  });

  it('you should be able to add an item to the beginning of an array', function () {
    var result = arraysAnswers.prepend(a, 10);

    expect(result).to.have.length(5);
    expect(result[0]).to.eql(10);
  });

  it('you should be able to remove the first item of an array', function () {
    var result = arraysAnswers.curtail(a);

    expect(result).to.have.length(3);
    expect(result.join(' ')).to.eql('2 3 4');
  });

  it('you should be able to join together two arrays', function() {
    var c = [ 'a', 'b', 'c', 1 ];
    var result = arraysAnswers.concat(a, c);

    expect(result).to.have.length(8);
    expect(result.join(' ')).to.eql('1 2 3 4 a b c 1');
  });

  it('you should be able to add an item anywhere in an array', function() {
    var result = arraysAnswers.insert(a, 'z', 2);

    expect(result).to.have.length(5);
    expect(result.join(' ')).to.eql('1 2 z 3 4');
  });

  it('you should be able to count the occurences of an item in an array', function() {
    var result = arraysAnswers.count([ 1, 2, 4, 4, 3, 4, 3 ], 4);

    expect(result).to.eql(3);
  });

  it('you should be able to find duplicates in an array', function() {
    var result = arraysAnswers.duplicates([ 1, 2, 4, 4, 3, 3, 1, 5, 3 ]);

    expect(result.sort()).to.eql([1, 3, 4]);
  });

  it('you should be able to square each number in an array', function() {
    var result = arraysAnswers.square(a);

    expect(result).to.have.length(4);
    expect(result.join(' ')).to.eql('1 4 9 16');
  });

  it('you should be able to find all occurrences of an item in an array', function() {
    var result = arraysAnswers.findAllOccurrences('abcdefabc'.split(''), 'a');

    expect(result.sort().join(' ')).to.eql('0 6');
  });

});
