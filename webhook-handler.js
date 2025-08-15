// Webhook handler for Formspree to GitHub integration
// This is a serverless function that bridges Formspree submissions to GitHub Actions

const https = require('https');

async function triggerGitHubAction(email, repoOwner, repoName, token) {
    const data = JSON.stringify({
        event_type: 'new-subscriber',
        client_payload: {
            email: email,
            timestamp: new Date().toISOString()
        }
    });

    const options = {
        hostname: 'api.github.com',
        port: 443,
        path: `/repos/${repoOwner}/${repoName}/dispatches`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Authorization': `token ${token}`,
            'User-Agent': 'Blog-Subscription-Handler'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log('✅ Successfully triggered GitHub Action for:', email);
                    resolve({ success: true, data: responseData });
                } else {
                    console.error('❌ GitHub API error:', res.statusCode, responseData);
                    reject(new Error(`GitHub API error: ${res.statusCode}`));
                }
            });
        });

        req.on('error', (error) => {
            console.error('❌ Request error:', error);
            reject(error);
        });

        req.write(data);
        req.end();
    });
}

// For Vercel deployment
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Trigger GitHub Action
        await triggerGitHubAction(
            email,
            process.env.GITHUB_REPO_OWNER || 'Kbinkenaid',
            process.env.GITHUB_REPO_NAME || 'Kblog',
            process.env.GITHUB_TOKEN
        );

        res.status(200).json({ 
            success: true, 
            message: 'Subscription processed successfully',
            email: email
        });

    } catch (error) {
        console.error('Webhook handler error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
};

// For local testing
if (require.main === module) {
    const email = process.argv[2];
    if (!email) {
        console.log('Usage: node webhook-handler.js <email>');
        process.exit(1);
    }

    triggerGitHubAction(
        email,
        'Kbinkenaid',
        'Kblog',
        process.env.GITHUB_TOKEN
    ).then(() => {
        console.log('Test successful');
    }).catch(console.error);
}