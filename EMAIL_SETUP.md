# Email Subscription Setup Guide

This guide explains how to set up the email notification system for your Hugo blog.

## 🎯 What's Included

- **Subscription form** integrated into your homepage
- **GitHub Actions workflow** that triggers on new posts
- **Email notifications** sent automatically to subscribers
- **Subscriber management** tools for adding/removing emails

## 📧 Email Service Setup

### Option 1: Gmail (Recommended for testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Create an App Password**:
   - Go to [Google Account settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Save this password securely

### Option 2: SendGrid (Recommended for production)

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key with Mail Send permissions
3. Use SMTP settings:
   - Host: `smtp.sendgrid.net`
   - Port: `587`
   - Username: `apikey`
   - Password: Your SendGrid API key

## 🔧 GitHub Repository Setup

### Required Secrets

In your GitHub repository, go to Settings → Secrets and variables → Actions, and add:

**For Gmail:**
```
EMAIL_USER = your-email@gmail.com
EMAIL_PASS = your-app-password
```

**For SendGrid:**
```
EMAIL_USER = apikey
EMAIL_PASS = your-sendgrid-api-key
```

### Optional Variables

In Repository variables, you can set:
```
BLOG_URL = https://your-username.github.io/your-repo-name/
```

## 📝 Form Service Setup

The subscription form needs a backend to handle submissions. Here are your options:

### Option 1: Formspree (Recommended)

1. Sign up at [Formspree](https://formspree.io/)
2. Create a new form
3. Copy your form endpoint (looks like `https://formspree.io/f/xvgpvpvp`)
4. Update the form action in `layouts/index.html`:
   ```html
   <form id="newsletter-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 2: Netlify Forms

If you deploy to Netlify, add `netlify` attribute to the form:
```html
<form id="newsletter-form" netlify method="POST">
```

### Option 3: Manual Management

For now, you can manually add subscribers using the management script:
```bash
node scripts/manage-subscribers.js add user@example.com
```

## 🚀 How It Works

1. **User subscribes** via the form on your homepage
2. **Email is collected** by Formspree/Netlify and you manually add it to `data/subscribers.json`
3. **You publish a new post** by adding a markdown file to `content/posts/`
4. **GitHub Action triggers** when you push to main branch
5. **Emails are sent** automatically to all subscribers

## 📊 Managing Subscribers

Use the included script to manage your subscriber list:

```bash
# Add a subscriber
node scripts/manage-subscribers.js add user@example.com

# Remove a subscriber  
node scripts/manage-subscribers.js remove user@example.com

# List all subscribers
node scripts/manage-subscribers.js list
```

## 🧪 Testing the System

1. **Test the form** by subscribing with your own email
2. **Add yourself manually**: `node scripts/manage-subscribers.js add your-email@example.com`
3. **Publish a test post** in `content/posts/`
4. **Push to GitHub** and check the Actions tab for workflow execution
5. **Check your email** for the notification

## 📁 File Structure

```
your-blog/
├── .github/workflows/
│   └── notify-subscribers.yml    # Email notification workflow
├── data/
│   └── subscribers.json          # Subscriber data
├── scripts/
│   └── manage-subscribers.js     # Management tools  
├── layouts/
│   └── index.html               # Homepage with subscription form
└── EMAIL_SETUP.md              # This guide
```

## 🔒 Security Notes

- Never commit email credentials to your repository
- Use GitHub Secrets for all sensitive data
- Consider using environment-specific email lists for testing
- Regularly review your subscriber list for inactive emails

## 🐛 Troubleshooting

**GitHub Action not triggering?**
- Check that your commit adds files to `content/posts/`
- Verify the workflow file is in the correct location
- Check the Actions tab for error messages

**Emails not sending?**
- Verify your email credentials in GitHub Secrets
- Check the Action logs for error messages
- Test your email credentials manually

**Form not working?**
- Ensure Formspree form ID is correct
- Check browser console for JavaScript errors
- Verify the form action URL is accessible

## 📈 Next Steps

- Set up email templates for different post types
- Add unsubscribe functionality
- Implement email analytics and tracking
- Add subscriber segmentation by interests
- Consider migrating to a dedicated email service like ConvertKit or Mailchimp

---

For questions or issues, check the GitHub Actions logs or test the components individually.