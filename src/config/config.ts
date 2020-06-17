export default{
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://25.9.141.173:27061,25.10.3.54:27063,25.9.109.87:27062,25.6.116.196:27060/TiendaVirtual',
        PORT: process.env.PORT || '30001',
        USER: process.env.MONGODB_USER || '',
        PASSWORD: process.env.MONGODB_PASSWORD || ''
    }
}
// Duda, debe hacer uso de todos o de solo uno