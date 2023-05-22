"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentSubscription = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentSubscription = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.subscription;
});
//# sourceMappingURL=current-subscription.decorator.js.map