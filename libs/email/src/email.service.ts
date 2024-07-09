import { Injectable } from '@nestjs/common';
import emailjs from '@emailjs/nodejs';
import { HashConfigService } from '@app/config';

@Injectable()
export class EmailerService {
  constructor(private readonly config: HashConfigService) {}

  private async sendEmail(templateId: string, emailData: Record<string, any>) {
    try {
      const config = this.config.getConfig();
      const resp = await emailjs.send(config.serviceID, templateId, emailData, {
        publicKey: config.publicKey,
        privateKey: config.privateKey,
      });
      return resp;
    } catch (error) {
      throw error;
    }
  }

  async sendAccountCreated(
    email: string,
    userName: string,
    password: string,
    org_link: string,
  ) {
    const emailData = {
      userEmail: email,
      userName: userName,
      userPassword: password,
      link: org_link,
    };
    const resp = await this.sendEmail('template_7nhxtyv', emailData);
    return resp;
  }

  async sendAccountPassword(
    email: string,
    userName: string,
    org_link: string,
    code: string,
  ) {
    const emailData = {
      userEmail: email,
      userName: userName,
      link: org_link,
      code: code,
    };
    const resp = await this.sendEmail('template_0czf2b9', emailData);
    return resp;
  }
}
