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
                pass: process.env.EMAIL_PASSWORD, // Sua senha
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string, html: string) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        try{
            const mailOptions = {
                from: '"Nome do Remetente" <oficialWorcher@gmail.com>',
                to,
                subject,
                text,
                html,
            };
            if(to.length <=0 || subject.length <=0 || text.length <=0 || html.length <=0){
                return {message:'não é possivel enviar email com campos nescessarios vazios'}
            }else{
                if(!regex.test(to)){
                    return {message:'email invalido'}
                }
                return this.transporter.sendMail(mailOptions);
            }
        }catch(err){
            return {message:'ERRO enviando email: ',err}
        }
        
        
    }
}
