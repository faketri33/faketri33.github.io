/** Small table in a scroll container; the first column is a row header. */
export default function DataTable({ caption, head, children }) {
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
