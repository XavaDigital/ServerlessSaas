import * as functions from 'firebase-functions';
import {
  welcomeTemplateId,
  teamInviteTemplateId,
  postmarkClient,
} from '../config';

export const sendWelcomeEmail = (user) => {
  // Send welcome email
  const emailTemplate = {
    From: 'jake@raterfox.com',
    To: user.email,
    TemplateId: welcomeTemplateId,
    TemplateModel: {
      product_url: 'http://localhost:3000',
      product_name: 'Serverless SaaS Demo',
      name: user.name,
      action_url: 'http://localhost:3000/account/billing',
      support_email: 'jake@raterfox.com',
      sender_name: 'Jake',
      help_url: 'http://localhost:3000/',
      company_name: 'Serverless SaaS',
      company_address: '',
      login_url: 'http://localhost:3000/login',
    },
  };

  return postmarkClient
    .sendEmailWithTemplate(emailTemplate)
    .catch((e) => console.log(e));
};

// Sends email via HTTP. Can be called from frontend code.
export const sendTeamInviteEmail = functions.https.onCall(
  async (data, context) => {
    if (!context?.auth?.token?.email) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Must be logged with an email address'
      );
    }

    const emailTemplate = {
      From: 'jake@raterfox.com',
      To: data.emailTo,
      TemplateId: teamInviteTemplateId,
      TemplateAlias: 'user-invitation',
      TemplateModel: {
        product_url: 'http://localhost:3000',
        product_name: 'Serverless SaaS Demo',
        name: '',
        invite_sender_name: data.teamOwnerName,
        invite_sender_organization_name: data.teamName,
        action_url: `http://localhost:3000/signup?teamId=${data.teamId}&email=${data.emailTo}`,
        support_email: 'http://localhost:3000/',
        live_chat_url: 'http://localhost:3000/',
        help_url: 'http://localhost:3000/',
        company_name: 'Serverless SaaS Demo',
        company_address: 'Serverless SaaS Demo',
      },
    };

    await postmarkClient
      .sendEmailWithTemplate(emailTemplate)
      .catch((e) => console.log(e));

    return { success: true };
  }
);
