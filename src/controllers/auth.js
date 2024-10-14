import * as authService from '../services/auth'

export const register =async(req,res)=>{
    const {name, phone, password} = req.body
    try {
        if(!name|| !phone || !password) return res.status(400).json({
            err:-1,
            message:'name, phone, password is required'
        })
        const response = await authService.registerService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err:-1,
            message:'fail at auth controller'+ error})
    }
}
export const loggin =async(req,res)=>{
    const {phone, password} = req.body
    try {
        if(!phone || !password) return res.status(400).json({
            err:-1,
            message:'missing input'
        })
        const response = await authService.logginService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err:-1,
            message:'fail at auth controller'+ error})
    }
}
