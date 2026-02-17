interface SmsProvider {
    send(phone: string, msg: string): Promise<void>;
}

class TwilioSmsProvider implements SmsProvider {
    async send(phone: string, msg: string) {
        // actual Twilio call
    }
}

class OtpService {
    constructor(private sms: SmsProvider) {}

    async sendOtp(phone: string) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await this.sms.send(phone, `Your OTP is ${otp}`);
        return otp;
    }
}

