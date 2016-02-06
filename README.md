# node-whatsapp-expenses
Calculate shared expenses via the [WhatsApp Chat History](https://www.whatsapp.com/faq/en/s60/21055276) for Node.js.

## Usage

    var expenseTracker = require('node-whatsapp-expenses');
    
    expenseTracker
        .expenses('whatsapp-chat-archive.txt')
        .then((expenses) => {
            // process expenses
        });
    });

## Output
The output is a map of authors with their expenses grouped by month.

    {
    'Niels Dequeker': {
      0: 42, // January
      1: 20, // February
      5: 42 // June
    },
    'Jane Doe': {
      0: 20 // January
    }
