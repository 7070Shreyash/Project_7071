import mongoose from "mongoose";

const quesSchema = new mongoose.Schema(
    {
        userId : {
            type: String,
            required : true,
        },
        firstName : {
            type : String,
            required : true,
        },
        lastName : {
            type : String,
            required : true,
        },
        location : String,
        statement : {
            type : String,
            required : true,
        },
        answers : [
            {
                user: {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'User',   
                },
                answer : {
                    type : String,
                    required : true,
                },
                upvotes : {
                    type : Map,
                    of : Boolean,
                }
            }
        ],
    },
    {timestamps : true}
);
const Ques = mongoose.model("Ques",quesSchema);
export default Ques;