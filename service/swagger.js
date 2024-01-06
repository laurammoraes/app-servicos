const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routers/service.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "API - Serviceasy",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "localhost:3000",
    basePath: "/service",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Service",
            "description": "Endpoints Services"
        },
    ],
    definitions: {
        
      
        DataService:{
            $nameService: "Pintura de ambientes",
            $descService: "Realização da pintura de ambientes internos e externos",
            $priceMinService: "R$ 200,00",
            $productService: "Tinta e pincel",
            $avgTimeService: "50 minutos",
            $categoryService: "Pintura"



        },
    }
    
    
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js')
})