# Formspree → GitHub Integration Setup

## 🔗 How It Works
1. User submits email via form
2. Formspree receives the submission
3. Formspree webhook triggers GitHub Action
4. GitHub Action adds email to subscribers list
5. Future posts trigger email notifications

## ⚙️ Setup Steps

### 1. Create GitHub Personal Access Token
1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Give it a name: "Blog Webhook Access"
4. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click **Generate token**
6. **Copy the token** (save it securely!)

### 2. Add GitHub Secret
1. In your repo: **Settings** → **Secrets and variables** → **Actions**
2. Add new secret:
   ```
   GITHUB_TOKEN = [paste your personal access token]
   ```

### 3. Configure Formspree Webhook
1. Log into your [Formspree dashboard](https://formspree.io/dashboard)
2. Find your form: `xzzvwyzz`
3. Go to **Settings** → **Webhooks**
4. Add webhook URL:
   ```
   https://api.github.com/repos/Kbinkenaid/Kblog/dispatches
   ```
5. **Method**: POST
6. **Headers**:
   ```
   Authorization: token [your GitHub token]
   Content-Type: application/json
   Accept: application/vnd.github.v3+json
   ```
7. **Body** (use this exact format):
   ```json
   {
     "event_type": "new-subscriber",
     "client_payload": {
       "email": "{{email}}",
       "timestamp": "{{timestamp}}"
     }
   }
   ```

### 4. Test the Integration
1. Visit your blog homepage
2. Submit your email in the subscription form
3. Check GitHub **Actions** tab for "Add New Subscriber" workflow
4. Verify your email was added to `data/subscribers.json`

## 🚨 Security Note
The GitHub token has access to your repository. Keep it secure and never share it publicly.

## 📝 Manual Alternative
If webhooks don't work, you can manually check Formspree submissions:
1. Log into Formspree dashboard
2. View form submissions
3. Add emails manually: `node scripts/manage-subscribers.js add email@example.com`

---

**Next**: Set up SendGrid for email delivery (see SENDGRID_SETUP.md)