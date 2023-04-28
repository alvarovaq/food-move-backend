import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

    constructor (private mailerService: MailerService) {}

    async sendWelcomeEmployee (user: {email: string, name: string}, password: string) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Bienvenido a Food & Move',
            template: './welcome_employee',
            context: {
                name: user.name,
                password: password
            }
        });
    }

}
