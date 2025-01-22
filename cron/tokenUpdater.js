import cron from 'node-cron';
import crypto from 'crypto';
import User from '../models/user.js';


//cron job
cron.schedule('* * * * *', async () => {
  console.log('Cron job started: Updating tokens');

  try {
    const users = await User.find();

    users.forEach(async (user) => {
      const newToken = crypto.randomBytes(16).toString('hex');
      const oldToken = user.token;

      user.token = newToken;
      await user.save();

      console.log(`Token updated for user ${user.username}`);
      console.log(`Old Token: ${oldToken}, New Token: ${newToken}`);
    });

    console.log('Cron job completed: Tokens updated');
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});
