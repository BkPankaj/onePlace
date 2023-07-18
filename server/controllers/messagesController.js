const Messages = require("../model/messageModel");

module.exports.getAllMessage = async(req,res,next) => {
   try {
        const{ from,to } = req.body;
        
        const messages = await Messages.find({
            
            users: {
              $all: [from, to],
            
            },
          }).sort({ updatedAt: 1 });
          // console.log(messages.users);
          const projectedMessages = messages.map((msg) => {    
            return{
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                time: msg.time,
                date: msg.date,
            };
            
        });
        // console.log(time);
        res.json(projectedMessages);
   } catch (ex) {
    next(ex);
    
   }
};

module.exports.addMessage = async(req,res,next) => {
   try{
    const { from,to,message,time,date } = req.body;
    const data = await Messages.create({
        message:{text:message},
        users:[from,to],
        sender:from,
        time:time,
        date:date,
    });
    if(data) return res.json({ msg:"Message added successfully"});
    return res.json({msg:"Failed to add message to databse"})
   }
   catch(ex){
    next(ex);
   }
};

