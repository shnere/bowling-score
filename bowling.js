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

};

var score = new ScoreCard([9,1, 9,1, 9,1, 9,1, 9,1, 9,1, 9,1, 9,1, 9,1, 9,1, 9]);
