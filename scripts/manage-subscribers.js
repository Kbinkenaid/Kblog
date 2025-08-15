const fs = require('fs');
const path = require('path');

const SUBSCRIBERS_FILE = path.join(__dirname, '..', 'data', 'subscribers.json');

function loadSubscribers() {
    try {
        const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { subscribers: [] };
    }
}

function saveSubscribers(data) {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(data, null, 2));
}

function addSubscriber(email) {
    const data = loadSubscribers();
    
    // Check if email already exists
    if (data.subscribers.some(sub => sub.email === email)) {
        console.log(`Email ${email} is already subscribed.`);
        return false;
    }
    
    // Add new subscriber
    data.subscribers.push({
        email: email,
        dateAdded: new Date().toISOString(),
        active: true
    });
    
    saveSubscribers(data);
    console.log(`Successfully added ${email} to subscribers.`);
    return true;
}

function removeSubscriber(email) {
    const data = loadSubscribers();
    const initialCount = data.subscribers.length;
    
    data.subscribers = data.subscribers.filter(sub => sub.email !== email);
    
    if (data.subscribers.length < initialCount) {
        saveSubscribers(data);
        console.log(`Successfully removed ${email} from subscribers.`);
        return true;
    } else {
        console.log(`Email ${email} not found in subscribers.`);
        return false;
    }
}

function listSubscribers() {
    const data = loadSubscribers();
    
    if (data.subscribers.length === 0) {
        console.log('No subscribers found.');
        return;
    }
    
    console.log(`\nTotal subscribers: ${data.subscribers.length}\n`);
    
    data.subscribers.forEach((sub, index) => {
        const date = new Date(sub.dateAdded).toLocaleDateString();
        const status = sub.active ? '✅' : '❌';
        console.log(`${index + 1}. ${sub.email} - Added: ${date} ${status}`);
    });
    
    console.log('');
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'add':
        if (!args[1]) {
            console.log('Usage: node manage-subscribers.js add <email>');
            process.exit(1);
        }
        addSubscriber(args[1]);
        break;
        
    case 'remove':
        if (!args[1]) {
            console.log('Usage: node manage-subscribers.js remove <email>');
            process.exit(1);
        }
        removeSubscriber(args[1]);
        break;
        
    case 'list':
        listSubscribers();
        break;
        
    default:
        console.log(`
Blog Subscriber Management

Usage:
  node manage-subscribers.js add <email>     - Add a new subscriber
  node manage-subscribers.js remove <email>  - Remove a subscriber  
  node manage-subscribers.js list           - List all subscribers

Examples:
  node manage-subscribers.js add user@example.com
  node manage-subscribers.js remove user@example.com
  node manage-subscribers.js list
        `);
        break;
}

module.exports = { addSubscriber, removeSubscriber, listSubscribers };