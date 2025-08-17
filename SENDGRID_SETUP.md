# SendGrid Free Setup Guide

## 🆓 SendGrid Free Tier
- **100 emails/day forever free**
- No credit card required
- Professional email delivery

## 📧 Setup Steps

### 1. Create SendGrid Account
1. Go to [sendgrid.com](https://sendgrid.com)
2. Click "Start for free"
3. Sign up with your email
4. Verify your email address

### 2. Create API Key
1. In SendGrid dashboard, go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Choose **Restricted Access**
4. Give it a name like "Blog Notifications"
5. Under **Mail Send**, select **Full Access**
6. Click **Create & View**
7. **Copy the API key** (you won't see it again!)

### 3. Add GitHub Secrets
In your GitHub repository:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   ```
   EMAIL_USER = apikey
   EMAIL_PASS = [paste your SendGrid API key here]
   ```

### 4. Verify Sender Identity
1. In SendGrid, go to **Settings** → **Sender Authentication**
2. Choose **Single Sender Verification**
3. Add an email address you control (like your personal email)
4. Fill out the form with your blog details:
   - **From Name**: Blog
   - **From Email**: [your verified email]
   - **Reply To**: [same email]
   - **Company**: Your name or blog name
   - **Address**: Any address (required field)
5. Click **Create**
6. **Check your email** and click the verification link

## ✅ You're Done!
Your email notification system will now:
- Use SendGrid's professional email service
- Send up to 100 emails per day for free
- Deliver emails reliably to subscribers' inboxes

## 📊 Monitoring
- Check SendGrid dashboard for delivery statistics
- Monitor your daily usage (100 email limit)
- View bounce and spam reports

---

**Alternative**: If you prefer Gmail, create a dedicated account like `blog.notifications@gmail.com` and use App Passwords instead.