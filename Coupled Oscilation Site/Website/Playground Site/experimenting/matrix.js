
function generalKMatrixConstructor(links,n){
  let Z=nj.zeros([n+1, n+1]).tolist();
  for (let i = 0; i < links.length; i++) {
    console.log(links[i])
    j = links[i][0]
    k = links[i][1]
    if(Z[j][j]=='0'){
      Z[j][j]='k_'+i
    }
    else{
      Z[j][j]+=' +k_'+i
    }
    if(Z[j][k]=='0'){
      Z[j][k]='-k_'+i
    }
    else{
      Z[j][k]+=' -k_'+i
    }
    if(Z[k][j]=='0'){
      Z[k][j]='-k_'+i
    }
    else{
      Z[k][j]+=' -k_'+i
    }
    if(Z[k][k]=='0'){
      Z[k][k]='k_'+i
    }
    else{
      Z[k][k]+=' +k_'+i
    }
    
  }
  return Z
}

K = generalKMatrixConstructor([[0,1],[1,2],[2,3],[3,4],[4,5]],5)
function latexUpdater(matrix){
  let latexCode = "\\begin{equation*}\n\\begin{bmatrix}\n";

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      latexCode += matrix[i][j].toString() + " & ";
    }
    latexCode = latexCode.slice(0, -2) + " \\\\\n";
  }
  
  latexCode += "\\end{bmatrix}\n\\end{equation*}";
  
  
  const matrixDiv = document.getElementById("matrix");
  matrixDiv.innerHTML = "$$" + latexCode + "$$";
}
latexUpdater(K)

