
function generalKMatrixConstructor(links,n,anchorStates){
  K=nj.zeros([n, n]).tolist();
  for (let i = 0; i < links.length; i++) {
    j = links[i][0]
    k = links[i][1]
    if(anchorStates[j] == false){
      if(K[j][j]=='0'){
        K[j][j]='k_{\\it('+j+'→'+k+')}'
      }
      else{
        K[j][j]+=' +k_{\\it('+j+'→'+k+')}'
      }
      if(K[j][k]=='0'){
        K[j][k]='-k_{\\it('+j+'→'+k+')}'
      }
      else{
        K[j][k]+=' -k_{\\it('+j+'→'+k+')}'
      }
    }
    if(anchorStates[k] == false){

    
      if(K[k][j]=='0'){
        K[k][j]='-k_{\\it('+j+'→'+k+')}'
      }
      else{
        K[k][j]+='-k_{\\it('+j+'→'+k+')}'
      }
      if(K[k][k]=='0'){
        K[k][k]='k_{\\it('+j+'→'+k+')}'
      }
      else{
        K[k][k]+='k_{\\it('+j+'→'+k+')}'
      }
    }
    
  }
  for(let item = 0;item<n;item++){
    if(anchorStates[item]==true){
      K[item] = nj.zeros([1,n]).tolist()[0]
    }
  }
  return K
}

function KMatrixConstructor(links,n,spring_constants){
  let Z=nj.zeros([n, n]).tolist();
  for (let i = 0; i < links.length; i++) {
    j = links[i][0]
    k = links[i][1]
    Z[j][j]+=spring_constants
    Z[j][k]+=-spring_constants
    Z[k][j]+=-spring_constants
    Z[k][k]+=spring_constants
  }
  
  return Z
}

function latexUpdater(matrix){
  let latexCode = "\\begin{bmatrix}\n";

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      latexCode += matrix[i][j].toString() + " & ";
    }
    latexCode = latexCode.slice(0, -2) + " \\\\\n";
  }
  
  latexCode += "\\end{bmatrix}";
  
  
  const container = document.getElementById('matrix');
		const options = { displayMode: true };
		katex.render(latexCode, container, options);

		// Update font size on window resize
		window.addEventListener('resize', () => {
			const fontSize = container.offsetWidth / 50;
			container.style.fontSize = `${fontSize}px`;
		});
  }
function linkToLatex(links,n){
  K= generalKMatrixConstructor(links,n,anchorStates)
  latexUpdater(K)
}


// console.log(K)
// latexUpdater(K)