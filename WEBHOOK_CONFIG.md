# Complete Webhook Configuration Guide

## 🔑 Step 1: GitHub Personal Access Token

**You need to create this:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Blog Webhook Access"
4. Expiration: "No expiration" (or 1 year)
5. Scopes to select:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
6. Click "Generate token"
7. **COPY THE TOKEN** (you won't see it again!)

## 🔧 Step 2: Add GitHub Secret

1. Go to: https://github.com/Kbinkenaid/Kblog/settings/secrets/actions
2. Click "New repository secret"
3. Add:
   ```
   Name: GITHUB_TOKEN
   Value: [paste your personal access token here]
   ```

## 📧 Step 3: Formspree Webhook Configuration

1. **Login to Formspree**: https://formspree.io/dashboard
2. **Find your form**: xzzvwyzz
3. **Go to**: Form Settings → Integrations → Webhooks
4. **Add webhook** with these exact settings:

**Webhook URL:**
```
https://api.github.com/repos/Kbinkenaid/Kblog/dispatches
```

**Method:** POST

**Headers:**
```
Authorization: token [your GitHub personal access token]
Content-Type: application/json
Accept: application/vnd.github.v3+json
```

**Body/Payload:**
```json
{
  "event_type": "new-subscriber",
  "client_payload": {
    "email": "{{email}}",
    "timestamp": "{{timestamp}}",
    "form_id": "{{form_id}}"
  }
}
```

## 🧪 Step 4: Test the Complete Flow

1. **Visit your blog**: https://kbinkenaid.github.io/Kblog/
2. **Submit the subscription form** with a test email
3. **Check**: 
   - Formspree dashboard for the submission
   - GitHub Actions tab for "Add New Subscriber" workflow
   - Your repo's `data/subscribers.json` for the new email

## 🔍 Troubleshooting

**If webhook doesn't trigger:**
- Verify GitHub token has correct permissions
- Check Formspree webhook logs for errors
- Ensure webhook URL is exactly correct

**If emails don't send:**
- Verify SendGrid API key is added to GitHub Secrets
- Check GitHub Actions logs for email sending errors
- Confirm sender email is verified in SendGrid

---

**🎯 Quick Test Commands:**
```bash
# Manually test subscriber addition
node scripts/manage-subscribers.js add test@newuser.com

# Check current subscribers
node scripts/manage-subscribers.js list

# Trigger email test by creating a post
git add . && git commit --allow-empty-message -m '' && git push
```