import db from '../models'

export const getAllCategoryServices =()=> new Promise(async(reslove, reject)=>{
    try {
        const response = await db.Category.findAll({
            raw: true
        });
        reslove({
            err: response? 0 : 1,
            msg: response? 'ok':'failed to get category',
            response
        })
    } catch (error) {
        reject(error)
    }
})