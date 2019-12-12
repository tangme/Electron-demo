const regular = {
  'FR': [{ 'name': 'sphOd' }, { 'name': 'cylOd' }, { 'name': 'axOd' }],
  'FL': [{ 'name': 'sphOs' }, { 'name': 'cylOs' }, { 'name': 'axOs' }],
  'VR': [{ 'name': 'VR' }],
  'Vr': [{ 'name': 'Vr' }],
  'VL': [{ 'name': 'VL' }],
  'Vl': [{ 'name': 'Vl' }]
}

function analyzeStr (str) {
  var jsonStr = ''
  var content = str.replace(/\r/g, ',')
  var lineItem = content.split(',')
  for (var i in lineItem) {
    var val = lineItem[i]
    // eslint-disable-next-line no-irregular-whitespace
    val = val.replace(/[　]/g, '')
    val = val.replace(/[ ]/g, '')
    val = val.replace(/[ ]/g, '')
    jsonStr += generateData(val)
  }
  jsonStr = formatStrToJsonStr(jsonStr)

  return jsonStr
}

function generateData (dataStr) {
  var returnStr = ''
  for (var x in regular) {
    if (dataStr.indexOf(x) !== -1) {
      var val = dataStr.substr(dataStr.indexOf(x) + x.length)
      returnStr += buildData(regular[x], val)
    }
  }
  return returnStr
}

function buildData (typeArr, value) {
  var str = ''
  var valCopy = value
  var returnStr = ''
  for (var i in typeArr) {
    var obj = typeArr[i]
    var t = getAndBuildVal(valCopy, 3)
    str = buildQuote(obj.name) + ':' + buildQuote(t.returnVal)
    valCopy = t.nextVal
    returnStr += str + ','
  }
  return returnStr
}

function buildQuote (str) {
  return '"' + str + '"'
}

function getAndBuildVal (val, len) {
  var returnVal, nextVal
  returnVal = val.substr(0, val.indexOf('.') + len)
  nextVal = val.substr(returnVal.length)
  return { 'returnVal': returnVal, 'nextVal': nextVal }
}

function formatStrToJsonStr (str) {
  var index = str.lastIndexOf(',')
  if (str.length - index === 1) {
    str = str.substring(0, index)
    return '{' + str + '}'
  } else {
    return '{' + str + '}'
  }
}

module.exports.analyzeStr = analyzeStr
