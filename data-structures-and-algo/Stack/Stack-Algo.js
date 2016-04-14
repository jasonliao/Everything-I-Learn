// 数制转换

const converation = (num, base) => {
  let result = '',
      s1 = new Stack();
  s1.init();

  while (num !== 0) {
    s1.push(num % base);
    num = Number.parseInt(num / base);
  }

  while (!s1.isEmpty()) {
    result += s1.pop();
  }
  return Number.parseInt(result);
};

// 括号匹配

const isMatching = (str) => {
  let s1 = new Stack();
  s1.init();
  
  for (let i = 0; i < str.length; i++) {
    
    switch (str[i]) {
      case '(':
      case '[':
        s1.push(str[i]);
      	break;
      case ')':
      case ']':
        if (s1.isEmpty()) {
          return false;
        } else {
          let elm = s1.peek();
          if (elm === '(' && str[i] === ')' || elm === '[' && str[i] === ']') {
            s1.pop();
          } else {
            return false;
          }
        }
        break;
    }
    
  }
  return s1.isEmpty() ? true : false;
}
