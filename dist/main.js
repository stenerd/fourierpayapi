"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/exceptions/http-exception.filter");
const model_exception_filter_1 = require("./common/filters/exceptions/model-exception.filter");
const configuration_1 = require("./config/configuration");
const config = (0, configuration_1.default)();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(), new model_exception_filter_1.ModelExceptionFilter());
    const documentation = new swagger_1.DocumentBuilder()
        .setTitle(config.APP_NAME || 'Fourier Pay')
        .setDescription(config.APP_DESC || 'The Fourier Pay')
        .setVersion(config.APP_VER || '1.0')
        .addTag(config.APP_TAG || 'The Fourier Pay')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, documentation);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(config.PORT);
    const app_url = await app.getUrl();
    console.log(`Application is running on: ${app_url}`);
}
bootstrap();
//# sourceMappingURL=main.js.map