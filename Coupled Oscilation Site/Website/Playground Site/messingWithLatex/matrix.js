
function generalKMatrixConstructor(links,n){
  K=nj.zeros([n+1, n+1]).tolist();
  for (let i = 0; i < links.length; i++) {
    console.log(links[i])
    j = links[i][0]
    k = links[i][1]
    if(K[j][j]=='0'){
      K[j][j]='k_'+i
    }
    else{
      K[j][j]+=' +k_'+i
    }
    if(K[j][k]=='0'){
      K[j][k]='-k_'+i
    }
    else{
      K[j][k]+=' -k_'+i
    }
    if(K[k][j]=='0'){
      K[k][j]='-k_'+i
    }
    else{
      K[k][j]+=' -k_'+i
    }
    if(K[k][k]=='0'){
      K[k][k]='k_'+i
    }
    else{
      K[k][k]+=' +k_'+i
    }
    
  }
  return K
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

