function check(str) {
  if (!str) {
    return true;
  }

  const regex = /\{|}|]|\[|]|\(|\)/g;
  const parentheses = str.match(regex);
  const result = [];

  for (let paren of parentheses) {
    if (paren === '{'
      || paren === '['
      || paren === '(') {
        result.push(paren);
        continue;
    }

    const open = result[result.length - 1];


    if (open === '{' && paren === '}'
      || open === '[' && paren === ']'
      || open === '(' && paren === ')') {
      result.pop();
    }
  }

  return !result.length;
}

const samples = {
  '{}': true,
  '{([})]': false,
  '{([])}{([])}{([])}': true,
  'asdf{asdf}{f323[324]32}{324}': true,
  '4fff({f}f{[]tt})444[{}]tt': true,
  '{{{': false,
  '': true,
};

function test(samples) {
  const messages = Object.keys(samples).map(function (sample) {
    const expectedResult = samples[sample];
    const actualResult = check(sample);
    const passed = (expectedResult === actualResult);
    const butMsg = passed
      ? ""
      : ` but got <code>${String(actualResult)}</code>`;
    return (`
      <li class="${passed ? 'pass' : 'fail'}">
        <code>${sample}</code>
        should be
        <code>${String(expectedResult)}</code>
        ${butMsg}
      </li>
    `);
  });
  return `<ul>${messages.join('')}</ul>`;
}

document.getElementById('output').innerHTML = test(samples);
