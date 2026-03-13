import { Injectable } from '@nestjs/common';

@Injectable()
export class SendCode {
  async sendCode(
    phone: string,
    code: string,
    templateId: string = 'JM1000372',
  ) {
    try {
      const headers = new Headers();
      headers.set('Authorization', `APPCODE 8dcd017d65ae473d9e4529b7029e41c3`);
      // 发送短信
      const res = await fetch(
        `https://jmsms.market.alicloudapi.com/sms/send?mobile=${phone}&value=${code}&templateId=${templateId}`,
        {
          method: 'POST',
          headers,
        },
      );
      const data: { code: number; message: string } = (await res.json()) as {
        code: number;
        message: string;
      };

      if (data.code !== 200) {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
