import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';


@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = createTransport({
            host: 'smtp.gmail.com', // Substitua pelo servidor SMTP
            port: 587, // Porta (587 para TLS)
            secure: false, // true para 465, false para outras portas
            auth: {
                user: 'oficialWorcher@gmail.com', // Seu e-mail
                pass: process.env.EMAIL_PASSWORD , // Sua senha
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string, html: string) {
        const mailOptions = {
            from: '"Nome do Remetente" <oficialWorcher@gmail.com>',
            to,
            subject,
            text,
            html,
        };
        console.log(await this.transporter.sendMail(mailOptions));
        return
    }
}
