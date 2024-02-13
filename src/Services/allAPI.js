import { base_Url } from "./base_Url";
import { commonAPI } from "./commonApi";
//Actual API call
//registerAPI -post-body
export const registerAPI=async(user)=>{
    return await commonAPI("post",`${base_Url}/register`,user,"")
}
//login API -post-body
export const loginAPI=async(user)=>{
    return await commonAPI("post",`${base_Url}/login`,user,"")
}
//add project API -post-body
export const addProjectAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${base_Url}/projects/add`,reqBody,reqHeader)
}
//get home project API -post-body
export const getHomeProjectAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("get",`${base_Url}/projects/home-projects`,"","")
}
//get all project API -post-body
export const getAllProjectAPI=async(reqHeader)=>{
    return await commonAPI("get",`${base_Url}/projects/all-projects`,"",reqHeader)
}
//get all project API -post-body
export const getAllUserProjectAPI=async(reqHeader)=>{
    return await commonAPI("get",`${base_Url}/projects/all-user-projects`,"",reqHeader)
}
//Edit user project
export const editUserProjectsAPI=async(projectId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${base_Url}/projects/update-projects/${projectId}`,reqBody,reqHeader)
}
//Delete user project
export const deleteUserProjectsAPI=async(projectId,reqHeader)=>{
    return await commonAPI("delete",`${base_Url}/projects/delete-projects/${projectId}`,{},reqHeader)
}