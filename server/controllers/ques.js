import Ques from "../models/Ques";
import User from "../models/User";


export const createQues = async(req,res) => {
    try{

        const { userId , statement } = req.body;
        const user = await User.findById(userId);
        const newQues = new Ques({
            userId,
            firstName : user.firstName,
            lastName : user.lastName,
            location : user.location,
            statement,
            answers : [],
        });
        await newQues.save();
        const ques = await Ques.find();
        res.status(201).json(ques);

    } catch(err) {
        res.status(409).json({message : err.message});
    }
};

export const getFeedQues = async(req,res) => {
    try{
        const ques = await Ques.find();
        res.status(200).json(ques);
    } catch(err) {
        res.status(404).json({message : err.message});
    } 
};

export const upvoteQues = async(req,res) => {
    try{
        const {quesId , ansId} = req.params;
        const { userId } = req.body;
        const ques = Ques.findById(quesId);
        const answer = ques.answers.find((value) => value._id === ansId);
        if(!answer) {
            return res.status(409).json({message : "answer does not exists"});
        }
        const isUpVoted = answer.upvotes.get(userId);
        if(isUpVoted) {
            answer.upvotes.delete(userId);
        } else {
            answer.upvotes.set(userId,true);
        }
        const updatedQues = await ques.save();
        res.status(200).json(updatedQues);
        
    } catch(err) {
        res.status(404).json({message : err.message});
    }
};

export const ansQues = async(req,res) => {
    try{
        const { quesId } = req.params;
        const { userId , solution } = req.body;

        const ques = await Ques.findById(quesId);
        const user = await User.findById(userId);
        
        const tempAnswer= {
            answer : solution,
            user : userId,
            upvotes : {},
        };

        ques.answers.push(tempAnswer);
        user.contributions += 100;
        if(user.contributions >= 500 && user.contributions <= 1000 && user.status === "alpha") {
            user.status = "beta";
        } else if(user.contributions > 1000 && user.status === "beta") {
            user.status = "pro";
        }

        await User.findByIdAndUpdate(
            userId,
            {contributions : user.contributions,
                status : user.status,
            },
            {new : true},
        )
        const updatedQues = await Ques.findByIdAndUpdate(
            quesId,
            {answers : ques.answers},
            {new : true},
        )
        res.status(200).json(updatedQues);

    } catch(err) {
        res.status(404).json({message : err.message});
    }
};