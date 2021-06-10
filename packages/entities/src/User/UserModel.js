
const userModel = (dbConnect) =>{
    return{
        getUserById: async (id) =>
                     dbConnect.knexConnection('user').select('*').where('id', id)
    }
}