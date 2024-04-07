const tableBodyHTML = document.getElementById('tableBody');
const femaleTableBodyHTML = document.getElementById('femaleTableBody');
window.addEventListener("load",
async () => {
  let data = [];
  try {
    const res = await fetch(
      "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json",
      {
        method: "GET",
      }
    );
    const json = await res.json();
    data = json;
  } catch (error) {
    console.log("Error to get data", error);
  }
  console.log(data);
  randerTable(data);

  // Search
  document.getElementById('searchBtn').addEventListener('click', ()=>{
    handleSearch(data);
    document.getElementById('femaleTable').style.display = 'none';
  });
  document.getElementById('search').addEventListener('change', ()=>{
    handleSearch(data);
    document.getElementById('femaleTable').style.display = 'none';
  })

  // Sort
  document.getElementById('a2z').addEventListener('click', ()=>{
    const a2zSort = sortA2z(data);
    randerTable(a2zSort);
    document.getElementById('femaleTable').style.display = 'none';
  })
  document.getElementById('z2a').addEventListener('click', ()=>{
    const z2aSort = sortZ2a(data);
    randerTable(z2aSort);
    document.getElementById('femaleTable').style.display = 'none';
  })

  document.getElementById('marksBtn').addEventListener('click', ()=>{
    const sortData = sortMarks(data);
    randerTable(sortData);
    document.getElementById('femaleTable').style.display = 'none';
  })

  document.getElementById('passBtn').addEventListener('click', ()=>{
    const sortData = sortPass(data);
    randerTable(sortData);
    document.getElementById('femaleTable').style.display = 'none';
  })

  document.getElementById('classBtn').addEventListener('click', ()=>{
    const sortData = sortClass(data);
    randerTable(sortData);
    document.getElementById('femaleTable').style.display = 'none';
  })

  document.getElementById('genderBtn').addEventListener('click', ()=>{
    const sortData = sortMale(data);
    randerTable(sortData);
    document.getElementById('femaleTable').style.display = 'table';
    const femaleData = sortFemale(data);
    randerTable2(femaleData);
  })
});

const randerTable = (tableData) => {
  tableBodyHTML.innerHTML = '';
  tableData.forEach((v)=>{
    let myHTML = `
    <tr class="tableHeader">
    <td class="tableHeading">${v.id}</td>
    <td class="tableHeading"><div class="nameCell"><img src=${v.img_src} class="imgContainer"/> ${v.first_name + ' ' + v.last_name}</div></td>
    <td class="tableHeading">${v.gender}</td>
    <td class="tableHeading">${v.class}</td>
    <td class="tableHeading">${v.marks}</td>
    <td class="tableHeading">${v.passing?'Passed':'Failed'}</td>
    <td class="tableHeading">${v.email}</td>
    </tr>
    `
    tableBodyHTML.innerHTML += myHTML;
  })
}

const randerTable2 = (tableData) => {
  femaleTableBodyHTML.innerHTML = '';
  tableData.forEach((v)=>{
    let myHTML = `
    <tr class="tableHeader">
    <td class="tableHeading">${v.id}</td>
    <td class="tableHeading"><div class="nameCell"><img src=${v.img_src} class="imgContainer"/> ${v.first_name + ' ' + v.last_name}</div></td>
    <td class="tableHeading">${v.gender}</td>
    <td class="tableHeading">${v.class}</td>
    <td class="tableHeading">${v.marks}</td>
    <td class="tableHeading">${v.passing?'Passed':'Failed'}</td>
    <td class="tableHeading">${v.email}</td>
    </tr>
    `
    femaleTableBodyHTML.innerHTML += myHTML;
  })
}

const handleSearch = (data) => {
  const searcText = document.getElementById('search').value.toLowerCase();
    const searchData = data.filter((v)=> v.first_name.toLowerCase().includes(searcText) || v.last_name.toLowerCase().includes(searcText) || v.email.toLowerCase().includes(searcText));
    randerTable(searchData);
}

const sortA2z = (data) => {
  return data.sort((a,b)=> {
    const aFullName = a.first_name + " " + a.last_name;
    const bFullName = b.first_name + " " + b.last_name;
    return aFullName.localeCompare(bFullName);
  })
}
const sortZ2a = (data) => {
  return data.sort((a,b)=> {
    const aFullName = a.first_name + " " + a.last_name;
    const bFullName = b.first_name + " " + b.last_name;
    return bFullName.localeCompare(aFullName);
  })
}

const sortMarks = (data) => {
  return data.sort((a,b)=> {
    return a.marks-b.marks;
  })
}

const sortPass = (data) => {
  return data.filter((v)=>v.passing);
}

const sortClass = (data) => {
  return data.sort((a,b)=> {
    return a.class-b.class;
  })
}

const sortMale = (data) => {
  return data.filter((v)=>v.gender==='Male');
}

const sortFemale = (data) => {
  return data.filter((v)=>v.gender==='Female');
}