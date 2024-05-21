const fs = require('fs');
const path = require('path');

 const dataPath = path.join(__dirname, "hospital.json");


function readData(){
 const data = fs.readFileSync(dataPath, 'utf8');
 return JSON.parse(data);
}
function writeData(data){
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}
function getData(){
    return readData();
}

//CRUD operation

function createHospital(newHospital){
    const data = readData();
    newHospital.id = data.length ? data[data.length - 1].id + 1 :1;
    data.push (newHospital);
    writeData(data);
    return newHospital;
}

 function update(id, updateInfo){
    const data =  readData();
    const  value = data.findIndex(h => h.id === id);
    if( value === -1){
        return null;
    }
    data[value] = {...data[value], ...updateInfo};
    writeData(data);
    return data[value];
 }

function deleteFunc(id){
    const data = readData();
    const newData = data.filter(h=>h.id !==id);
    if(data.length === newData.length){
        return false;
    }
    else {
        writeData(newData);
        return true;
    }
}
// Example usage
console.log("Initial Data:", getData());

const newHospital = {
    name: "North Hospital",
    patientCount: 200,
    location: "North District"
};
console.log("Added Hospital:", createHospital(newHospital));
console.log("Updated Data:", getData());

const updatedHospital = {
    patientCount: 250
};
console.log("Updated Hospital:", update(1, updatedHospital));
console.log("Updated Data:", getData());

console.log("Deleted Hospital:", deleteFunc(2));
console.log("Final Data:", getData());