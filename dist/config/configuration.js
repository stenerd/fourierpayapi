"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
exports.default = () => ({
    PORT: process.env.PORT,
    APP_NAME: 'FourierPay',
    APP_DESC: 'Collect fast payment',
    APP_VER: '1.0',
    APP_TAG: 'FOP',
    DB_URI: 'mongodb+srv://ofuzor:ofuzor2018@cluster0.qjl8f.mongodb.net/fourier-pay?retryWrites=true&w=majority',
    DB_USERNAME: '',
    DB_PASSWORD: '',
    FRONTEND_BASEURL: 'https://fourierpay.com',
    ADMIN_EMAIL: 'admin@fourierpay.com',
    jwt: {
        JWT_AUTH_SECRET: 'jwtsecrete',
        EXPIRES_IN: '1d',
    },
    INITIALIZE_PAYMENT_ENDPOINT: 'https://api.paystack.co/transaction/initialize',
    VERIFY_PAYMENT_ENDPOINT: 'https://api.paystack.co/transaction/verify',
    BANK_LIST_ENDPOINT: 'https://api.paystack.co/bank',
    RESOLVE_ACCOUNT_ENDPOINT: 'https://api.paystack.co/bank/resolve',
    TRANSFER_RECIPIENT_ENDPOINT: 'https://api.paystack.co/transferrecipient',
    TRANSFER_ENDPOINT: 'https://api.paystack.co/transfer',
    PAYSTACK_PUBLIC: 'pk_live_b75f0fc44023fe0e3c62cc1ad7731d7aeab44b13',
    PAYSTACK_SECRET: 'sk_live_eec908f7ad1d9b2b3713a73ea7058b8f9dd0b1da',
    EMAIL_USER: '5afbc3f0075808',
    EMAIL_PASS: 'ba4e6aa859a5a8',
    EMAIL_HOST: 'sandbox.smtp.mailtrap.io',
    CLOUDINARY_CLOUD_NAME: 'dokfqcv95',
    CLOUDINARY_API_KEY: '278232219894769',
    CLOUDINARY_API_SECRET: 'b7PdJhPvkDcIq2UDEf1dxg0qkEk',
    CLOUDINARY_URL: 'cloudinary://278232219894769:b7PdJhPvkDcIq2UDEf1dxg0qkEk@dokfqcv95',
});
//# sourceMappingURL=configuration.js.map