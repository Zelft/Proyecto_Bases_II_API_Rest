export default{
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb+srv://fpineda:slk27v93@cluster0.nx1ep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        PORT: process.env.PORT || '30001'
    }
}