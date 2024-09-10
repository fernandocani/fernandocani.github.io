function readFile(type) {
    const fileInput = document.getElementById('file-input-' + type);
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const textOutput = document.getElementById('field-' + type);
        const fileContent = event.target.result;

        switch (type) {
            case 'base64':
                try {
                    const jsonObject = JSON.parse(fileContent);
                    alert('Error: Base64 file should not be beautified JSON.');
                    return;
                } catch (e) {
                    textOutput.value = fileContent;
                }
                convertBase64ToJson()
                break;
            case 'json':
                try {
                    const beautifiedJson = beautifyJson(fileContent);
                    textOutput.value = beautifiedJson;
                } catch (e) {
                    alert('Invalid JSON file.');
                    return;
                }
                convertJsonToBase64()
                break;
            default:
                alert('Unsupported file type.');
                return;
        }
    };

    if (file) {
        reader.readAsText(file);
    }
}

function exportText(type) {
    const textOutput = document.getElementById('text-output').value;
    const blob = new Blob([textOutput], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'output' + '_' + type + '_' + '.txt';
    link.click();
}

function convertBase64ToJson() {
    const base64Input = document.getElementById('field-base64').value;
    const jsonOutput = atob(base64Input);
    const jsonField = document.getElementById('field-json');
    jsonField.value = beautifyJson(jsonOutput);
}

function convertJsonToBase64() {
    const jsonInput = document.getElementById('field-json').value;
    const base64Output = btoa(jsonInput);
    const base64Field = document.getElementById('field-base64');
    base64Field.value = base64Output;
}

function copyToClipboard(textareaId) {
    const textarea = document.getElementById(textareaId);
    if (textarea.value.trim() === "") {
        alert('The field is empty. Nothing to copy.');
        return;
    }
    textarea.select();
    document.execCommand('copy');
    alert('Copied to clipboard');
}

function clearColumn(id) {
    const textarea = document.getElementById('field-' + id);
    textarea.value = '';

    const inputId = 'file-input-' + id;
    const fileInput = document.getElementById(inputId);
    if (fileInput) {
        fileInput.value = '';
    }
}

function beautifyJson(rawJson) {
    const jsonObject = JSON.parse(rawJson);
    return JSON.stringify(jsonObject, null, 4);
}

function formatJSON() {
    const jsonField = document.getElementById('field-json');
    jsonField.value = beautifyJson(jsonField.value);
}

function validateJson(jsonInput) {
    try {
        JSON.parse(jsonInput);
        return true;
    } catch (e) {
        return false;
    }
}

function onChangeJsonOutput(jsonInput) {
    const buttonJSONtoBASE64 = document.getElementById('convert-btn-json-to-base64');

    let isValid = validateJson(jsonInput);
    switch (isValid) {
        case true:
            buttonJSONtoBASE64.disabled = false;
            return
        case false:
            buttonJSONtoBASE64.disabled = true;
            return
    }
}