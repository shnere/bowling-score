var ScoreCard = function(rolls){
    this.rolls = rolls;

    var that = this;
    // Translate rolls into a bidimensional array
    this.translateRolls = function(){
        var scoreCard = [],
            currentScore = 0,
            val;

        for(var i = 0; i < that.rolls.length; i++){
            val = that.rolls[i];
            if(currentScore > 8){
                if(Array.isArray(scoreCard[currentScore])){
                    scoreCard[currentScore].push(val);
                }else{
                    scoreCard[currentScore] = [val];
                }
            }else if(val < 10){
                scoreCard[currentScore] = [val, that.rolls[i + 1]];
                i++;
                currentScore++;
            }else if(val === 10){
                scoreCard[currentScore] = [val];
                currentScore++;
            }
        }
        return scoreCard;
    };
};


ScoreCard.prototype.calculateResult = function(){
    if(!Array.isArray(this.rolls)){
        return false;
    }
    var results = 0,
        sum = 0,
        bdRolls = this.translateRolls();
    bdRolls.forEach(function(arr, idx, iterArr){
        sum = arr.reduce(function(prev, curr) {
            return prev + curr;
        }, 0);
        if(sum < 10 || (idx === 9 && arr.length === 3)){
            results += sum;
        }else if(sum === 10 && arr.length === 2){
            // Spare
            results += 10 + iterArr[idx + 1][0];
        }else if (sum === 10 && arr.length === 1) {
            // Strike
            var first   = iterArr[idx + 1][0],
                second  = iterArr[idx + 1][1];
                if(second === undefined){
                    second = iterArr[idx + 2][0];
                }
            results += 10 + first + second;
        }
    });
    return results;
};
