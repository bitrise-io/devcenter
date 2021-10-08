function getText(changeContent) {
  return changeContent.textContent || changeContent.innerText || ''
}

function sortElements(nodeList) {
  var node,
    parentNode = nodeList[0].parentNode

  function sortEls(a, b) {
    var aText = getText(a)
    var bText = getText(b)
    return aText == bText ? 0 : bText < aText ? -1 : 1
  }

  var a = [],
    i = nodeList.length
  while (i--) {
    a[i] = parentNode.removeChild(nodeList[i])
  }

  a.sort(sortEls)

  i = 0
  while ((node = a[i++])) {
    parentNode.appendChild(node)
  }
}

sortElements(document.querySelectorAll('.changelog-content'))
