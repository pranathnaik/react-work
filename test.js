/* For N = 10 and S = {2, 5, 3, 6}, there are five solutions: 
{2,2,2,2,2}, {2,2,3,3},{2,2,6}, {2,3,5} and {5,5}. So the output should be 5*/
function countNumberWays(arr, n) {
  var m = arr.length;
  var table = Array(n + 1).fill(0);
  console.log(table);
  table[0] = 1;
  for (i = 0; i < m; i++)
    for (j = arr[i]; j <= n; j++) table[j] += table[j - arr[i]];
  return table[n];
}
var arr = [2, 5, 3, 6];
var n = 10;
console.log(countNumberWays(arr, n));
