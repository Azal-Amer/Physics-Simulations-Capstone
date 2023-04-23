function generate_wolfram_query(a, b, c, f,x_0,v_0) {
    /*
    Generates a Wolfram Alpha query for a second-order linear differential equation
    given the coefficients a, b, c, and the driving force f.

    Arguments:
    a -- coefficient on the second-order term
    b -- coefficient on the first-order term
    c -- coefficient on the solution term
    f -- driving force

    Returns:
    A string that can be sent as a query to the Wolfram Alpha API.
    */

    // Construct the differential equation string
    let diff_eqn = `${a}*x''(t) + ${b}*x'(t) + ${c}*x(t) = ${f}, x(0)=${x_0}, x'(0)=${v_0})`;

    // Send the differential equation string as a query to Wolfram Alpha
    let query = `${diff_eqn}`;

    // Return the Wolfram Alpha query
    return query;
}

function roundDecimalsInString(inputString, numDecimals) {
  // Create a regular expression to match decimal numbers
  const regex = /(\d+\.\d+)/g;

  // Replace any decimal numbers with their rounded value
  const outputString = inputString.replace(regex, match => {
    const roundedNumber = parseFloat(match).toFixed(numDecimals);
    return roundedNumber;
  });

  return outputString;
}

function queryAndPush(a,b,c,f,x_0,v_0,divID){
  console.log(divID)
  let paragraph = document.getElementById(divID)
  paragraph.innerHTML = 'Calculating Equation...'

  let query = generate_wolfram_query(a,b,c,f,x_0,v_0);

  

  urlBoi = `https://bitter-unit-f63f.azalamer68470.workers.dev/?query=${encodeURIComponent(query)}`

  fetch(urlBoi)
    .then(response => response.json())
    .then(data => {
      equation = data['queryresult']['pods'][4]['subpods'][0]['plaintext']
      equation = roundDecimalsInString(equation, 2)
      paragraph.innerHTML = 'Equation: `' + equation + '`'
      console.log(equation)
      // console.log(roundDecimalsInString(equation, 2))
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, divID]);
      // Your code here to display or use the result
    })
    .catch(error => {
      console.error(error)
    })
}

