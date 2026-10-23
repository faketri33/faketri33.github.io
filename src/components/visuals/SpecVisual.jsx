import Exhibit from './Exhibit.jsx';
import DataTable from './DataTable.jsx';

export default function SpecVisual({ item }) {
  return (
    <Exhibit caption={item.caption}>
      <DataTable caption={item.caption} head={item.specHead}>
        {item.specRows.map((r) => (
          <tr key={r.group}>
            <th scope="row">{r.group}</th>
            <td className="mono">{r.tags}</td>
          </tr>
        ))}
      </DataTable>
    </Exhibit>
  );
}
