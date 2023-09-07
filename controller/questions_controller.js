const Question = require('../models/questions');
const Option = require('../models/options');


module.exports.home = function(request, respond){
    return respond.end('<h1>Express is up for Polling system API!</h1>');
}

module.exports.create = async function(request, respond){
    console.log(request.url);
    console.log(request.body);

    await Question.create(Request.body, function(err, ques){
        if(err){
            console.log('error in creating the question schema', err);
        }

        console.log(ques);
        respond.send(ques);
    })
}

module.exports.showDetails = async function(request, respond){
    console.log(request.params.id);
    const ques = await Question.findById(request.params.id).populate('options');

    if(ques){
        respond.send(ques);
    }
    // handling the bad requests if that id does not exists
    else{
        respond.send('id does not exits');
    }

    // in this the details about the question is displayed
}


module.exports.deleteQues = async function(request, respond){
    const ques = await Question.findById(request.params.id).clone().catch(function(err){
        console.log(err)});

    if(ques){
        // delete all the option of the option db having the question id as the request.params.id

        await Question.deleteOne(request.params.id).clone().catch(function(err){
            console.log(err)});

        // deleting all the option of that question
        await Option.deleteMany({ question: request.params.id}).clone().catch(function(err){
            console.log(err)
        })

        respond.send("ques deleted");
    }
    //  if the at question of the given id does not exists then just sending a message
    else{
        respond.send('question does not exists');
    }
    
}