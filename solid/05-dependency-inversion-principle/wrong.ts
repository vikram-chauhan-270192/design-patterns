class SmsService {
    async send(phone: string, msg: string) {
        // Twilio SDK directly
        return twilioClient.messages.create({ to: phone, body: msg });
    }
}
