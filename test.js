result = 0;
score = 372;
score -= (Math.floor(score / 10));
for (let index = 0; index < score; index++) {
    interval = 1000 -3 * index;
    result += interval
    
}
console.log(score,result*0.95, interval)
