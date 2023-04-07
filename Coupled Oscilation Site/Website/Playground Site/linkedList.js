function includesButBetter(row){
    let includesRow = false;
    let foundRow = NaN
    for (let i = 0; i < links.length; i++) {
    //   console.log(i)
    //   console.log('links[i]',JSON.stringify(links[i]))
    //   console.log('row',JSON.stringify(row))
      if (JSON.stringify(links[i]) === JSON.stringify(row)) {
        includesRow = true;
        foundRow = i
        break;
      }
    }
    return [includesRow,foundRow]
  }
  function deleteNode(index) {
    // Remove the node from the list
    rectangles.splice(index, 1);
    initialConditions.splice(index, 1);
    driverParameters.splice(index,1)
    anchorStates.splice(index, 1);
    oscillator_List=[]

    updateObjectIdentities()
  
    // Iterate through the links and update the indices
    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      if (link[0] === index || link[1] === index) {
        // Remove any links that contain the deleted node index
        links.splice(i, 1);
        i--;
      } else {
        // Update any indices that reference nodes after the deleted node
        if (link[0] > index) link[0]--;
        if (link[1] > index) link[1]--;
      }
    }
    
    // rebuilding the Links Class list
    linksClass = []
    for (let i = 0; i < links.length; i++) {
        let link = links[i];
        let node1 = rectangles[link[0]];
        let node2 = rectangles[link[1]];
        let newLink = new Links(node1, node2);
        linksClass.push(newLink);
    }
    linkToLatex(links,rectangles.length)


  }