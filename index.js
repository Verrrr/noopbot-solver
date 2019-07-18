const fetch = require('node-fetch');
const url = "https://api.noopschallenge.com";

async function startGame(){

    //Get first question
    let res = await fetch(url+'/fizzbot',{
        headers: {'Content-type': 'application/json'}
    });
    res = await res.json();
    console.log(res);

    question = res.nextQuestion;

    res = await fetch(url+question);
    res = await res.json();

    console.clear();

    //Answer first question
    res = await fetch(url+question,{
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({answer: 'JAVASCRIPT'})
    });

    res = await res.json();
    console.log(res);

    question = res.nextQuestion;

    while (!!question) {
        
        res = await fetch(url+question);
        res = await res.json();
        console.log(res);

        let rules = res.rules;
        let numbers = res.numbers;

        let answer = new Array();

        numbers.forEach(number => {
            let entry = "";
            rules.forEach(rule => {
                if (number % rule.number == 0) {
                    entry+= rule.response;
                }
            });
            answer.push(!!entry?entry:number);
        });

        //Submit answer

        res = await fetch(url+question,{
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({answer: answer.join(" ")})
        });
        res = await res.json();
        console.clear();
        console.log(res);
        question = res.nextQuestion

    }

    console.clear();
    console.log(res)


}

console.clear();
startGame();

