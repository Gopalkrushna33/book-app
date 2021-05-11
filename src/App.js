import { useState } from "react";
import dayJS from "dayjs";
import "./App.css";
import booksJson from "./book.json";

function App() {
  const [bookName, setBookName] = useState("");
  const [booksData, setBooksData] = useState(booksJson.books);

  const publisher = booksData.reduce((arr, item) => {
    if (arr.indexOf(item.author) === -1) {
      arr.push(item.author);
    }
    return arr;
  }, []);
  return (
    <div className="App">
      <table>
        <tr>
          <th>
            <input type="text" placeholder="Book Name" value={bookName} />
            {/* <input type="text" placeholder="Au" value={bookName} /> */}
          </th>
          <th>
            <label>Publisher:</label>
            <select name="Publisher" id="Publisher">
              <option value="select">--select--</option>
              {publisher.map((item, index) => {
                return (
                  <option key={item + index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            <button>sort</button>
          </th>
          <th>
            <label>Date of Return</label>
          </th>
          <th>
            <label>Status:</label>
            <select name="Status" id="Status">
              <option value="select">--select--</option>
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
              <option value="overdue">Overdue</option>
            </select>
          </th>
        </tr>
        {booksData.map((item, index) => {
          return (
            <tr>
              <td>{item.bookName}</td>
              <td>{item.author}</td>
              <td>
                {(item.dateOfReturn &&
                  dayJS(item.dateOfReturn).format("YYYY-MM-YY")) ||
                  "-"}
              </td>
              <td>
                {item.dateOfReturn
                  ? dayJS(item.dateOfReturn).diff(dayJS(), "day") > 0
                    ? "Borrowed"
                    : "Overdue"
                  : "Available"}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
