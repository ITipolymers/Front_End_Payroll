// Function para mag trigger ang click event ng file input
function UploadFileInput(){
    document.getElementById('FileInput').click();
}

//function para mag process yung data sa selected file
function ImportData(){
    const fileInput = document.getElementById('FileInput');
    const file = fileInput.files[0];

    if (!file){
        alert('Please Select a File!');
        return;
    }


    const reader = new FileReader();
    reader.onload = function (event){
        const data = event.target.result;

        //Sheetjs para i-parse ang excel file
        const workbook = XLSX.read(data, {type: 'arry'});

        //pag kuha ng unang sheet sa workbook
        const sheetName = workbook.SheetName[0];
        const sheet = workbook.Sheets[sheetName];

        //convertion ng sheet sa JSON format (array of bejects)
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        //I-clear ang table bago mag insert ng bagong data
        const table = document.getElementById('TimesheetTable');
        table.innerHTML =`<tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Day</th>
                    <th>Time In</th>
                    <th>Time Out</th>
                    <th>Time In (Next Day)</th>
                    <th>Time Out (Next Day)</th>
                    <th>Next Day</th>
                    <th>Total Hours of Working</th>
                </tr>`;

                // Insert data into the table
                 jsonData.forEach(row => {
                    const newRow = table.insertRow();
                    Object.values(row).forEach(cellValue => {
                        const cell = newRow.insertCell();
                        cell.textContent = cellValue;
                    });
                });
            };
            // Basahin ang file bilang binary string
            reader.readAsArrayBuffer(file);  
}
