export default function Table({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
}) {
  const hasActions = onView || onEdit || onDelete;

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

              {hasActions && (
                <th className="px-6 py-4 text-left text-sm font-bold text-[#fffaf0]">
                  Actions
                </th>
              )}

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

                {hasActions && (
                  <td className="px-6 py-4">
                    <div className="flex gap-2">

                      {onView && (
                        <button
                          onClick={() => onView(item.id)}
                          className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
                        >
                          View
                        </button>
                      )}

                      {onEdit && (
                        <button
                          onClick={() => onEdit(item.id)}
                          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          Edit
                        </button>
                      )}

                      {onDelete && (
                        <button
                          onClick={() => onDelete(item.id)}
                          className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      )}

                    </div>
                  </td>
                )}

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}