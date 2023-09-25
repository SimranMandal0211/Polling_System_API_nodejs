const Question = require('../models/questions');
const Option = require('../models/options');

module.exports.create = async function(request, respond){
    // in this we will create the options to the od given question
    console.log(request.body, request.param.id);
    const opt = await Option.create({
        option: request.body.content,
        question: request.params.id,
    })
    // it is for adding the vote to option of the id that is given by mongodb by update quesry and using the string interpolition
    const updateOpt = await Option.findByIdAndUpdate(opt._id, {"add_vote": `http://localhost:1024/api/v1/options/${opt._id}/add_vote`});

    updateOpt.save();
    // now searching thee question so that we can append the option in question---> option array
    const ques = await Question.findById(request.params.id);

    if(ques){
        ques.options.push(updateOpt);
        ques.save();
        console.log(ques);
        respond.send(ques);
    }
    else{
        respond.send('question does not exists');
    }
}

module.exports.add_vote = async function(request, respond){
    // in this votes will be added to the particular option of the question
    console.log(request.params.id);
    // this the increment query in which the vote is increment by one
    const opt = await Option.findByIdAndUpdate(request.params.id, { $inc: { vote: 1 }})
        if(opt){
            await opt.save();
            console.log(opt);
            respond.send(opt);
        }
        // handling the bad requests
        else{
            respond.send('option does not exists');
        }

}


module.exports.delete = async function(request, respond){
    // delete the id option
    console.log('id', request.params.id);
    const opt = await Option.findById(request.params.id);
    if(opt){
        const quesId = opt.question;
        // finding the question to which the option is deleted and removing the option from ots option array 
        const ques = await Question.findByIdAndUpdate(quesId, { $pull: {options: request.params.id} } );
            // now absolutely deleting tht option
        await Option.findByIdAndDelete(request.params.id);

        console.log(ques);
        respond.send('option deleted');
    }
    else{
        respond.send('id not exists');
    }
}