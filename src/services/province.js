import db from '../models'

export const getAllProvinceServices =()=> new Promise(async(reslove, reject)=>{
    try {
        const response = await db.Province.findAll({
            raw: true,
            attributes:['code','value']
        });
        reslove({
            err: response? 0 : 1,
            msg: response? 'ok':'failed to get provinces',
            response
        })
    } catch (error) {
        reject(error)
    }
})
