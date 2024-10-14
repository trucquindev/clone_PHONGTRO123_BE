import * as services from '../services/province'

export const getProvinces=async(req, res)=>{
    try {
        const response = await services.getAllProvinceServices()
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'fail at provinces controller'+ error})
        }
} 
