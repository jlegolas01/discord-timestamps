// Function to replace ingame time with Discord timestamps
function parseIngameTimeToDiscordTimestamp(inputText) {
    return inputText.replace(/at around (\d{2}):(\d{2}) ingame time/g, function(match, hours, minutes) {
        const date = new Date(); // Using current date for example
        date.setHours(hours, minutes, 0); // Setting hours and minutes from the match
        const unixTimestamp = Math.floor(date.getTime() / 1000);
        return `<t:${unixTimestamp}:t>`; // Format for Discord timestamp (short time)
    });
}

// Event listeners for UI interactions
document.getElementById('parseButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const result = parseIngameTimeToDiscordTimestamp(inputText);
    document.getElementById('outputText').value = result;
});

document.getElementById('copyButton').addEventListener('click', function() {
    const outputText = document.getElementById('outputText').value;
    if (navigator.clipboard && window.isSecureContext) {
        // Modern approach using the Clipboard API
        navigator.clipboard.writeText(outputText)
            .then(() => {
                console.log('Text successfully copied to clipboard');
                // Optionally, you can display a message to the user indicating the copy was successful
                // For example, using an alert or updating the text content of a status element
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
                // Handle the error (e.g., by informing the user that the copy failed)
            });
    } else {
        // Fallback for browsers that do not support the Clipboard API or in non-secure contexts
        const textArea = document.createElement('textarea');
        document.body.appendChild(textArea);
        textArea.value = outputText;
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                console.log('Text successfully copied to clipboard using fallback method');
                // Optionally, you can display a message to the user indicating the copy was successful
            } else {
                console.error('Failed to copy text using fallback method');
                // Handle the fallback failure
            }
        } catch (err) {
            console.error('Fallback method exception', err);
        }
        document.body.removeChild(textArea);
    }
});


