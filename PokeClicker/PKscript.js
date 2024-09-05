let jsonData = {};
let shouldAutoLoadExample = false;
// let shouldAutoLoadExample = true;

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
    createPokeballCard('card pokeballs card_content', jsonData.save.pokeballs.pokeballs);
    createCardToggles('card keyitems card_content', jsonData.save.keyItems);
    createCardToggles('card challenges card_content', jsonData.save.challenges.list);
    
    updateOutput();
    updateExportButtonState();
    
    toggleCardView('player');
    toggleCardView('pokeballs');
    toggleCardView('pokeballs');
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

function createPokeballCard(className, values) {
    const section = document.getElementsByClassName(className)[0];
    section.innerHTML = "";

    const labelPoke     = createNumberRow('Pokéball:',      values[0]);
    const labelGreat    = createNumberRow('Greatball:',     values[1]);
    const labelUltra    = createNumberRow('Ultraball:',     values[2]);
    const labelMaster   = createNumberRow('Masterball:',    values[3]);
    const labelFast     = createNumberRow('Fast Ball:',     values[4]);
    const labelQuick    = createNumberRow('Quick Ball:',    values[5]);
    const labelTimer    = createNumberRow('Timer Ball:',    values[6]);
    const labelDusk     = createNumberRow('Dusk Ball:',     values[7]);
    const labelLuxury   = createNumberRow('Luxury Ball:',   values[8]);
    const labelDive     = createNumberRow('Dive Ball:',     values[9]);
    const labelLure     = createNumberRow('Lure Ball:',     values[10]);
    const labelNest     = createNumberRow('Nest Ball:',     values[11]);
    const labelRepeat   = createNumberRow('Repeat Ball:',   values[12]);
    const labelBeast    = createNumberRow('Beast Ball:',    values[13]);
    const labelMoon     = createNumberRow('Moon Ball:',     values[14]);
    
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

function createNumberRow(title, value) {
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
    toggleCardView('pokeballs', true);
    toggleCardView('keyitems', true);
    toggleCardView('challenges', true);
    toggleCardView('json', true);
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
        content.style.visibility = '';
    } else {
        element.classList.toggle('expanded')
        if (element.classList.contains('expanded')) {
            element.style.height = 'auto';
            content.style.visibility = 'visible';
        } else {
            element.style.height = '50px';
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
    link.download = fileName;
    link.click();
}