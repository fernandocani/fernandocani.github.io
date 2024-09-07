let jsonData = {};
// let shouldAutoLoadExample = false;
let shouldAutoLoadExample = true;

window.onload = function() {
    clearFileAndOutput();
    if (shouldAutoLoadExample) {
        fetch('Resources/example.txt')
        .then(response => response.text())
        .then(contents => {
            const event = {
                target: {
                    result: contents
                }
            };
            handleFileContents(event);
        })
        .catch(error => console.error('Error loading example.txt:', error));
    }
};

function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        handleFileContents(e);
    };
    
    reader.readAsText(file);
}

function handleFileContents(event) {
    const contents = event.target.result;
    const decodedContents = atob(contents);
    jsonData = JSON.parse(decodedContents);
    
    createPlayerCard('card player card_content', jsonData);
    createCurrencyCard('card currencies card_content', jsonData.save.wallet.currencies);
    createPokeballCard('card pokeballs card_content', jsonData.save.pokeballs.pokeballs);
    createFarmingCard('card farming card_content', jsonData.save.farming.shovelAmt);
    createCardToggles('card keyitems card_content', jsonData.save.keyItems);
    createCardToggles('card challenges card_content', jsonData.save.challenges.list);
    
    updateOutput();
    updateExportButtonState();
    
    toggleCardView('player');
    toggleCardView('currencies');
    toggleCardView('currencies');
    toggleCardView('pokeballs');
    toggleCardView('pokeballs');
    toggleCardView('farming');
    toggleCardView('farming');
    toggleCardView('keyitems');
    toggleCardView('keyitems');
    toggleCardView('challenges');
    toggleCardView('challenges');
    toggleCardView('json');
    toggleCardView('json');
}

function updateOutput() {
    document.getElementById("fileloaded").style.display = "block";
    document.getElementById("outputResult").style.display = "block";
    document.getElementById("card_json").innerText = JSON.stringify(jsonData, null, 2);;
}

function clearFileAndOutput() {
    document.getElementById("fileUpload").value = "";
    document.getElementById("fileloaded").style.display = "none";
    document.getElementById("outputResult").style.display = "none";
    document.getElementsByClassName("card player card_content")[0].innerHTML = "";
    document.getElementsByClassName("card pokeballs card_content")[0].innerHTML = "";
    document.getElementsByClassName("card keyitems card_content")[0].innerHTML = "";
    document.getElementsByClassName("card challenges card_content")[0].innerHTML = "";
    document.getElementById("card_json").innerText = "";
    toggleCardView('player', true);
    toggleCardView('currencies', true);
    toggleCardView('pokeballs', true);
    toggleCardView('farming', true);
    toggleCardView('keyitems', true);
    toggleCardView('challenges', true);
    toggleCardView('json', true);
}

function createPlayerCard(className, values) {
    const section = document.getElementsByClassName(className)[0];
    section.innerHTML = "";

    const labelName = createTextRow('Name:', values.save.profile.name);
    const labelTrainerID = createTextRow('Trainer ID:', values.player.trainerId);
    const labelGameVersion = createTextRow('Game Version:', values.save.update.version);
    
    section.appendChild(labelTrainerID);
    section.appendChild(labelName);
    section.appendChild(labelGameVersion);
}

function createCurrencyCard(className, values) {
    const section = document.getElementsByClassName(className)[0];
    section.innerHTML = "";
    
    const labelPD   = createNumberRow('Pokédollars:',       values, 0);
    const labelQP   = createNumberRow('Quest Points:',      values, 1);
    const labelDT   = createNumberRow('Dungeon Tokens:',    values, 2);
    const labelD    = createNumberRow('Diamonds:',          values, 3);
    const labelFP   = createNumberRow('Farm Points:',       values, 4);
    const labelBP   = createNumberRow('Battle Points:',     values, 5);
    const labelCT   = createNumberRow('Contest Tokens:',    values, 6);
    
    section.appendChild(labelPD);
    section.appendChild(labelQP);
    section.appendChild(labelDT);
    section.appendChild(labelD);
    section.appendChild(labelFP);
    section.appendChild(labelBP);
    section.appendChild(labelCT);
}

