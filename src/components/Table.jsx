export default function Table({ columns, data }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-purple-300/15 bg-[#2d1939]/80">
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="border-b border-purple-300/10">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-sm font-bold text-[#fffaf0]"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id ?? index}
                className="border-b border-purple-300/10 hover:bg-purple-300/5"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-[15px] text-[#d8ccdf]"
                  >
                    {item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}