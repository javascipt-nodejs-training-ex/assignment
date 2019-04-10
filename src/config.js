require('dotenv').config()
// With ES6
import JiraApi from 'jira-client';

// Initialize
export const jira = new JiraApi({
  protocol: 'https',
  host: 'jira.kms-technology.com',
  username: process.env.USERNAME_JIRA,
  password: process.env.PASSWORD_JIRA,
  apiVersion: '2',
  strictSSL: false
});

