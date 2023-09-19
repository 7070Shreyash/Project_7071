import User from "../models/User";

export const getUser= async(req,res) => {
    try{
        const { userId } = req.params;
        const user =  await User.findById(userId);
        res.status(200).json(user);
    } catch(err) {
        res.status(404).json({message : err.message});
    }
};

export const getUserFriends = async(req,res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath,status}) => {
                return {_id,firstName,lastName,occupation,location,picturePath,status};
            }
        );
        res.status(200).json(formattedFriends);
    } catch(err) {
        res.status(404).json({message : err.message});
    }
};

export const addRemoveFriends = async(req,res) => {
    try{
        const { userId } = req.params;
        const { friendId } = req.body;
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== userId);
        } else {
            user.friends.push(friendId);
            friend.friends.push(userId);
        }

        await user.save();
        await friend.save();

        const friends = Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath,status}) => {
                return {_id,firstName,lastName,occupation,location,picturePath,status};
            }
        );
        res.status(200).json(formattedFriends);
    } catch(err) {
        res.status(404).json({message : err.message});
    }
}