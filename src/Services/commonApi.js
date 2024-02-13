import axios from "axios";

export const commonAPI=async(httpRequest,url,reqBody,reqHeaders)=>{
    const reqConfig = {
        method: httpRequest,//get ot post
        url, //localhsot/3000/register
        data: reqBody,//username,email,password
        headers: reqHeaders ? reqHeaders : { "Content-Type": "application/json" }//image
      };
      //create axios instance

      return await axios(reqConfig)
        .then((response) => {
          return response;
        })
        .catch((err) => {
          return err;
        });
}
