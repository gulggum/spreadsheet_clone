//1.필요한 상수 생성하기

const spreadSheetContainer = document.querySelector("#spreadsheet_container");
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];
//8. 첫번째 row배열에 알파벳으로 넣어주기 , 우선 알파벳배열 생성
const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

//3.  Cell 클래스 생성
class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    column,
    rowName,
    columnName,
    active = false
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.rowName = rowName;
    this.columnName = columnName;
    this.active = active;
  }
}

//1. 기본 데이터 생성하기 (row:10개,colum:10개)
function spreadsheetData() {
  for (let i = 0; i < COLS; i++) {
    let spreadsheetRow = [];
    for (let j = 0; j < COLS; j++) {
      let cellData = "";
      let isHeader = false;
      let disabled = false;
      //7. 모든 row 첫 번째 컬럼에 숫자 넣기
      if (j === 0) {
        cellData = i;
        isHeader = true;
        disabled = true;
      }
      if (i === 0) {
        cellData = alphabets[j - 1];
        isHeader = true;
        disabled = true;
      }

      //cellData가 undifined라면 빈칸으로
      if (!cellData) {
        cellData = "";
      }

      const rowName = i;
      const columnName = alphabets[j - 1];

      const cell = new Cell(
        isHeader,
        disabled,
        cellData,
        i,
        j,
        rowName,
        columnName,
        false
      );
      spreadsheetRow.push(cell); //한줄씩 만듦
    }
    spreadsheet.push(spreadsheetRow); //위의 한줄씩 만든걸 추가
  }

  console.log(spreadsheet);
  drawSheet();
}

//4. Cell생성 하기
function createCellEl(cell) {
  const cellEl = document.createElement("input");
  cellEl.className = "cell";
  cellEl.id = `cell_${cell.row}${cell.column}`;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;

  if (cell.isHeader) {
    cellEl.classList.add("header");
  }

  cellEl.addEventListener("click", () => handleCellClick(cell));

  return cellEl;
}

function handleCellClick(cell) {
  clearHeaderActiveStates(); //클릭됬었던 요소 active지워주기
  const columnHeader = spreadsheet[0][cell.column];
  const rowHeader = spreadsheet[cell.row][0];

  //클릭한 데이터 요소 불러오기
  const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
  const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
  console.log("clicked cell:", columnHeaderEl, rowHeaderEl);
  columnHeaderEl.classList.add("active");
  rowHeaderEl.classList.add("active");
}

//누적클릭된 header들의 active지워주는 함수
function clearHeaderActiveStates() {
  const headers = document.querySelectorAll(".header");

  headers.forEach((header) => {
    header.classList.remove("active");
  });
}

function getElFromRowCol(row, col) {
  return document.querySelector(`#cell_${row}${col}`);
}

//5. Cell 렌더링하기
function drawSheet() {
  for (let i = 0; i < spreadsheet.length; i++) {
    //6. 10개의 셀을 하나의 row div로 감싸기
    const rowContainerEl = document.createElement("div");
    rowContainerEl.className = `cell-row`;
    for (let j = 0; j < spreadsheet[i].length; j++) {
      const cell = spreadsheet[i][j];
      rowContainerEl.append(createCellEl(cell));
    }
    spreadSheetContainer.append(rowContainerEl);
  }
}

spreadsheetData();