function createPokeballCard(className, values) {
    const section = document.getElementsByClassName(className)[0];
    section.innerHTML = "";
    
    const labelPoke     = createNumberRow('Pokéball:',      values, 0);
    const labelGreat    = createNumberRow('Greatball:',     values, 1);
    const labelUltra    = createNumberRow('Ultraball:',     values, 2);
    const labelMaster   = createNumberRow('Masterball:',    values, 3);
    const labelFast     = createNumberRow('Fast Ball:',     values, 4);
    const labelQuick    = createNumberRow('Quick Ball:',    values, 5);
    const labelTimer    = createNumberRow('Timer Ball:',    values, 6);
    const labelDusk     = createNumberRow('Dusk Ball:',     values, 7);
    const labelLuxury   = createNumberRow('Luxury Ball:',   values, 8);
    const labelDive     = createNumberRow('Dive Ball:',     values, 9);
    const labelLure     = createNumberRow('Lure Ball:',     values, 10);
    const labelNest     = createNumberRow('Nest Ball:',     values, 11);
    const labelRepeat   = createNumberRow('Repeat Ball:',   values, 12);
    const labelBeast    = createNumberRow('Beast Ball:',    values, 13);
    const labelMoon     = createNumberRow('Moon Ball:',     values, 14);
    
    section.appendChild(labelPoke);
    section.appendChild(labelGreat);
    section.appendChild(labelUltra);
    section.appendChild(labelMaster);
    section.appendChild(labelFast);
    section.appendChild(labelQuick);
    section.appendChild(labelTimer);
    section.appendChild(labelDusk);
    section.appendChild(labelLuxury);
    section.appendChild(labelDive);
    section.appendChild(labelLure);
    section.appendChild(labelNest);
    section.appendChild(labelRepeat);
    section.appendChild(labelBeast);
    section.appendChild(labelMoon);
}

function createFarmingCard(className, values) {
    const section = document.getElementsByClassName(className)[0];
    section.innerHTML = "";

    const labelShovel = createNumberRow2('Shovel:', 'save.farming.shovelAmt');

    section.appendChild(labelShovel);
}

function createTextRow(title, value) {
    const row = document.createElement("li");
    row.style.display = "flex";
    row.style.flexDirection = "row";
    row.style.width = "100%";

    const labelTitle = document.createElement("label");
    labelTitle.textContent = title;
    labelTitle.style.width = "130px";

    const labelValue = document.createElement("label");
    labelValue.textContent = value;
    labelValue.style.flexGrow = "1";

    row.appendChild(labelTitle);
    row.appendChild(labelValue);

    return row
}

function createNumberRow(title, object, index) {
    let value = object[index];
    const row = document.createElement("li");
    row.style.display = "flex";
    row.style.flexDirection = "row";
    row.style.width = "100%";

    const labelTitle = document.createElement("label");
    labelTitle.textContent = title;
    labelTitle.style.width = "130px";

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = value.toLocaleString();
    inputField.style.flexGrow = "1";
    inputField.addEventListener("input", function() {
        const newValue = parseInt(this.value);
        if (!isNaN(newValue)) {
            object[index] = newValue;
            value = object[index];
            updateOutput();
        }
    });

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", function() {
        object[index]++;
        value = object[index];
        inputField.value = value.toLocaleString();;
        updateOutput();
    });

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", function() {
        object[index]--;
        value = object[index];
        inputField.value = value.toLocaleString();;
        updateOutput();
    });

    row.appendChild(labelTitle);
    row.appendChild(inputField);
    row.appendChild(increaseButton);
    row.appendChild(decreaseButton);

    return row;
}

