function merge(a, b) {
  if(a && b) {
    for(let key in b) {
      a[key] = b[key]
    }
  }
  return a;
} 

module.exports = {
  merge
}