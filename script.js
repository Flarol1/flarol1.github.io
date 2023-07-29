const xhr = new XMLHttpRequest();
xhr.open('GET', 'data.csv');
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // Convert the CSV data to an array of objects
    const data = csvToArray(xhr.responseText);
    // Generate the list HTML
    const listHtml = data.map((item) => `<li>${item.name} - ${item.value}</li>`).join('');
    // Insert the list HTML into the page
    document.getElementById('csvList').innerHTML = listHtml;
  }
};
xhr.send();

// Function to convert CSV to array of objects
function csvToArray(csv) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const values = line.split(',');
    const item = {};
    headers.forEach((header, index) => {
      item[header] = values[index];
    });
    return item;
  });
}
