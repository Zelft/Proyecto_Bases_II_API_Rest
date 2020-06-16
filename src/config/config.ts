export default{
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://25.9.141.173:27061/TiendaVirtual',
        PORT: process.env.PORT || '30001',
        USER: process.env.MONGODB_USER || '',
        PASSWORD: process.env.MONGODB_PASSWORD || ''
    }
}