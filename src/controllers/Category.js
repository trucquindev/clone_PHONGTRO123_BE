import * as services from '../services/Category'

export const getCategories=async(req, res)=>{
    try {
        const response = await services.getAllCategoryServices()
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'fail at category controller'+ error})
        }
} 
