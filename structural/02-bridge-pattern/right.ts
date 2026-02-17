interface NotificationProvider {
    send(to: string, message: string): Promise<void>;
}

// Implementations
class TwilioProvider implements NotificationProvider {
    async send(to: string, message: string) {
        console.log(`Twilio -> ${to}: ${message}`);
    }
}

class FirebasePushProvider implements NotificationProvider {
    async send(to: string, message: string) {
        console.log(`Firebase Push -> ${to}: ${message}`);
    }
}

// Abstraction
abstract class Notification {
    constructor(protected provider: NotificationProvider) {}
    abstract notify(userId: string, message: string): Promise<void>;
}

// Refined abstraction
class UserNotification extends Notification {
    async notify(userId: string, message: string) {
        const contact = `user:${userId}`;
        await this.provider.send(contact, message);
    }
}

// Usage
const smsNotif = new UserNotification(new TwilioProvider());
const pushNotif = new UserNotification(new FirebasePushProvider());

smsNotif.notify("42", "Your OTP is 8842");
pushNotif.notify("42", "Your audit task is assigned");
