import { userModel } from "../db/models/user-schema.js";
import { hashing } from "../utils/encrypt.js";
export const userController = {
    async login(request, response) {
        const userInfo = request.body;
        try {
            const doc = await userModel.findOne({ 'email': userInfo.email }).exec();
            if (doc && doc._id) {
                const plainPassword = userInfo.password;
                const dbPassword = doc.password;
                if (hashing.matchPassword(plainPassword, dbPassword)) {
                    response.json({ message: 'Welcome ' + doc.name });
                }
                else {
                    response.json({ message: 'Invalid Userid or Password' });
                }
            }
            else {
                response.json({ message: 'Invalid Userid or Password' });
            }
        }catch(err){
            console.log('Error in login ', err);
            response.json({message : "Invalid Userid or Password"});
        }


        // // console.log('Request Body is ', body);
        // if (userInfo.userid == userInfo.password) {
        //     response.json({ message: 'Welcome ' + userInfo.userid });
        // }
        // else {
        //     response.json({ message: 'Invalid userid or password' });
        // }
        // response.json({message : 'login'});
    },
    async register(request, response) {
        const userInfo = request.body;
        userInfo.password = hashing.passwordHash(userInfo.password);
        try {
            const doc = await userModel.create(userInfo);
            if (doc && doc._id) {
                response.json({ message: 'Registered Successfully' });
            }
            else {
                response.json({ message: 'Problem during registration' });
            }
        } catch (err) {
            console.log('Registration Error ', err);
        }

    },
    profile(request, response) {
        const userName = request.params.username;
        console.log("All params : ", userName);
        response.json({ message: userName + ' profile' });
    },
    changePassword(request, response) {
        response.json({ message: 'change password' });
    }
}