function createNumberRow2(title, keyPath) {
    let value = getValueAtPath(jsonData, keyPath);
    const row = document.createElement("li");
    row.style.display = "flex";
    row.style.flexDirection = "row";
    row.style.width = "100%";

    const labelTitle = document.createElement("label");
    labelTitle.textContent = title;
    labelTitle.style.width = "130px";

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = value.toLocaleString();
    inputField.style.flexGrow = "1";
    inputField.addEventListener("input", function() {
        const newValue = parseInt(this.value);
        if (!isNaN(newValue)) {
            let currentValue = getValueAtPath(jsonData, keyPath);
            currentValue = newValue;
            setValueAtPath(jsonData, keyPath, currentValue);
            value = currentValue;
            updateOutput();
        }
    });

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", function() {
        let currentValue = getValueAtPath(jsonData, keyPath);
        currentValue++;
        setValueAtPath(jsonData, keyPath, currentValue);
        value = currentValue;
        inputField.value = value.toLocaleString();;
        updateOutput();
    });

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", function() {
        let currentValue = getValueAtPath(jsonData, keyPath);
        currentValue--;
        setValueAtPath(jsonData, keyPath, currentValue);
        value = currentValue;
        inputField.value = value.toLocaleString();;
        updateOutput();
    });

    row.appendChild(labelTitle);
    row.appendChild(inputField);
    row.appendChild(increaseButton);
    row.appendChild(decreaseButton);

    return row;
}

function createCardToggles(className, values) {
    const section = document.getElementsByClassName(className)[0];
    section.innerHTML = "";
    
    for (const [key, value] of Object.entries(values)) {
        const label = document.createElement("label");
        label.textContent = key;
        
        const switchLabel = document.createElement("label");
        switchLabel.className = "switch" + " " + key;
        switchLabel.checked = value;
        
        const checkbox = document.createElement("input");
        checkbox.id = "checkbox" + "_challenges_" + key;
        checkbox.type = "checkbox";
        checkbox.onchange = function() {
            values[key] = this.checked;
            updateOutput();
        }
        checkbox.checked = value;
        
        const slider = document.createElement("span");
        slider.className = "slider";
        
        switchLabel.appendChild(checkbox);
        switchLabel.appendChild(slider);
        
        const switchLine = document.createElement("switchLine");
        switchLine.className = "switchLine" + " " + key;
        switchLine.appendChild(switchLabel);
        switchLine.appendChild(label);
        
        section.appendChild(switchLine);
    }
}

function copyToClipboard() {
    let Text = document.getElementById("card_json").innerText;
    navigator.clipboard.writeText(Text);
    alert("JSON string copied to clipboard!");
}

function updateExportButtonState() {
    const exportButton = document.getElementById('exportButton');
    exportButton.disabled = Object.keys(jsonData).length === 0;
}

function toggleCardView(className, clearModifications) {
    const element = document.getElementsByClassName('card ' + className)[0];
    const content = document.getElementsByClassName('card ' + className + ' card_content')[0];
    if (clearModifications === true) {
        element.style.height = '';
        element.style.overflow = '';
        content.style.visibility = '';
    } else {
        element.classList.toggle('expanded')
        if (element.classList.contains('expanded')) {
            element.style.height = 'auto';
            element.style.overflow = 'visible';
            content.style.visibility = 'visible';
        } else {
            element.style.height = '50px';
            element.style.overflow = 'hidden';
            content.style.visibility = 'hidden';
        }
    }
}

/**
* Exports the JSON data to a file.
* 
* @param {boolean} exportInJson - If true, the output file will contain the JSON data as a formatted string.
*                                 If false, the JSON data will be encoded as a Base64 string and output to the file.
*/
function exportFile(exportInJson) {
    const fileName = document.getElementById('fileUpload').value.split('\\').pop().split('/').shift();
    let fileContent;
    if (exportInJson) {
        fileContent = JSON.stringify(jsonData, null, 2);
    } else {
        const jsonString = JSON.stringify(jsonData);
        fileContent = btoa(jsonString);
    }
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'E_'+fileName;
    link.click();
}

// Helper functions
function setValueAtPath(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
}

function getValueAtPath(obj, path) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length; i++) {
        if (current[keys[i]] === undefined) {
            return undefined; // Return undefined if the path is invalid
        }
        current = current[keys[i]];
    }
    return current;
}