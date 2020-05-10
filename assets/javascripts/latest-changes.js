function getText(changeContent) {
  return changeContent.textContent || changeContent.innerText || '';
}

function sortElements(nodeList) {
  // Assume there's a common parent
  let node, parentNode = nodeList[0].parentNode;

  // Define a sort function
  function sortEls(a, b) {
    let aText = getText(a);
    let bText = getText(b);
    return aText == bText? 0 : bText < aText? -1 : 1;
  }

  // Convert nodelist to an array and remove from the DOM at the same time
  var a = [], i = nodeList.length;
  while (i--) {
    a[i] = parentNode.removeChild(nodeList[i]);

  }

  // Sort the array
  a.sort(sortEls);

  // Put elements back in order
  i = 0;
  while (node = a[i++]) {
    parentNode.appendChild(node);
  }
}

sortElements(document.querySelectorAll(".changelog-content"));