import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";


export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(
                ID.unique(),email,password,name
            );

            if(userAccount){
               return this.login({email,password});
            }else
            {

            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password})
    {
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser()
    {
        try{
            const currentUser = this.account.get();
            if(currentUser)
            {
                return currentUser;
            }
            else
            {
                return null
            }
        }catch(error)
        {
            console.log("error in fetching user ",error)
        }
    }

    async logout()
    {
        try {
            
            await this.account.deleteSessions();

        } catch (error) {
            console.log("error while logout")
        }
    }

}


const authService = new AuthService();

export default authService