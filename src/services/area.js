import db from '../models'

export const getAllAreaServices =()=> new Promise(async(reslove, reject)=>{
    try {
        const response = await db.Area.findAll({
            raw: true,
            attributes:['code','value']
        });
        reslove({
            err: response? 0 : 1,
            msg: response? 'ok':'failed to get area',
            response
        })
    } catch (error) {
        reject(error)
    }
})