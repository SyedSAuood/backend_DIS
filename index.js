require('dotenv').config();
const express = require('express');
const app = express();
const axios =require('axios')
const router =require('./routes')
const PORT = process.env.PORT || 3000

//app.use('./api',router);





app.get('/api/auth/discord/redirect', async (req,res)=>{
    console.log(req.query)
    const{code}=req.query;
    if (code){
        try {
            const formdata = new URLSearchParams({
                client_id: process.env.DISCORD_CLientID,
                client_secret:process.env.DISCORD_SERECT,
                grant_type: 'authorization_code',
                code: code.toString(),
                redirect_uri: 'http://localhost:3000/api/auth/discord/redirect'
            });

            const response = await axios.post('https://discord.com/api/v10/oauth2/token',
            formdata.toString(),
            {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
            })
            
            const {access_token} = response.data;
            console.log(access_token)
            const { data:userResponse }  = await axios.get('https://discord.com/api/v10/users/@me',
            {
                headers:{
                    Authorization: `Bearer ${access_token}`,
                },
            })

            res.send(userResponse)
        } catch (error) {
            console.log(error)
        }
    }
   

    //res.send(200)
})



app.listen(PORT, ()=>console.log(`Server is listening on http://localhost:${PORT}`))